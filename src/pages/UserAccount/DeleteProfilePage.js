import React from 'react';
import {Link, useHistory} from "react-router-dom";
import {useAuthContext} from '../../context/AuthContext';

export default function DeleteProfilePage(){

    const {currentUser} = useAuthContext;
    //const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
    console.log("DeleteProfilePage worked.");
    const history = useHistory();

    const deleteCurrentUser = () => {
       //if(currentUser) {
            currentUser.delete().then(function () {
                window.alert("Profile deleted.");
                console.log("deleteCurrentUser() worked.");
                history.push('/');
            }).catch(function (error) {
               window.alert(error);
            });
        //}
    }

    return(
        <div style={{marginTop: "10em"}}>
            <div>
                <h5>Delete profile</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <p>Confirm profile deletion.</p>
            </div>
            <div className="modal-footer">
                <Link to="/MainLoginPage">
                    <button type="button" className="btn btn-secondary" onClick={()=>history.push('/UserProfilePage')} data-bs-dismiss="modal">Cancel</button>
                </Link>
                <button type="button" className="btn btn-primary" onClick={()=>deleteCurrentUser()}>Delete profile</button>
            </div>
        </div>
    );
}