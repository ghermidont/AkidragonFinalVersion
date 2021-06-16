import React, {useEffect, useRef, useState} from 'react';
//import {useAuthContext} from "../../context/AuthContext";
import {useDataFromFirestoreUserInfo} from "../../customHooks/useFirestore";
import {functions, projectStorage} from "../../fireBase";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext";
import {useTranslation} from "react-i18next";
import date from 'date-and-time';

export default function UpdateUserProfilePage() {
  console.log("UpdateUserProfilePage() worked");

  const {t} = useTranslation();
  const {currentUser} = useAuthContext();
  const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
  const {docsFromHookUserInfo} = useDataFromFirestoreUserInfo('user-profiles');
  const fileTypesArray = ['image/png', 'image/jpeg'];

  //Refs
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const emailRef = useRef();

  //States
  const [passwordError, setPasswordError] = useState('');
  const [url, setUrl] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState();
  const [oldDateOfBirth, setOldDateOfBirth] = useState("");
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  //const [uploadedPicFile, setUploadedPicFile] = useState('');
  const [fileSuccess, setFileSuccess] = useState(false);
  //const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [oldUrl, setOldUrl] = useState('');

  let selectedUser = [];

  // const parsedDate = (currentDate) => {
  //   if (currentDate!=='') {
  //     const date = new Date(currentDate);
  //     let parsedDate = date.toString();
  //     return parsedDate;
  //   }
  //   return;
  // }

  useEffect(() => {
    if (docsFromHookUserInfo) {
      selectedUser = docsFromHookUserInfo.filter(function (user) {
        return user.id === currentUser.uid;
      });
      console.log(selectedUser);
    }
  });

  useEffect(() => {
    if (selectedUser !== "") {
      selectedUser.map(doc => {
        let formatedDate;;
        if(doc.dateOfBirth===undefined){
          setOldDateOfBirth("Date of birth not set");
        }else{
          let now = new Date(doc.dateOfBirth);
          formatedDate =  date.format(now, 'ddd, MMM DD YYYY');
        }
        setFirstName(doc.firstName);
        setLastName(doc.lastName);
        setDisplayName(doc.displayName);
        setDateOfBirth(doc.dateOfBirth);
        setOldDateOfBirth(formatedDate);
        setAddress(doc.address ? doc.address : "");
        setBio(doc.bio ? doc.bio : "");
        setEmail(currentUser ? currentUser.email : CurrentUserFromLS.email);
        setUrl(doc.photoURL);
        setOldUrl(doc.photoURL);
     })
    }
  }, [docsFromHookUserInfo]);

  const fileUploadEventListener = (e) => {
    let uploadedFile = e.target.files[0];
    if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
      //setUploadedPicFile(uploadedFile);
      async function putFile(uploadedFile){
        e.preventDefault();
        try {
          //setLoading(true);
          setError("");
          const storageRef = projectStorage.ref('profile_pictures/').child(uploadedFile.name);
          storageRef.put(uploadedFile).on('state_changed', (err) => {
          },  (err) => {
            window.alert(err);
          }, async()=>{
            const finalUrl = await storageRef.getDownloadURL();
            finalUrl!==undefined?setFileSuccess(true):setFileSuccess(false);
            setUrl(finalUrl);
          });
        } catch {
          setError("Failed to upload file");
        }
        //setLoading(false);
      }
      putFile(uploadedFile).then(()=>console.log(url));
    } else {
      //setUploadedPicFile('');
      setError('Please select an image file (png or jpg)');
    }
  };

  const cloudFunctionTrigger = () => {
    console.log("Step2CompleteProfilePage cloudFunctionTrigger()");
    //if(loading === false) {
      const addData = functions.httpsCallable('setUserData');
      addData({
        "displayName": displayName,
        "photoURL": url,
        "firstName": firstName,
        "lastName": lastName,
        "dateOfBirth": dateOfBirth,
        "address": address,
        "bio": bio
      })
          .then((result) => {
            return window.alert("User info updated successfully");
          })
          .catch((error) => {
            return console.error(error.code + " " + error.message + "" + error.details);
          });
    //}
  }

  // useEffect(() => {
  //     getDoc().then(()=>console.log("Got the user info for update!")).catch(()=>console.error("could not get current use extra info."));
  //     console.log(currentUserDbInfo);
  // }, [url, currentUserFirstName, currentUserLastName, currentDisplayName, dateOfBirth, address, bio]);

  const updateEmail = async () => {
    if (emailRef.current.value !== currentUser.email) {
      return await currentUser.updateEmail(emailRef.current.value).then(function() {
        window.alert("Email updated");
      }).catch(function(error) {
        window.alert("There was an error updating the email. " + error + "Please try again.");
      });
    }
  }

  const updatePassword = async () => {
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
       return setPasswordError("Passwords do not match")
    }
    console.log(passwordRef.current.value);
    console.log(passwordConfirmRef.current.value);
    await currentUser.updatePassword(passwordRef.current.value).then(function() {
      console.log("Password updated");
    }).catch(function(error) {
      window.alert("There was an error updating the password. " + error + "Please try again.");
    });
 }

  return (
    <>
      <div className='form-update__body'>
        <form className="form-update">
          <div className="form-update__avatar-image">

            <img
                className="form-update__avatar-img"
                src={oldUrl!==""?oldUrl:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/profile_pictures%2Fdepositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg?alt=media&token=5f904560-36a3-4425-9386-960fa63a92e6"}
                alt=""/>

          </div>
          <label className='form-update__label btn-upload'> <span className='icon-upload2'></span> {t('UpdateUserProfilePage.Upload')}Upload
            <input
                className='form-update__btn visually-hidden'
                type="file"
                onChange={fileUploadEventListener}
                placeholder='file'
            />
          </label>
          <button
              className="form-article__btn"
              onClick={()=>cloudFunctionTrigger()}
          >
            {t('UpdateUserProfilePage.UpdateAvatarButton')}
          </button>
          <div className="output">
            { error && <div className="error">{ error }</div>}
            {fileSuccess&&<div>{t('UpdateUserProfilePage.ImageUploadedSuccessfully')}: <img style={{width: "25%", height: "auto"}} src={url} alt=""/></div> }
          </div>
          <br />
          <label className='form-update__label'>
            <strong> {t('UpdateUserProfilePage.BirthDate')}</strong> <br />
            {t('UpdateUserProfilePage.CurrentBirthDate')}: {oldDateOfBirth}
            <input
                className='form-update__input date'
                type="date"
                min="1940-01-01" max="2022-12-31"
                onChange={
                  (e) => setDateOfBirth(Date.parse(e.target.value))
                }
            />
          </label>
          <button
              className="form-article__btn"
              onClick={()=>cloudFunctionTrigger()}
          >
            {t('UpdateUserProfilePage.UpdateBirthDateButton')}
          </button>

          <br />

          <label className='form-update__label'>
            <strong> {t('UpdateUserProfilePage.DisplayName')}</strong>
            <input
                className='form-update__input'
                value={displayName}
                onChange={
                  (e) => setDisplayName(e.target.value)
                }
                type="text" />
          </label>
          <button
              className="form-article__btn"
              onClick={()=>cloudFunctionTrigger()}
          >
            {t('UpdateUserProfilePage.UpdateDisplayNameButton')}
          </button>

          <br />

          <label className='form-update__label'>
            <strong> {t('UpdateUserProfilePage.FirstName')}</strong>
            <input
                className='form-update__input'
                value={firstName}
                onChange={
                  (e) => setFirstName(e.target.value)}
                type="text" />
          </label>
          <button
              className="form-article__btn"
              onClick={()=>cloudFunctionTrigger()}
          >
            {t('UpdateUserProfilePage.UpdateFirstNameButton')}
          </button>

          <br />

          <label className='form-update__label'>
            <strong> {t('UpdateUserProfilePage.LastName')}</strong>
            <input
                className='form-update__input'
                value={lastName}
                onChange={
                  (e) => setLastName(e.target.value)
                }
                type="text"
            />
          </label>
          <button
              className="form-article__btn"
              onClick={()=>cloudFunctionTrigger()}
          >
            {t('UpdateUserProfilePage.UpdateLastNameButton')}
          </button>

          <br />

          <label className='form-update__label'>
            <strong> {t('UpdateUserProfilePage.Address')}</strong>
            <input
                className='form-update__input'
                value={address}
                type="text"
                onChange={
                  (e) => setAddress(e.target.value)
                }
            />
          </label>
          <button
              className="form-article__btn"
              onClick={()=>cloudFunctionTrigger()}
          >{t('UpdateUserProfilePage.UpdateAddressButton')}</button>

          <br />

          <label className='form-update__label'>
            <strong> {t('UpdateUserProfilePage.Biography')}</strong>
            <textarea
                className='form-update__input'
                type="text"
                value={bio}
                onChange={
                  (e) => setBio(e.target.value)
                }>
            </textarea>
          </label>
          <button
              className="form-article__btn"
              onClick={()=>cloudFunctionTrigger()}
          >
            {t('UpdateUserProfilePage.UpdateBiographyButton')}
          </button>

          <br />

          <label className='form-update__label'>
            <strong> {t('UpdateUserProfilePage.Password')}</strong>
            <input
                className='form-update__input'
                ref={passwordRef}
                type="password"
            />
          </label>
          <label className='form-update__label'>
            <strong> {t('UpdateUserProfilePage.ConfirmPassword')}</strong>
            <input className='form-update__input' ref={passwordConfirmRef} type="password" />
          </label>
          {passwordError&&<div>{passwordError}</div>}
          <button className="form-article__btn" onClick={()=>updatePassword()}>{t('UpdateUserProfilePage.ChangePasswordButton')}</button>

          <br />

          <label className='form-update__label'>
            <strong> Email </strong>
            <input
                className='form-update__input'
                value={email}
                ref={emailRef}
                type="email"
            />
          </label>
          <button 
              className="form-article__btn"
              onClick={()=>updateEmail()}
          >
            {t('UpdateUserProfilePage.ChangeEmailButton')}
          </button>

          <br />

          <Link to="/DeleteProfilePage">
            <Button variant="danger">{t('UpdateUserProfilePage.DeleteAccountButton')}</Button>
          </Link>

        </form>

        </div>
    </>
  );
}