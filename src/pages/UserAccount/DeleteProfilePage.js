import React from 'react';
import {Link, useHistory} from "react-router-dom";
import {useAuthContext} from '../../context/AuthContext';
import {useTranslation} from "react-i18next";

export default function DeleteProfilePage(){

    const {currentUser} = useAuthContext;
    //const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
    console.log("DeleteProfilePage worked.");
    const history = useHistory();
    const {t} = useTranslation();

    const deleteCurrentUser = () => {
       //if(currentUser) {
            currentUser.delete().then(function () {
                window.alert("Profile deleted.");
                console.log("deleteCurrentUser() worked.");
                //TODO implement sign out here
                history.push('/');

            }).catch(function (error) {
               window.alert(error);
            });
        //}
    }

    return(
        <div style={{marginTop: "10em"}}>
             <div className="modal-body">
                <p>{t('DeleteProfilePage.ConfirmProfileDeletion')}Confirm profile deletion</p>
            </div>
            <div className="modal-footer">
                <Link to="/MainLoginPage">
                    <button type="button" className="btn btn-secondary" onClick={()=>history.push('/UserProfilePage')} data-bs-dismiss="modal">{t('DeleteProfilePage.CancelButton')}Cancel</button>
                </Link>
                <button type="button" className="btn btn-primary" onClick={()=>deleteCurrentUser()}>{t('DeleteProfilePage.DeleteProfileButton')}Delete profile</button>
            </div>
        </div>
    );
}