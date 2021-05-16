import React, {useEffect, useState} from 'react';
import {useAuthContext} from "../context/AuthContext";
import {projectFirestore} from "../fireBase";
import UserProfilePage from "./UserAccount/UserProfilePage";
import Step2CompleteProfilePage from "./UserAccount/CreateUserAccount/Step2CompleteProfilePage";

function PreUserProfilePageCheck(props) {
    const {currentUser, setModerator} = useAuthContext();
    const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
    const [userInfo, setUserInfo] = useState();

    async function getUserDoc() {
        projectFirestore
            .collection('user-profiles')
            .doc(currentUser.uid?currentUser.uid:CurrentUserFromLS)
            .get().
            then((doc) => {
            if (doc.exists) {
                return doc.data['firstName']!==undefined&&setUserInfo(true);
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

    useEffect(()=>{
        getUserDoc().then(()=>console.log("getUserDoc() executed"));
        checkCurrentUserRole(currentUser?currentUser.uid:CurrentUserFromLS.uid).then(()=>console.log("checkCurrentUserRole executed"));
   },[]);

    return (
        <>
            {userInfo?
                (
                    <UserProfilePage />
                ) : (
                    <Step2CompleteProfilePage />
                )
            }
        </>
    );
}

export default PreUserProfilePageCheck;