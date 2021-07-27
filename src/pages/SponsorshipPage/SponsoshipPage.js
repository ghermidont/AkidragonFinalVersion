import React, {useEffect, useState} from "react";
import SponsorshipForm from "./SponsorshipForm";
import {useTranslation} from "react-i18next";
import {useLanguageContext} from "../../context/LanguageContext";
import {useDataFromFirestoreCMS} from "../../customHooks/useFirestore";

function SponsorshipPage() {
	const [ENBannerUrl, setENBannerUrl] = useState("");
	const [ITBannerUrl, setITBannerUrl] = useState("");

	const {docsFromHookCMS} = useDataFromFirestoreCMS("web-app-cms");

	useEffect(() => {
		if (docsFromHookCMS) {
			selectedDoc = docsFromHookCMS.filter(function (doc) {
				return doc.id === "aboutUsPage";
			});
		}
	});

	let selectedDoc = "";

	useEffect(() => {
		if (selectedDoc !== "") {
			selectedDoc.map(doc => {
				setENBannerUrl(doc.banner.en);
				setITBannerUrl(doc.banner.it);
			});
		}
	}, [docsFromHookCMS]);

	const {t} = useTranslation();
	const {appLanguage} = useLanguageContext();
	return (
		<>
			<div>{t("SponsorshipPage.PageTitle")}</div>

			<section className="banner">
				<div className="container">
					<div className="banner__image">
						{/*TODO Add change banner option to the CMS*/}
						<img className="banner__img" src={appLanguage === "it" ? ITBannerUrl : ENBannerUrl} alt="Akidragon banner"/>
					</div>
				</div>
			</section>

			<SponsorshipForm />
		</>
	);
}

export default SponsorshipPage;