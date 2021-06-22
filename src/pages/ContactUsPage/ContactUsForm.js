import React, {useEffect, useState} from "react";
import emailjs from "emailjs-com";
import {init} from "emailjs-com";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

init("user_ryi2yglqohFlHpuZyAqiJ");

//TODO include e.target.reset() in all file inputs.

export default function ContactUsForm() {
	const {t} = useTranslation();
	const [checkBoxState, setCheckBoxState] = useState(true);
	const [sizeExceededError, setSizeExceededError] = useState();
	const [fileSize, setFileSize] = useState(0);
	const history = useHistory();

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
		if(fileSize>0) {
			if (sizeExceededError === false) {
				emailjs.sendForm("service_neq4dxf", "template_sij1vgl", "#contactus-form", "user_ryi2yglqohFlHpuZyAqiJ")
					.then((result) => {
						window.alert("Message sent: " + result.text);
						return result.text && history.push("/MessageSentPage", {from: "/ContactUsForm"});
					}, () => {
						window.alert("Your message was not sent due to a connection error");
					});
				e.target.reset();
			}
		}
		if(fileSize===0) {
			emailjs.sendForm("service_neq4dxf", "template_sij1vgl", "#contactus-form", "user_ryi2yglqohFlHpuZyAqiJ")
				.then((result) => {
					window.alert("Message sent: " + result.text);
					result.text && history.push("/MessageSentPage", {from: "/ContactUsForm"});
				}, (error) => {
					window.alert("Error sendding the message: " + error.text);
				});
			e.target.reset();
		}
	}

	return (

		<form className="form contact-intro__form" id="contact-form" onSubmit={sendEmail} method="POST">
			<div className="form__box">
				<input className="input"
					placeholder={t("ContactUsForm.NamePlaceHolder")}
					id="name"
					type="text"
					required
					name="name"
				/>
			</div>
			<input
				className="input"
				type="email"
				aria-describedby="emailHelp"
				name="email"
				required
				placeholder={t("ContactUsForm.EmailPlaceHolder")}
				id="email"
			/>
			<input
				className="input"
				aria-describedby="Subject"
				placeholder={t("ContactUsForm.SubjectPlaceHolder")}
				id="subject"
				type="text"
				required
				name="subject"
			/>

			<textarea
				className="input"
				cols="30"
				rows="1"
				id="message"
				name="message"
				placeholder={t("ContactUsForm.MessagePlaceHolder")}
				required
			>
			</textarea>

			<div className="form__box-btn">

				<label className='btn-upload label'>
					<span className='icon-upload2'></span>
					{t("ContactUsForm.UploadButton")}

					<input
						className='visually-hidden'
						type="file"
						name="attachment"
						id="fileInput"
						onChange={e => setFileSize(e.target.files[0].size)}
					/>
					{ fileSize!==0&&<div style={{marginTop: "1em"}}>File uploaded</div>}
				</label>
				<button
					className="btn-upload"
					type="submit">{t("ContactUsForm.SubmitButton")}
				</button>
			</div>
			<div className='form__alert' style={{marginTop: "40px"}}>
				<p>Maximum file size 500kb</p>
				<div>
					{sizeExceededError===true&&<error style={{color: "red"}}>{t("SubmitCVForm.MaxFileSizeExceeded")}</error>}
				</div>
			</div>

			<label className='form__check-label'>
				<input
					className="form__check"
					type="checkbox"
					value={!checkBoxState ? "I consent to the processing of my personal data" : ""}
					name="checkbox"
					onChange={() => {
						!checkBoxState ? setCheckBoxState(true) : setCheckBoxState(false);
					}}
				/>
				{t("ContactUsForm.Consent")}
			</label>

		</form>


	);

}
