import React from 'react';
import {useAuthContext} from "../../../context/AuthContext";
import {projectFirestore} from "../../../fireBase";
import {useHistory} from 'react-router-dom';
import useStorage from "../../../customHooks/useStorage";

export default function Step2CompleteProfilePage() {
    console.log("Step2CompleteProfilePage");
    const history = useHistory();
    const {currentUser, signUpFormUserUploadedFile} = useAuthContext();
    const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));

    let currentUserFirstName = "";
    let currentUserLastName = "";
    let currentDisplayName = "";

    const {url, error} = useStorage(signUpFormUserUploadedFile, CurrentUserFromLS);

   const writeWithFBcallback = () => {
        const collectionRef = projectFirestore.collection('user-profiles').doc(currentUser.uid);
        collectionRef.set(
            {
                address: "",
                bio: "",
                dateOfBirth: "",
                displayName: currentDisplayName,
                firstName: currentUserFirstName,
                lastName: currentUserLastName,
                objectId: currentUser.uid
            })
            .then(() => {
                history.push("/UserProfilePage", {from: "/ContactUsForm"});
                return console.log("user-profile collection added successfully.");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
   }

    // const cloudFunctionTrigger = () => {
    //     console.log("Step2CompleteProfilePage cloudFunctionTrigger()");
    //     const addData = functions.httpsCallable('setUserData');
    //     addData({
    //         photoURL: url,
    //         firstName: currentUserFirstName,
    //         lastName: currentUserLastName,
    //         displayName: currentDisplayName
    //     })
    //         .then((result) => {
    //             history.push("/UserProfilePage", {from: "/ContactUsForm"});
    //             return console.log(" Step2 cloud function worked. \n User profile info completed successfully!");
    //         }
    //         ).catch((error) => {
    //         console.log(error.code + " " + error.message + "" + error.details);
    //     });
    // }

    return(
        <>
            <div className='form-article__body form-login__body'>
                <h1 className="title form-title">Complete Profile</h1>
                <form className="form-article">
                    <label className='form-article__label'>
                        First Name
                        <input
                               autoFocus
                               required
                               onChange={
                                   (e) => currentUserFirstName = e.target.value}
                               className='form-article__input'
                               type="text"
                        />
                        </label>
                    <label className='form-article__label'>
                        Last Name
                        <input
                            type="text"
                            required
                            onChange={
                                (e) => currentUserLastName = e.target.value}
                            className='form-article__input' type="text"/>
                    </label>
                    <label className='form-article__label'>
                        Display Name
                        <input
                            required
                            onChange={
                                (e) => currentDisplayName = e.target.value}
                            className='form-article__input'
                            type="text"/>
                    </label>
                    <button
                        className="form-article__btn"
                        onClick={writeWithFBcallback}
                    >
                        Save
                    </button>
                </form>
            </div>
        </>
    );
}