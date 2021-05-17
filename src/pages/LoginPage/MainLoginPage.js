import React, {useEffect} from 'react';
import LoginSignUpForm from './LoginSignUpForm';
//import UserProfilePage from '../UserAccount/UserProfilePage';
import {useAuthContext} from '../../context/AuthContext';
import PreUserProfilePageCheck from "../pre-UserProfilePageCheck";

export default function MainLoginPage() {
    console.log("MainLoginPage worked.");
    const {authListener, currentUser} = useAuthContext();
    const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
    return(
        <div>
            {currentUser||CurrentUserFromLS ?
                (
                    <PreUserProfilePageCheck />
                ) : (
                    <LoginSignUpForm />
                )
            }
        </div>
    );
}