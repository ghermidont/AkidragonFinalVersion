import React, {useEffect, useRef, useState} from 'react';
//import {useAuthContext} from "../../context/AuthContext";
import {useDataFromFirestore} from "../../customHooks/useFirestore";
import {functions, projectFirestore, projectStorage} from "../../fireBase";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext";

export default function UpdateUserProfilePage() {
  console.log("UpdateUserProfilePage() worked");
  //const {docsFromHook} = useDataFromFirestore('user-profiles');
  const {currentUser} = useAuthContext();
  const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
  const [currentUserDbInfo, setCurrentUserDbInfo] = useState({});
  const [passwordError, setPasswordError] = useState();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const emailRef = useRef();
  const [url, setUrl] = useState(currentUserDbInfo.photoURL?currentUserDbInfo.photoURL:'');
  const [currentUserFirstName, setCurrentUserFirstName] = useState(currentUserDbInfo.firstName?currentUserDbInfo.firstName:'');
  const [currentUserLastName, setCurrentUserLastName] = useState(currentUserDbInfo.lastName?currentUserDbInfo.lastName:'');
  const [currentDisplayName, setCurrentDisplayName] = useState(currentUserDbInfo.displayName?currentUserDbInfo.displayName:'');
  const [dateOfBirth, setDateOfBirth] = useState(currentUserDbInfo.dateOfBirth?currentUserDbInfo.dateOfBirth:'');
  const [address, setAddress] = useState(currentUserDbInfo.address?currentUserDbInfo.address:'');
  const [bio, setBio] = useState(currentUserDbInfo.bio?currentUserDbInfo.bio:'');
   const fileTypesArray = ['image/png', 'image/jpeg'];
   //is used for file deletion logic
  //const [uploadedPicFile, setUploadedPicFile] = useState('');
  const [fileSuccess, setFileSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //TODO format the date

  const fileUploadEventListener = (e) => {
    let uploadedFile = e.target.files[0];
    if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
      //setUploadedPicFile(uploadedFile);
      async function putFile(uploadedFile){
        e.preventDefault();
        try {
          setLoading(true);
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
        setLoading(false);
      }
      putFile(uploadedFile).then(()=>console.log(url));
    } else {
      //setUploadedPicFile('');
      setError('Please select an image file (png or jpg)');
    }
  };

  const cloudFunctionTrigger = () => {
    console.log("Step2CompleteProfilePage cloudFunctionTrigger()");
    if(loading === false) {
      const addData = functions.httpsCallable('setUserData');
      addData({
        "photoURL": url,
        "firstName": currentUserFirstName,
        "lastName": currentUserLastName,
        "displayName": currentDisplayName,
        "dateOfBirth": dateOfBirth,
        "address": address,
        "bio": bio
      })
          .then((result) => {
            return window.alert("User info updated successfully");
          })
          .catch((error) => {
            return console.log(error.code + " " + error.message + "" + error.details);
          });
    }
  }

  useEffect(() => {
      async function getDoc(){
        await projectFirestore
            .collection('user-profiles')
            .doc(CurrentUserFromLS.uid).get().then((doc)=>{
          if(doc.exists){
            setCurrentUserDbInfo(doc.data());
          }else{
            console.log("No such document!");
          }
        })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
      }
      getDoc().then(()=>console.log("Got the user info for update!")).catch(()=>console.error("could not get current use extra info."));
      console.log(currentUserDbInfo);
  }, []);


  const updateEmail = async () => {
    if (emailRef.current.value !== currentUser.email) {
      return await currentUser.updateEmail(emailRef.current.value);
    }
  }

  const updatePassword = async () => {
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
       return setPasswordError("Passwords do not match")
    }
    console.log(passwordRef.current.value);
    console.log(passwordConfirmRef.current.value);
    await currentUser.updatePassword(passwordRef.current.value);
 }

  return (
    <>
      <div className='form-update__body'>
        <form className="form-update">
          <div className="form-update__avatar-image">
            <img
                className="form-update__avatar-img"
                src={(currentUserDbInfo.photoURL)?currentUserDbInfo.photoURL:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/profile_pictures%2Fdepositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg?alt=media&token=5f904560-36a3-4425-9386-960fa63a92e6"}
                alt=""/>
          </div>
          <label className='form-update__label btn-upload'> <span className='icon-upload2'></span> Upload
            <input
                className='form-update__btn visually-hidden'
                type="file"
                onChange={fileUploadEventListener}
                placeholder='file'
            />
          </label>
          <button
              className="form-article__btn"
              onClick={cloudFunctionTrigger}
          >
            Update avatar
          </button>
          <div className="output">
            { error && <div className="error">{ error }</div>}
            {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url} alt=""/></div> }
          </div>
          <br />
          <label className='form-update__label'>
            <strong> Birth date </strong> <br />
            Current date of birth: {dateOfBirth}
            <input
                className='form-update__input date'
                type="date"
                min="1940-01-01" max="2022-12-31"
                onChange={
                  (e) => setDateOfBirth(e.target.value)
                }
            />
          </label>
          <button
              className="form-article__btn"
          >
            Update birth date
          </button>

          <br />

          <label className='form-update__label'>
            <strong> Display name </strong>
            <input
                className='form-update__input'
                value={currentUserDbInfo.displayName}
                onChange={
                  (e) => setCurrentDisplayName(e.target.value)
                }
                type="text" />
          </label>
          <button
              className="form-article__btn"
              onClick={cloudFunctionTrigger}
          >
            Update display name
          </button>

          <br />

          <label className='form-update__label'>
            <strong> First name </strong>
            <input
                className='form-update__input'
                value={currentUserFirstName}
                onChange={
                  (e) => setCurrentUserFirstName(e.target.value)}
                type="text" />
          </label>
          <button
              className="form-article__btn"
              onClick={cloudFunctionTrigger}
          >
            Update first name
          </button>

          <br />

          <label className='form-update__label'>
            <strong> Last name </strong>
            <input
                className='form-update__input'
                value={currentUserLastName}
                onChange={
                  (e) => setCurrentUserLastName(e.target.value)
                }
                type="text"
            />
          </label>
          <button
              className="form-article__btn"
              onClick={cloudFunctionTrigger}
          >
            Update last name
          </button>

          <br />

          <label className='form-update__label'>
            <strong> Address </strong>
            <input
                className='form-update__input'
                type="text"
                onChange={
                  (e) => setAddress(e.target.value)
                }
            />
          </label>
          <button
              className="form-article__btn"
              onClick={cloudFunctionTrigger}
          >Update address</button>

          <br />

          <label className='form-update__label'>
            <strong> Bio </strong>
            <input
                className='form-update__input'
                type="text"
                onChange={
                  (e) => setBio(e.target.value)
                }
            />
          </label>
          <button
              className="form-article__btn"
              onClick={cloudFunctionTrigger}
          >
            Update bio
          </button>

          <br />

          <label className='form-update__label'>
            <strong> Password </strong>
            <input
                className='form-update__input'
                ref={passwordRef}
                type="password"
            />
          </label>
          <label className='form-update__label'>
            <strong> Confirm password </strong>
            <input className='form-update__input' ref={passwordConfirmRef} type="password" />
          </label>
          {passwordError&&<div>{passwordError}</div>}
          <button className="form-article__btn" onClick={updatePassword}>Change password</button>

          <br />

          <label className='form-update__label'>
            <strong> Email </strong>
            <input
                className='form-update__input'
                ref={emailRef}
                type="email"
            />
          </label>
          <button 
              className="form-article__btn"
              onClick={updateEmail}
          >
            Change email
          </button>

          <br />

          <Link to="/DeleteProfilePage">
            <Button variant="danger">Delete Account</Button>
          </Link>

        </form>

        </div>
    </>
  );
}