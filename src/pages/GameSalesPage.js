//TODO make this page
import React, {useEffect, useState} from "react";
import {useDataFromFirestoreCMS} from "../customHooks/useFirestore";
import {useLanguageContext} from "../context/LanguageContext";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

function GameSalesPage() {
	const {t} = useTranslation();
	const {appLanguage} = useLanguageContext();
	const {docsFromHookCMS} = useDataFromFirestoreCMS("web-app-cms");

	const [ITSaleGamingBannerUrl ,setITSaleGamingBannerUrl] = useState("");
	const [ENSaleGamingBannerUrl ,setENSaleGamingBannerUrl] = useState("");
	const [ITSaleGamingText ,setITSaleGamingText] = useState("");
	const [ENSaleGamingText ,setENSaleGamingText] = useState("");
	const [ITOurRoomsBannerUrl ,setITOurRoomsBannerUrl] = useState("");
	const [ENOurRoomsBannerUrl ,setENOurRoomsBannerUrl] = useState("");

	let selectedDoc = "";

	useEffect(() => {
		if (docsFromHookCMS) {
			selectedDoc = docsFromHookCMS.filter(function (doc) {
				return doc.id === "gameSalesPage";
			});
		}
	});

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
		<div>
			<div>
				<div>{t("GameSalesPage.SaleGaming")}</div>
				<div>
					<img src={appLanguage === "it" ? ITSaleGamingBannerUrl : ENSaleGamingBannerUrl} alt="" className="feed__img"/>
					{appLanguage === "it" ? ITSaleGamingText : ENSaleGamingText}
				</div>
			</div>

			<div>
				<div>{t("GameSalesPage.RoomsOffer")}</div>
				<div>
					<img src={appLanguage === "it" ? ITOurRoomsBannerUrl : ENOurRoomsBannerUrl} alt="" className="feed__img"/>
				</div>
			</div>

			<div>
				<div>{t("GameSalesPage.ComeVisit")}</div>
				<div>MAP</div>
			</div>

			<div>{t("GameSalesPage.JoinUs")}</div>
			<div className="contact__btn">
				<Link className="contact__btn-link" to="/ContactUsPage">
					{t("GameSalesPage.ContactsButton")}
				</Link>
			</div>
		</div>
	);
}

export default GameSalesPage;