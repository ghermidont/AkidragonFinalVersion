import React, {useEffect, useState} from 'react';
import {useAuthContext} from "../context/AuthContext";
import {projectFirestore} from "../fireBase";
import UserProfilePage from "./UserAccount/UserProfilePage";
import Step2CompleteProfilePage from "./UserAccount/CreateUserAccount/Step2CompleteProfilePage";
import Step1EmailVerificationPage from "./UserAccount/CreateUserAccount/Step1EmailVerificationPage";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function PreUserProfilePageCheck(props) {
    const {currentUser} = useAuthContext();
    const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
    const [userInfo, setUserInfo] = useState();
    const[loading, setLoading] = useState();

    async function checkUserFieldsExist() {
        await projectFirestore
            .collection('user-profiles')
            .doc(currentUser.uid?currentUser.uid:CurrentUserFromLS.uid)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    return doc.data['firstName']!==null&&setUserInfo(true);
                }else{
                    return setUserInfo(false);
                }
       })
    }

    //This check is done in the user profile page
    // async function checkCurrentUserRole(User) {
    //     await projectFirestore
    //         .collection("roles")
    //         .doc(User.uid)
    //         .get()
    //         .then((doc)=>{
    //             if(doc.exists){
    //                 return doc.data['moderator']===true?setModerator(true):setModerator(false);
    //             }else{
    //                 return setModerator(false);
    //             }
    //
    //         });
    // }

   // function checkCurrentUserStates() {
   //
   //      // await checkCurrentUserRole(currentUser ? currentUser.uid : CurrentUserFromLS.uid)
   //      //     .then(() => localStorage.setItem("currentUserRole", JSON.stringify({moderator})));
   //  }

    useEffect(()=>{
        setLoading(true);
        checkUserFieldsExist()
            .then(() => setLoading(false))
            .catch(err => console.log(err));
    },[]);

    return (
        <>
        {(loading===true)?(
            <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
        ):(
            <>
                {CurrentUserFromLS.emailVerified===true?
                    userInfo?<UserProfilePage />:<Step2CompleteProfilePage />
                    :<Step1EmailVerificationPage />
                }
            </>
        )}
            </>
    );
}