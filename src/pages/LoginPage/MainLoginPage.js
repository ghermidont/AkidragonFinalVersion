import React, {useEffect} from 'react';
import LoginSignUpForm from './LoginSignUpForm';
import UserProfilePage from '../UserAccount/UserProfilePage';
import {useAuthContext} from '../../context/AuthContext';

export default function MainLoginPage() {
    console.log("MainLoginPage worked.");
    const {authListener, currentUser} = useAuthContext();
    const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
    return(
        <div>
            {currentUser||CurrentUserFromLS ?
                (
                    <UserProfilePage />
                ) : (
                    <LoginSignUpForm />
                )
            }
        </div>
    );
}