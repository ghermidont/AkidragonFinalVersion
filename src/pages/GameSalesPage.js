import React, {useEffect, useState} from "react";
import {useDataFromFirestoreCMS} from "../customHooks/useFirestore";
import {useLanguageContext} from "../context/LanguageContext";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import classes from "./styles/GameSalesPage.module.scss";

function GameSalesPage() {
	const {t} = useTranslation();
	const {appLanguage} = useLanguageContext();

	//Getting data from the database.
	const {docsFromHookCMS} = useDataFromFirestoreCMS("web-app-cms");

	//States.
	const [ITSaleGamingBannerUrl ,setITSaleGamingBannerUrl] = useState("");
	const [ENSaleGamingBannerUrl ,setENSaleGamingBannerUrl] = useState("");
	const [ITSaleGamingText ,setITSaleGamingText] = useState("");
	const [ENSaleGamingText ,setENSaleGamingText] = useState("");
	const [ITOurRoomsBannerUrl ,setITOurRoomsBannerUrl] = useState("");
	const [ENOurRoomsBannerUrl ,setENOurRoomsBannerUrl] = useState("");

	let selectedDoc = "";

	//Filter the data base received data.
	useEffect(() => {
		if (docsFromHookCMS) {
			selectedDoc = docsFromHookCMS.filter(function (doc) {
				return doc.id === "gameSalesPage";
			});
		}
	});

	//Updating the states on each database call.
	useEffect(() => {
		if (selectedDoc !== "") {
			selectedDoc.map(doc => {
				setITSaleGamingBannerUrl(doc.saleGamingBanner.it);
				setENSaleGamingBannerUrl(doc.saleGamingBanner.en);

				setITSaleGamingText(doc.saleGamingText.it);
				setENSaleGamingText(doc.saleGamingText.en);

				setITOurRoomsBannerUrl(doc.roomsBanner.it);
				setENOurRoomsBannerUrl(doc.roomsBanner.en);
			});
		}
	}, [docsFromHookCMS]);

	return (
		<div className='container'>
			<div className={classes.title}>{t("GameSalesPage.SaleGaming")}</div>
			<section className={classes.banner}>
				<div className={classes.banner__image}>
					<img src={appLanguage === "it" ? ITSaleGamingBannerUrl : ENSaleGamingBannerUrl} alt="" className="feed__img"/>
				</div>
				<div className={classes.banner__text}>
					{appLanguage === "it" ? ITSaleGamingText : ENSaleGamingText}
				</div>
			</section>

			<section className={classes.offer}>
				<div className={classes.offer__title}>{t("GameSalesPage.RoomsOffer")}</div>
				<div className={classes.offer__image}>
					<img src={appLanguage === "it" ? ITOurRoomsBannerUrl : ENOurRoomsBannerUrl} alt="" className="feed__img"/>
				</div>
			</section>

			<section className={classes.map}>
				<div className={classes.map__title}>{t("GameSalesPage.ComeVisit")}</div>
				<div className={classes.map__google}>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3030496.5865739477!2d10.122954446274512!3d42.11883499956605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2s!4v1629119430728!5m2!1sru!2s"
						style={{width:"100%", height:"100%", border:false}} allowFullScreen="" loading="lazy"> </iframe>
				</div>
			</section>

			<div className={classes.offer__title}>{t("GameSalesPage.JoinUs")}</div>
			<div className="contact__btn">
				<Link className="contact__btn-link" to="/ContactUsPage">
					{t("GameSalesPage.ContactsButton")}
				</Link>
			</div>
		</div>
	);
}

export default GameSalesPage;