import React from "react";
import LoginSignUpForm from "./LoginSignUpForm";
import {useAuthContext} from "../../context/AuthContext";
import PreUserProfilePageCheck from "../pre-UserProfilePageCheck";

export default function MainLoginPage() {
	// Two current user instances are called for safety reasons in case of page reload.
	// There is the context stored instance of the user and the one stored in the local storage at the login moment.
	const {currentUser} = useAuthContext();
	const CurrentUserFromLS = JSON.parse(localStorage.getItem("LSCurrentUser"));

	/*
	*   IF (current user exists)
	*	{
	*		the user is redirected to the pre-user profile page check page
	*		where the user is checked if the user provided the personal data.
	*	} ELSE {
	*		If current user does not exist the user is redirected to the login page.
	*	}
	*/

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