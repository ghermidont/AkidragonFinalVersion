import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useAuthContext} from "../../../context/AuthContext";
import {projectStorage} from "../../../fireBase";
import {Button} from "react-bootstrap";

const sendVerifyEmail = (User) =>{
    User.sendEmailVerification().then(function(){
        window.alert("Verification email sent!");
    }).catch(function(error){
        window.alert(error);
    });
    console.log("VerifyEmail function worked!");
};

export default function Step1EmailVerificationPage() {
    console.log("Step1EmailVerification worked!");
    const {currentUser, handleLogout, signUpFormUserUploadedFile, setUserUploadedPictureUrl} = useAuthContext();
    const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
    const User = currentUser?currentUser:CurrentUserFromLS;
    const [url, setUrl] = useState('');

    useEffect(()=>{
        sendVerifyEmail(User);
        handleLogout();
        if (signUpFormUserUploadedFile) {
            async function putFile(File){
                try {
                    const storageRef = projectStorage.ref('profile_pictures/').child(File.name);
                    storageRef.put(File).on('state_changed', (err) => {
                    },  (err) => {
                        console.log(err);
                    }, async()=>{
                        const finalUrl = await storageRef.getDownloadURL();
                        finalUrl!==undefined&&setUserUploadedPictureUrl(finalUrl);
                        setUrl(finalUrl);
                    });
                } catch {
                    console.error("File not uploaded");
                }
            }
            putFile(signUpFormUserUploadedFile).then(()=>console.log(url));
        }
    }, []);

    return(
        <section style={{paddingTop: "10em"}}>
            <h1>We’ve just sent a link to your email address. Confirm your email address and login to your account.</h1>
            <Link
                to="/"
                className="link-primary">
                Go back to main page
                You haven't received any email, Resend the message: <Button type="button" onClick={sendVerifyEmail}>Resend</Button>
            </Link>
        </section>
    );
}