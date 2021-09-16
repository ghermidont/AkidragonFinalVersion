import React, {useEffect, useState} from "react";
import {useAuthContext} from "../context/AuthContext";
import {projectFirestore} from "../fireBase";
import UserProfilePage from "./UserAccount/UserProfilePage";
import Step2CompleteProfilePage from "./UserAccount/CreateUserAccount/Step2CompleteProfilePage";
import Step1EmailVerificationPage from "./UserAccount/CreateUserAccount/Step1EmailVerificationPage";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function PreUserProfilePageCheck() {
	//Two user instances for the case of page refresh.
	const {currentUser} = useAuthContext();
	const CurrentUserFromLS = JSON.parse(localStorage.getItem("LSCurrentUser"));
	//States.
	const [userInfo, setUserInfo] = useState(true);
	const [loading, setLoading] = useState();

	/*
	*   IF (email verified)
	*	{
	* 		IF(user info exists in the database)
	* 		{
	* 			Redirect to the profile page.
	* 		} ELSE {
	* 			Redirect to complete profile page form.
	* 		}
	*	} ELSE {
	*		Redirect to the email verification page.
	*	}
	*/

	//The function check if there is user personal data in the database.
	async function checkUserFieldsExist() {
		await projectFirestore
			.collection("user-profiles")
			.doc(currentUser.uid?currentUser.uid:CurrentUserFromLS.uid)
			.get()
			.then((doc) => {
				if (doc.exists) {
					return doc.data().firstName===undefined&&setUserInfo(false);
				}else{
					return setUserInfo(true);
				}
			});
	}

	useEffect(()=>{
		setLoading(true);
		checkUserFieldsExist()
			.then(() => {setLoading(false);
			})
			.catch(err => console.error(err));
	},[currentUser]);

	//The loader is used for displaying smth while the user data is being checked in the database.
	return (
		<>
			{(loading===true)?(
				<Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
			):(
				<>
					{CurrentUserFromLS.emailVerified===true?userInfo===true?<UserProfilePage />:<Step2CompleteProfilePage />:<Step1EmailVerificationPage />}
				</>
			)}
		</>
	);
}