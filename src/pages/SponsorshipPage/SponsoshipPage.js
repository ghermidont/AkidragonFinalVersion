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

	const {
		ENBannerUrl,
		ITBannerUrl,
		ENHowItWorksTitle,
		ITHowItWorksTitle,
		ENHowItWorksText,
		ITHowItWorksText
	} = pageCMSContent;

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

					{/*How does it work text here.*/}
					<div className='banner__inner'>
						<div className='banner__text'>
							<div className='banner__text-title'>
								{appLanguage === "it" ? ITHowItWorksTitle : ENHowItWorksTitle}
							</div>
							<div>
								{appLanguage === "it" ? ITHowItWorksText : ENHowItWorksText}
							</div>
						</div>
						<SponsorshipForm/>
					</div>
				</div>
			</section>
		</>
	)
	;
}

export default SponsorshipPage;