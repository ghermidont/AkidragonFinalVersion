import React, {useEffect, useState} from 'react';
import {useAuthContext} from "../context/AuthContext";
import {projectFirestore} from "../fireBase";
import UserProfilePage from "./UserAccount/UserProfilePage";
import Step2CompleteProfilePage from "./UserAccount/CreateUserAccount/Step2CompleteProfilePage";
import Step1EmailVerificationPage from "./UserAccount/CreateUserAccount/Step1EmailVerificationPage";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function PreUserProfilePageCheck(props) {
    console.log("PreUserProfilePageCheck");
    const {currentUser} = useAuthContext();
    const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
    const [userInfo, setUserInfo] = useState(true);
    const [loading, setLoading] = useState();

    async function checkUserFieldsExist() {
        console.log("***checkUserFieldsExist()***");
        await projectFirestore
            .collection('user-profiles')
            .doc(currentUser.uid?currentUser.uid:CurrentUserFromLS.uid)
            .get()
            .then((doc) => {
                if (doc.exists) {
                   return doc.data().firstName===undefined&&setUserInfo(false);
                }else{
                   return setUserInfo(true);

                }
       })
    }

    useEffect(()=>{
        setLoading(true);
        checkUserFieldsExist()
            .then(() => {setLoading(false);
                })
            .catch(err => console.error(err));
    },[currentUser]);

    return (
        <>
        {(loading===true)?(
            <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
        ):(
            <>
                {CurrentUserFromLS.emailVerified===true?userInfo===true?<UserProfilePage />:<Step2CompleteProfilePage />:<Step1EmailVerificationPage />}
            </>
        )}
            </>
    );
}