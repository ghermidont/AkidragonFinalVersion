import React from "react";
import {Link, useHistory} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext";
import {useTranslation} from "react-i18next";
import {projectFirestore} from "../../fireBase";

export default function DeleteProfilePage(){
	const history = useHistory();
	const {t} = useTranslation();

	//Logout function import.
	const {handleLogout} = useAuthContext();

	//Two user instances for page refresh safety.
	const {currentUser} = useAuthContext();
	const CurrentUserFromLS = JSON.parse(localStorage.getItem("LSCurrentUser"));

	//Delete user info from the database after the user account is deleted.
	const deleteUserInfoFromDB = () => {
		projectFirestore.collection("user-profiles").doc(CurrentUserFromLS.id).delete().then(() => {
			console.log("User info deleted.");
		}).catch(() => {
			console.log("No such user information");
		});
	};

	//Delete user function call.
	const deleteCurrentUser = async () => {
		await currentUser.delete().then(function () {
			window.alert("Profile deleted.");
			deleteUserInfoFromDB();
			handleLogout();
			history.push("/");
		}).catch(function (error) {
			window.alert(error);
		});
	};

	return(
		<div style={{marginTop: "10em"}}>
			<div className="modal-body">
				<p>{t("DeleteProfilePage.ConfirmProfileDeletion")}</p>
			</div>
			<div className="modal-footer">
				<Link to="/MainLoginPage">
					<button type="button" className="btn btn-secondary" onClick={()=>history.push("/UserProfilePage")} data-bs-dismiss="modal">{t("DeleteProfilePage.CancelButton")}</button>
				</Link>
				<button type="button" className="btn btn-primary" onClick={()=>deleteCurrentUser()}>{t("DeleteProfilePage.DeleteProfileButton")}</button>
			</div>
		</div>
	);
}