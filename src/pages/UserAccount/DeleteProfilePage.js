import React from 'react';
import {useHistory} from "react-router-dom";
import {useAuthContext} from '../../context/AuthContext';

export default function ConfirmDeleteProfile(){
    const {currentUser} = useAuthContext;
    console.log("ConfirmDeleteProfile worked.");

    const deleteCurrentUser = () => {
    currentUser.delete().then(function() {
        useHistory.push('/');
        window.alert("Profile deleted.");
        console.log("deleteCurrentUser() worked.");
    }).catch(function(error) {
        window.alert(error);
    });

    }
    return(
        <div className="modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete profile</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Confirm profile deletion.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={deleteCurrentUser}>Delete profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
}