import React from "react";
import LoginSignUpForm from "./LoginSignUpForm";
import {useAuthContext} from "../../context/AuthContext";
import PreUserProfilePageCheck from "../pre-UserProfilePageCheck";

export default function MainLoginPage() {
	const {currentUser} = useAuthContext();
	const CurrentUserFromLS = JSON.parse(localStorage.getItem("LSCurrentUser"));

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