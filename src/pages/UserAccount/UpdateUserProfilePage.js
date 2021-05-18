import React, {useEffect, useRef, useState} from 'react';
//import {useAuthContext} from "../../context/AuthContext";
import {useDataFromFirestore} from "../../customHooks/useFirestore";
import {projectFirestore} from "../../fireBase";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext";

export default function UpdateUserProfilePage() {
  console.log("UpdateUserProfilePage() worked");
  //const {docsFromHook} = useDataFromFirestore('user-profiles');
  const {currentUser} = useAuthContext();
  const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
  const[currentUserDbInfo, setCurrentUserDbInfo] = useState({});
  const [passwordError, setPasswordError] = useState();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

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


  const updateEmail = (email) => {
    return currentUser.updateEmail(email)
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
            <img className="form-update__avatar-img" src={(currentUserDbInfo.photoURL)?currentUserDbInfo.photoURL:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/profile_pictures%2Fdepositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg?alt=media&token=5f904560-36a3-4425-9386-960fa63a92e6"} alt=""/>
          </div>
          <label className='form-update__label btn-upload'> <span className='icon-upload2'></span> Upload
            <input className='form-update__btn visually-hidden' type="file" placeholder='file'/>
          </label>
          <label className='form-update__label'>
            Birth date
            <input className='form-update__input date' type="date"
                   min="2021-05-03" max="2022-12-31"/>
          </label>
          <label className='form-update__label'>
            Display name
            <input className='form-update__input' type="text" />
          </label>

          <button className="form-article__btn">Update birth date</button>
          <label className='form-update__label'>
            First name
            <input className='form-update__input' type="text" />
          </label>
          <label className='form-update__label'>
            Last name
            <input className='form-update__input' type="text" />
          </label>
          <label className='form-update__label'>
            Address
            <input className='form-update__input' type="text" />
          </label>
          <button className="form-article__btn">Update address</button>
          <label className='form-update__label'>
            Password
            <input className='form-update__input' ref={passwordRef} type="password" />
          </label>
          <label className='form-update__label'>
            Confirm password
            <input className='form-update__input' ref={passwordConfirmRef} type="password" />
          </label>
          {passwordError&&<div>{passwordError}</div>}
          <button className="form-article__btn" onClick={updatePassword}>Change password</button>
          <label className='form-update__label'>
            Email
            <input className='form-update__input' type="email" />
          </label>
          <button className="form-article__btn">Change email</button>
        </form>
        <Link to="/DeleteProfilePage">
          <Button variant="danger">Delete Account</Button>
        </Link>
        </div>
    </>
  );
}