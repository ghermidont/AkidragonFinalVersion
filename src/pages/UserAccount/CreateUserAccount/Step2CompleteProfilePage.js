import React, {useEffect, useRef, useState} from 'react';
import {useAuthContext} from "../../../context/AuthContext";
import {functions, projectStorage} from "../../../fireBase";
import {useHistory} from 'react-router-dom';
import useStorage from "../../../customHooks/useStorage";
import {useTranslation} from "react-i18next";

export default function Step2CompleteProfilePage() {
    console.log("Step2CompleteProfilePage");

    const {t} = useTranslation();
    let publishBtnRef = useRef();
    const history = useHistory();
    const {userUploadedPictureUrl} = useAuthContext();
    // const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
    const [currentUserFirstName, setCurrentUserFirstName] = useState('');
    const [currentUserLastName, setCurrentUserLastName] = useState('');
    const [currentDisplayName, setCurrentDisplayName] = useState('');
    const {signUpFormUserUploadedFile, setUserUploadedPictureUrl} = useAuthContext();
    const [url, setUrl] = useState('');

    useEffect(()=>{
        if (signUpFormUserUploadedFile) {
            async function putFile(File){
                try {
                    const storageRef = projectStorage.ref('profile_pictures/').child(File.name);
                    storageRef.put(File).on('state_changed', (err) => {
                    },  (err) => {
                        console.log(err);
                    }, async()=>{
                        const finalUrl = await storageRef.getDownloadURL();
                        finalUrl!==undefined&&setUserUploadedPictureUrl(finalUrl);
                        setUrl(finalUrl);
                    });
                } catch {
                    console.error("File not uploaded");
                }
            }
            putFile(signUpFormUserUploadedFile).then(()=>console.log(url));
        }
    }, []);

    const cloudFunctionTrigger = () => {
        console.log("Step2CompleteProfilePage cloudFunctionTrigger()");
        console.log("Step2 photo url:");
        console.log(userUploadedPictureUrl);
        publishBtnRef.current&&publishBtnRef.current.setAttribute("disabled", "disabled");

        const addData = functions.httpsCallable('setUserData');
        addData({
            "photoURL": userUploadedPictureUrl,
            "firstName": currentUserFirstName,
            "lastName": currentUserLastName,
            "displayName": currentDisplayName
        })
            .then((result) => {
                publishBtnRef.current&&publishBtnRef.current.removeAttribute("disabled");
                history.push("/UserProfilePage", {from: "/Step2CompleteProfilePage"});
                return console.log(" Step2 cloud function worked. \n User profile info completed successfully!");
            }
            ).catch((error) => {
            console.log(error.code + " " + error.message + "" + error.details);
        });
    }

    return(
        <>
            <div className='form-article__body form-login__body'>
                <h1 className="title form-title">{t('Step2CompleteProfilePage.CompleteProfile')}</h1>
                <form className="form-article">
                    <label className='form-article__label'>
                        {t('Step2CompleteProfilePage.FirstName')}
                        <input
                               autoFocus
                               required
                               value={currentUserFirstName}
                               onChange={
                                   (e) => setCurrentUserFirstName(e.target.value)}
                               className='form-article__input'
                               type="text"
                        />
                        </label>
                    <label className='form-article__label'>
                        {t('Step2CompleteProfilePage.LastName')}
                        <input
                            type="text"
                            required
                            value={currentUserLastName}
                            onChange={
                                (e) => setCurrentUserLastName(e.target.value)}
                            className='form-article__input' type="text"/>
                    </label>
                    <label className='form-article__label'>
                        {t('Step2CompleteProfilePage.DisplayName')}
                        <input
                            required
                            value={currentDisplayName}
                            onChange={
                                (e) => setCurrentDisplayName(e.target.value)}
                            className='form-article__input'
                            type="text"/>
                    </label>
                    <button
                        ref={publishBtnRef}
                        className="form-article__btn"
                        onClick={cloudFunctionTrigger}
                    >
                        {t('Step2CompleteProfilePage.Submit')}
                    </button>
                </form>
            </div>
        </>
    );
}

// USEFUL CODE:
// const writeWithFBcallback = () => {
//      const collectionRef = projectFirestore.collection('user-profiles').doc(currentUser.uid);
//      collectionRef.set(
//          {
//              address: "",
//              bio: "",
//              dateOfBirth: "",
//              displayName: currentDisplayName,
//              firstName: currentUserFirstName,
//              lastName: currentUserLastName,
//              objectId: currentUser.uid
//          })
//          .then(() => {
//              history.push("/UserProfilePage", {from: "/ContactUsForm"});
//              return console.log("user-profile collection added successfully.");
//          })
//          .catch((error) => {
//              console.error("Error updating document: ", error);
//          });
// }
