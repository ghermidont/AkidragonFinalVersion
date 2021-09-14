import React, {useEffect, useState} from "react";
import ContactUsForm from "./ContactUsForm";
import {useDataFromFirestoreCMS} from "../../customHooks/useFirestore";
import {useLanguageContext} from "../../context/LanguageContext";
import {useTranslation} from "react-i18next";
//WhatsApp package import.
import ReactWhatsapp from "react-whatsapp";

function ContactUsPage() {
	const {t} = useTranslation();
	const {appLanguage} = useLanguageContext();

	//Getting data from the database.
	const {docsFromHookCMS} = useDataFromFirestoreCMS("web-app-cms");

	//States
	const [ENAddress, setENAddress] = useState("");
	const [ITAddress, setITAddress] = useState("");
	const [ENText, setENText] = useState("");
	const [ITText, setITText] = useState("");
	const [ENTitle, setENTitle] = useState("");
	const [ITTitle, setITTitle] = useState("");
	const [phone, setPhone] = useState("");

	let selectedDoc = "";

	//Filtering the data from the database.
	useEffect(() => {
		if (docsFromHookCMS) {
			selectedDoc = docsFromHookCMS.filter(function (doc) {
				return doc.id === "contactUsPage";
			});
		}
	});

	//Setting the states on each database data call.
	useEffect(() => {
		if (selectedDoc !== "") {
			selectedDoc.map(doc => {
				setENAddress(doc.address.en);
				setITAddress(doc.address.it);
				setENText(doc.text.en);
				setITText(doc.text.it);
				setENTitle(doc.title.en);
				setITTitle(doc.title.it);
				setPhone(doc.phone);
			});
		}
	}, [docsFromHookCMS]);

	/** This is the link to the maps API where custom coordinates can be set and a new URL will be generated.
	 * The new URL shall be placed inside the src={""} parameter of the iframe:
	 * https://www.google.com/maps/@42.118835,10.1229544,7z?hl=en
	 * Steps: 1. input the searched address;
	 * Steps: 2. Click the burger menu in the left corner. Select the "Share or embed map";
	 * Steps: 3. Select the "Embed a map" tab;
	 * Steps: 4. Copy the new generated srs URL and paste it inside the existing iframe in the project. src={"put here"};
	 */

	return (
		<>
			<main className="page">
				<section className="contact-intro">
					<div className="container">
						<h1 className="contact-intro__title title"><span>{appLanguage === "it" ? ITTitle : ENTitle}</span></h1>
						<p className="contact-intro__text">
							{appLanguage === "it" ? ITText : ENText}
						</p>
						<ContactUsForm/>
					</div>
				</section>

				<section className="map">
					<div className="container">
						<h1 className="title map__title">{t("ContactUsForm.Headquarter")}</h1>
						<div className="map__inner">
							<div className="map__google">
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.1927690863176!2d12.475259515682398!3d41.91021457138236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f60f8c50ce9b7%3A0xd4e1f876de4002c2!2sPiazza%20del%20Popolo%2C%2018%2C%2000187%20Roma%20RM%2C%20Italy!5e0!3m2!1sen!2s!4v1629121312957!5m2!1sen!2s"
									style={{width:"100%", height:"100%", border:false}} allowFullScreen="" loading="lazy"> </iframe>
							</div>
							<ul className="map__list">
								<li className="map__item map__address">
									<span className="icon-location"> </span>
									{appLanguage === "it" ? ITAddress : ENAddress}
								</li>
								<li className="map__item map__phone">
									<span className="icon-phone"> </span>
									<a href="tel:+390636712213">{phone}</a>
								</li>
								<li className="map__item map__chat">
									<ReactWhatsapp className="icon-whatsapp" number="+390636712213"
										message="Chat to AkiDragon's representative."/>
									{t("ContactUsForm.WhatsAppMessage")}
								</li>
							</ul>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}

export default ContactUsPage;