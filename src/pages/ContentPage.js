import React, {useEffect, useState} from "react";
import EntertainmentSwiper from "../components/swipers/EntertainmentSwiper";
import MatchesTournamentsSwiper from "../components/swipers/MatchesTournamentsSwiper";
import {Link} from "react-router-dom";
import logoSection from "../assets/images/dest/logo-section.png";
import {useDataFromFirestoreBanners, useDataFromFirestoreCMS} from "../customHooks/useFirestore";
import {useLanguageContext} from "../context/LanguageContext";
import {useTranslation} from "react-i18next";
import HtmlToReact from "html-to-react";

export default function Contents() {
	const {t} = useTranslation();

	//Context data.
	const {appLanguage} = useLanguageContext();

	//Get page data from the database.
	const {docsFromHookCMS} = useDataFromFirestoreCMS("web-app-cms");

	//States.
	const [ITBannerTitle, setITBannerTitle] = useState("");
	const [ITBannerText, setITBannerText] = useState("");
	const [ITSwiper1Title, setITSwiper1Title] = useState("");
	const [ITSwiper2Title, setITSwiper2Title] = useState("");

	const [ENBannerTitle, setENBannerTitle] = useState("");
	const [ENBannerText, setENBannerText] = useState("");
	const [ENSwiper1Title, setENSwiper1Title] = useState("");
	const [ENSwiper2Title, setENSwiper2Title] = useState("");

	const [vertical, setVertical] = useState();
	const [_250x250320x100320x50,  set250x250320x100320x50] = useState("");

	let selectedDoc = "";

	//Filter database received data.
	useEffect(() => {
		if (docsFromHookCMS) {
			selectedDoc = docsFromHookCMS.filter(function (doc) {
				return doc.id === "contentPage";
			});
		}
	});

	//Getting data from the database.
	const {docsFromHookBanners} = useDataFromFirestoreBanners("banners");

	let selectedBanners = "";

	//Filtering the data base data.
	useEffect(() => {
		if (docsFromHookBanners) {
			selectedBanners = docsFromHookBanners.filter(function (doc) {
				return doc.id === "contentPage";
			});
		}
	});

	//Updating the states on each database call.
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

		if (selectedBanners !== ""){
			selectedBanners.map(doc => {
				setVertical(doc.desktop.vertical);
				set250x250320x100320x50(doc.desktop._250x250320x100320x50);
			});
		}
	}, [docsFromHookCMS, docsFromHookBanners]);

	// Database banner tags parser.
	const stringTagsParser = (tag) => {
		if(tag) {
			let htmlInput = tag;
			let htmlToReactParser = new HtmlToReact.Parser(React);
			return htmlToReactParser.parse(htmlInput);
		}
		return;
	};

	return (
		<main className="page">
			<div className="banner__commercial banner__commercial--left">{stringTagsParser(vertical)}</div>
			<div className="banner__commercial banner__commercial--right">{stringTagsParser(vertical)}</div>
			<section className="video-page">
				<div className="container">
					<div className="info__logo logo-section">
						<img src={logoSection} alt="" className="info__img"/>
					</div>
					<h1 className="video-page__title title"><span>{appLanguage === "it" ? ITBannerTitle : ENBannerTitle}</span>
					</h1>
					<div className="banner banner__square">
						{stringTagsParser(_250x250320x100320x50)}
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
					<Link className="video__btn" to={"/FullStreamsList"}>
						<button className="video__btn btn">{t("ContentPage.OtherStreams")}</button>
					</Link>
				</div>
			</section>

			<section className="video">
				<div className="container">
					<h2 className="video__title">{appLanguage === "it" ? ITSwiper2Title : ENSwiper2Title}</h2>
					<MatchesTournamentsSwiper/>
					<Link className="video__btn" to={"/FullStreamsList"}>
						<button className="video__btn btn">{t("ContentPage.OtherStreams")}</button>
					</Link>
				</div>
			</section>

			<div className="contact__btn">
				<Link className="contact__btn-link" to="/ContactUsPage">
					{t("ContentPage.ContactUs")}
				</Link>
			</div>
		</main>
	);
}