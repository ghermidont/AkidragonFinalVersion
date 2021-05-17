import React, {useEffect, useState} from 'react';
import {useAuthContext} from "../context/AuthContext";
import {projectFirestore} from "../fireBase";
import UserProfilePage from "./UserAccount/UserProfilePage";
import Step2CompleteProfilePage from "./UserAccount/CreateUserAccount/Step2CompleteProfilePage";
import Step1EmailVerificationPage from "./UserAccount/CreateUserAccount/Step1EmailVerificationPage";

export default function PreUserProfilePageCheck(props) {
    const {currentUser, moderator, setModerator} = useAuthContext();
    const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
    const [userInfo, setUserInfo] = useState(false);

    async function checkUserFieldsExist() {
        await projectFirestore
            .collection('user-profiles')
            .doc(currentUser.uid?currentUser.uid:CurrentUserFromLS.uid)
            .get().
            then((doc) => {
                if (doc.exists) {
                    return doc.data['firstName']!==null&&setUserInfo(true);
                }else{
                    return setUserInfo(false);
                }

            })
    }

    async function checkCurrentUserRole(User) {
        await projectFirestore
            .collection("roles")
            .doc(User.uid)
            .get()
            .then((doc)=>{
                if(doc.exists){
                    return doc.data['moderator']===true?setModerator(true):setModerator(false);
                }else{
                    return setModerator(false);
                }

            });
    }

    async function checkCurrentUserStates() {
        await checkUserFieldsExist()
            .then(() => console.log("checkUserFieldsExist() executed"))
            .catch(err => console.log(err));
        await checkCurrentUserRole(currentUser ? currentUser.uid : CurrentUserFromLS.uid)
            .then(() => localStorage.setItem("currentUserRole", JSON.stringify({moderator})));
    }

    useEffect(()=>{
        console.log(checkCurrentUserStates().then(() => console.log("States checked")));
        console.log(userInfo);
   },[]);

    return (
        <>
            {CurrentUserFromLS.emailVerified===true?
                userInfo?<UserProfilePage />:<Step2CompleteProfilePage />
            :<Step1EmailVerificationPage />
            }
        </>
    );
}