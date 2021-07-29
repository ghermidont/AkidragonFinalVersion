import React, {useEffect, useState} from "react";
import SponsorshipForm from "./SponsorshipForm";
import {useTranslation} from "react-i18next";
import {useLanguageContext} from "../../context/LanguageContext";
import {useDataFromFirestoreCMS} from "../../customHooks/useFirestore";

function SponsorshipPage() {
	const [pageCMSContent, setCMSPageContent] = useState({
		ENBannerUrl: "",
		ITBannerUrl: "",
		ENHowItWorksTitle: "",
		ITHowItWorksTitle: "",
		ENHowItWorksText: "",
		ITHowItWorksText: ""
	});

	const {ENBannerUrl, ITBannerUrl, ENHowItWorksTitle, ITHowItWorksTitle, ENHowItWorksText, ITHowItWorksText } = pageCMSContent;

	const {docsFromHookCMS} = useDataFromFirestoreCMS("web-app-cms");

	useEffect(() => {
		if (docsFromHookCMS) {
			selectedDoc = docsFromHookCMS.filter(function (doc) {
				return doc.id === "sponsorshipPage";
			});
		}
	});

	let selectedDoc = "";

	useEffect(() => {
		if (selectedDoc !== "") {
			selectedDoc.map(doc => {
				setCMSPageContent({
					ENBannerUrl: doc.bannerUrl.en,
					ITBannerUrl: doc.bannerUrl.it,
					ENHowItWorksTitle: doc.howItWorksTitle.en,
					ITHowItWorksTitle: doc.howItWorksTitle.it,
					ENHowItWorksText: doc.howItWorksText.en,
					ITHowItWorksText: doc.howItWorksText.it
				});
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
			{/*How does it work text here.*/}
			<div>
				{appLanguage === "it" ? ITHowItWorksTitle : ENHowItWorksTitle}
				{appLanguage === "it" ? ITHowItWorksText : ENHowItWorksText}

			</div>
			<SponsorshipForm />
		</>
	);
}

export default SponsorshipPage;