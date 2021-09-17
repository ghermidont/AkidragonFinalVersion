import React, {useEffect} from "react";
import {useAuthContext} from "../../../context/AuthContext";

//Send verification email function call.
const sendVerifyEmail = (User) =>{
	User.sendEmailVerification().then(function(){
		window.alert("Verification email sent!");
	}).catch(function(error){
		window.alert(error);
	});
};

export default function Step1EmailVerificationPage() {
	//Two user instances for the case of page reload.
	const {currentUser, handleLogout} = useAuthContext();
	const CurrentUserFromLS = JSON.parse(localStorage.getItem("LSCurrentUser"));
	const User = currentUser?currentUser:CurrentUserFromLS;

	//This hook sends the email confirmation message on page load.
	useEffect(()=>{
		sendVerifyEmail(User);
		handleLogout();
	}, []);

	return(
		<section style={{paddingTop: "10em"}}>
			<h1>We’ve just sent a link to your email address. Confirm your email address and login to your account.</h1>
		</section>
	);
}