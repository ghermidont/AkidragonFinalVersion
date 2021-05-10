import React from 'react';

import {Link} from "react-router-dom";

//Email verification tutorial
//https://www.youtube.com/watch?v=Vj96piq6WGk

export default function EmailVerification() {
    console.log("Step1EmailVerification worked!");

    return(
        <section style={{paddingTop: "10em"}}>
            <h1>We’ve just sent a link to your email address. Confirm your email address to continue login to your account.</h1>
            <Link
                to="/"
                className="link-primary">
                Go back main page
            </Link>
        </section>
    );
}