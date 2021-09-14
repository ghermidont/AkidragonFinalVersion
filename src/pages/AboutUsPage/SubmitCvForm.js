import React, {useEffect, useState} from "react";
import emailjs from "emailjs-com";
import {init} from "emailjs-com";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
//Styles import.
import classes from "./SubmitCvForm.module.scss";

init("user_ryi2yglqohFlHpuZyAqiJ");

export default function SubmitCvForm() {
	const {t} = useTranslation();
	const history = useHistory();
	//States.
	const [checkBoxState, setCheckBoxState] = useState(true);
	const [sizeExceededError, setSizeExceededError] = useState();
	const [fileSize, setFileSize] = useState(0);	

	useEffect(() => {
		if (fileSize > 512000) {
			setSizeExceededError(true);
		} else {
			setSizeExceededError(false);
		}
	}, [fileSize]
	);

	function sendEmail(e) {
		//This default function prevents the page from refreshing when we click the submit button;
		e.preventDefault();
		if (sizeExceededError === false) {
			emailjs.sendForm("service_neq4dxf", "template_cmcxzgs", "#resume-form", "user_ryi2yglqohFlHpuZyAqiJ")
				.then(() => {
					window.alert(t("SubmitCVForm.MessageSent"));
					history.push("/", {from: "/SubmitCVForm"});
				}, () => {
					window.alert(t("SubmitCVForm.ConnectionError"));
				});
			e.target.reset();
		}
	}

	return (
		<>
			<div className='form-update__body'>
				<h1 className="title form__title">
					{t("SubmitCVForm.SubmitCVForm")}Submit CV Form
				</h1>

				<form
					className="form-update"
					id="resume-form"
					onSubmit={sendEmail}
					method="POST"
				>
					<input
						className='form-update__input'
						placeholder="Name"
						id="name"
						type="text"
						required
						name="name"
					/>
					<input
						className='form-update__input'
						type="email"
						required
						placeholder="Email"
						id="email"
						aria-describedby="emailHelp"
						name="email"
					/>
					<label className={classes.label}>
						<input
							className={classes.check}
							type="checkbox"
							value={!checkBoxState ? "I consent to the processing of my personal data." : ""}
							name="checkbox"
							onChange={() => {
								!checkBoxState ? setCheckBoxState(true) : setCheckBoxState(false);
							}}
						/>
						{t("SubmitCVForm.Consent")}
					</label>
					<div className="form-article__box-btn">
						{sizeExceededError === true &&
            <error style={{color: "red"}}>{t("SubmitCVForm.MaxFileSizeExceeded")}</error>}
						<label
							className="btn-upload"
							style={{display: "block"}}
						> {t("SubmitCVForm.AttachFile")}:
							<input
								className='form__name visually-hidden'
								type="file"
								name="attachment"
								required
								id="fileInput"
								onChange={e => setFileSize(e.target.files[0].size)}
							/>
							{fileSize !== 0 && <div style={{marginTop: "1em"}}>{t("SubmitCVForm.FileUploaded")}</div>}
						</label>
						<input
							className='btn-upload'
							type="submit"
							value={t("SubmitCVForm.SubmitButton")}
						/>
					</div>
					<p>{t("SubmitCVForm.MaxFileSize")}</p>
				</form>
			</div>
		</>
	);
}