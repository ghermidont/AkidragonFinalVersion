import React, {useEffect, useRef, useState} from "react";
import {useAuthContext} from "../../../context/AuthContext";
import {functions, projectStorage} from "../../../fireBase";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function Step2CompleteProfilePage() {
	const {t} = useTranslation();
	let publishBtnRef = useRef();
	const history = useHistory();
	const {userUploadedPictureUrl} = useAuthContext();
	const [currentUserFirstName, setCurrentUserFirstName] = useState("");
	const [currentUserLastName, setCurrentUserLastName] = useState("");
	const [currentDisplayName, setCurrentDisplayName] = useState("");
	const {signUpFormUserUploadedFile, setUserUploadedPictureUrl} = useAuthContext();

	useEffect(()=>{
		if (signUpFormUserUploadedFile) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(File){
				try {
					const storageRef = projectStorage.ref("profile_pictures/").child(File.name);
					storageRef.put(File).on("state_changed", () => {
					},  (err) => {
						window.alert("Error: " + err);
					}, async()=>{
						const finalUrl = await storageRef.getDownloadURL();
						finalUrl!==undefined&&setUserUploadedPictureUrl(finalUrl);
					});
				} catch {
					window.alert("File not uploaded");
				}
			}
			putFile(signUpFormUserUploadedFile).then();
		}
	}, []);

	const cloudFunctionTrigger = () => {
		publishBtnRef.current&&publishBtnRef.current.setAttribute("disabled", "disabled");

		const addData = functions.httpsCallable("setUserData");
		addData({
			"photoURL": userUploadedPictureUrl,
			"firstName": currentUserFirstName,
			"lastName": currentUserLastName,
			"displayName": currentDisplayName
		})
			.then(() => {
				publishBtnRef.current&&publishBtnRef.current.removeAttribute("disabled");
				history.push("/UserProfilePage", {from: "/Step2CompleteProfilePage"});
			}
			).catch((error) => {
				window.alert("Error: " + error.code + " " + error.message + " " + error.details);
			});
	};

	return(
		<>
			<div className='form-article__body form-login__body'>
				<h1 className="title form-title" style={{marginBottom:"6rem"}}>{t("Step2CompleteProfilePage.CompleteProfile")}</h1>
				<form className="form-article">
					<label className='form-article__label'>
						{t("Step2CompleteProfilePage.FirstName")}
						<input
							autoFocus
							required
							value={currentUserFirstName}
							onChange={
								(e) => setCurrentUserFirstName(e.target.value)}
							className='form-article__input'
							type="text"
						/>
					</label>
					<label className='form-article__label'>
						{t("Step2CompleteProfilePage.LastName")}
						<input
							type="text"
							required
							value={currentUserLastName}
							onChange={
								(e) => setCurrentUserLastName(e.target.value)}
							className='form-article__input'
						/>
					</label>
					<label className='form-article__label'>
						{t("Step2CompleteProfilePage.DisplayName")}
						<input
							required
							value={currentDisplayName}
							onChange={
								(e) => setCurrentDisplayName(e.target.value)}
							className='form-article__input'
							type="text"/>
					</label>
					<button
						ref={publishBtnRef}
						className="form-article__btn"
						onClick={cloudFunctionTrigger}
					>
						{t("Step2CompleteProfilePage.Submit")}
					</button>
				</form>
			</div>
		</>
	);
}