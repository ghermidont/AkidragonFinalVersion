import React, {useEffect, useState} from "react";
import EntertainmentSwiper from "../components/swipers/EntertainmentSwiper";
import MatchesTournamentsSwiper from "../components/swipers/MatchesTournamentsSwiper";
import {Link} from "react-router-dom";
import logoSection from "../assets/images/dest/logo-section.png";
import {useDataFromFirestoreCMS} from "../customHooks/useFirestore";
import {useLanguageContext} from "../context/LanguageContext";
import {useTranslation} from "react-i18next";

export default function Contents() {
	const {t} = useTranslation();
	const {docsFromHookCMS} = useDataFromFirestoreCMS("web-app-cms");
	const [ITBannerTitle, setITBannerTitle] = useState("");
	const [ITBannerText, setITBannerText] = useState("");
	const [ITSwiper1Title, setITSwiper1Title] = useState("");
	const [ITSwiper2Title, setITSwiper2Title] = useState("");

	const [ENBannerTitle, setENBannerTitle] = useState("");
	const [ENBannerText, setENBannerText] = useState("");
	const [ENSwiper1Title, setENSwiper1Title] = useState("");
	const [ENSwiper2Title, setENSwiper2Title] = useState("");
	const {appLanguage} = useLanguageContext();

	let selectedDoc = "";

	useEffect(() => {
		if (docsFromHookCMS) {
			selectedDoc = docsFromHookCMS.filter(function (doc) {
				return doc.id === "contentPage";
			});
		}
	});

	useEffect(() => {
		if (selectedDoc !== "") {
			selectedDoc.map(doc => {
				setITBannerTitle(doc.bannerTitle.it);
				setITBannerText(doc.bannerText.it);
				setITSwiper1Title(doc.swiper1.it);
				setITSwiper2Title(doc.swiper2.it);

				setENBannerTitle(doc.bannerTitle.en);
				setENBannerText(doc.bannerText.en);
				setENSwiper1Title(doc.swiper1.en);
				setENSwiper2Title(doc.swiper2.en);
			});
		}
	}, [docsFromHookCMS]);

	return (
		<main className="page">
			<section className="video-page">
				<div className="container">
					<div className="info__logo logo-section">
						<img src={logoSection} alt="" className="info__img"/>
					</div>
					<h1 className="video-page__title title"><span>{appLanguage === "it" ? ITBannerTitle : ENBannerTitle}</span>
					</h1>
					<div className="banner content__banner">

					</div>
					<p className="video-page__subtitle">
						{appLanguage === "it" ? ITBannerText : ENBannerText}
					</p>
				</div>
			</section>

			<section className="video">
				<div className="container">
					<h2 className="video__title">{appLanguage === "it" ? ITSwiper1Title : ENSwiper1Title}</h2>

					<EntertainmentSwiper/>
					<button className="video__btn btn">{t("ContentPage.OtherStreams")}</button>
				</div>
			</section>

			<section className="video">
				<div className="container">
					<h2 className="video__title">{appLanguage === "it" ? ITSwiper2Title : ENSwiper2Title}</h2>
					<MatchesTournamentsSwiper/>
					<button className="video__btn btn">{t("ContentPage.OtherStreams")}</button>
				</div>
			</section>

			<div className="contact__btn">
				<Link to="/ContactUsPage">
					<a className="contact__btn-link">{t("ContentPage.ContactUs")}</a>
				</Link>
			</div>
		</main>
	);
}