import React, {useEffect, useState} from "react";
import HtmlToReact from "html-to-react";
import {Link} from "react-router-dom";
//Components import.
import ShortArticlesList from "../../components/ShortArticlesList";
import LatestStreamsSwiper from "../../components/swipers/LatestStreamsSwiper";
//Context import.
import {useLanguageContext} from "../../context/LanguageContext";
import logoSection from "../../assets/images/dest/logo-section.png";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {useDataFromFirestoreBanners, useDataFromFirestoreCMS} from "../../customHooks/useFirestore";
import {useTranslation} from "react-i18next";

export default function HomePage() {
	//Translation.
	const {t} = useTranslation();
	const {appLanguage} = useLanguageContext();
	//Getting the data from the database.
	const {docsFromHookCMS} = useDataFromFirestoreCMS("web-app-cms");

	//Url states.
	const [ENBannerUrl, setENBannerUrl] = useState("");
	const [ENContactsBannerUrl, setENContactsBannerUrl] = useState("");
	const [ENGameTeamsBannerUrl, setENGameTeamsBannerUrl] = useState("");
	const [ENSalesBannerUrl, setENSalesBannerUrl] = useState("");
	const [ENSponsorshipBannerUrl, setENSponsorshipBannerUrl] = useState("");
	const [ENTournamentsBannerUrl, setENTournamentsBannerUrl] = useState("");
	const [ITBannerUrl, setITBannerUrl] = useState("");
	const [ITContactsBannerUrl, setITContactsBannerUrl] = useState("");
	const [ITGameTeamsBannerUrl, setITGameTeamsBannerUrl] = useState("");
	const [ITSalesBannerUrl, setITSalesBannerUrl] = useState("");
	const [ITSponsorshipBannerUrl, setITSponsorshipBannerUrl] = useState("");
	const [ITTournamentsBannerUrl, setITTournamentsBannerUrl] = useState("");
	//Text states.
	const [ENBannerText, setENBannerText] = useState("");
	const [ITBannerText, setITBannerText] = useState("");
	//Banners states.
	const [vertical, setVertical] = useState();
	const [top, setTop] = useState("");
	const [middle, setMiddle] = useState("");
	const [bottom, setBottom] = useState("");

	const {docsFromHookBanners} = useDataFromFirestoreBanners("banners");

	let selectedBanners = "";
	//Filter the banners received from the database.
	useEffect(() => {
		if (docsFromHookBanners) {
			selectedBanners = docsFromHookBanners.filter(function (doc) {
				return doc.id === "homePage";
			});
		}
	});

	let selectedDoc = "";
	// Filter the homepage specific data from the database.
	useEffect(() => {
		if (docsFromHookCMS) {
			selectedDoc = docsFromHookCMS.filter(function (doc) {
				return doc.id === "homePage";
			});
		}
	});

	//Updating the states values after getting data from the data base regarding the CMS and banners.
	useEffect(() => {
		if (selectedBanners !== ""){
			selectedBanners.map(doc => {
				setVertical(doc.desktop.vertical);
				setTop(doc.mobile.top);
				setMiddle(doc.mobile.middle);
				setBottom(doc.mobile.bottom);
			});
		}

		if (selectedDoc !== "") {
			selectedDoc.map(doc => {
				setENBannerUrl(doc.banner.en);
				setENContactsBannerUrl(doc.contactsBanner.en);
				setENGameTeamsBannerUrl(doc.gameTeamsBanner.en);
				setENSalesBannerUrl(doc.salesBanner.en);
				setENSponsorshipBannerUrl(doc.sponsorship.en);
				setENTournamentsBannerUrl(doc.tournamentsBanner.en);
				setITBannerUrl(doc.banner.it);
				setITContactsBannerUrl(doc.contactsBanner.it);
				setITGameTeamsBannerUrl(doc.gameTeamsBanner.it);
				setITSalesBannerUrl(doc.salesBanner.it);
				setITSponsorshipBannerUrl(doc.sponsorship.it);
				setITTournamentsBannerUrl(doc.tournamentsBanner.it);
				setENBannerText(doc.bannerText.en);
				setITBannerText(doc.bannerText.it);
			});
		}
	}, [docsFromHookCMS, docsFromHookBanners]);

	// Data base string tags parser. Is used for displaying the banners links from the database.
	const stringTagsParser = (tag) => {
		if(tag) {
			let  htmlInput = tag;
			let  htmlToReactParser = new HtmlToReact.Parser(React);
			return htmlToReactParser.parse(htmlInput);
		}
		return;
	};

	return (
		<>
			<main className="page">
				<div className="banner__commercial banner__commercial--left">{stringTagsParser(vertical)}</div>
				<div className="banner__commercial banner__commercial--right">{stringTagsParser(vertical)}</div>

				<section className="banner">
					<div className="container">
						<div className="banner__image">
							<img className="banner__img" src={appLanguage === "it" ? ITBannerUrl : ENBannerUrl}
								alt="Akidrago banner"/>
						</div>
					</div>
				</section>

				<div className="container banner__container">
					<div className="banner banner__square">{stringTagsParser(top)} </div>
				</div>

				<section className="info">
					<div className="container">
						<h2 className="title info__title">
							{appLanguage === "it" ? ITBannerText : ENBannerText}
						</h2>
						<ul className="info__list">
							<li className="info__item">
								<Link to="/TournamentsPage" className="info__link">
									<div className="info__image">
										<img className="info__img"
											src={appLanguage === "it" ? ITTournamentsBannerUrl : ENTournamentsBannerUrl}
											alt=""/>
									</div>
									<h3 className="info__item-title">{t("HomePage.Card1")}</h3>
								</Link>
							</li>
							<li className="info__item">
								<Link to="/AboutUsPage" className="info__link">
									<div className="info__image">
										<img className="info__img"
											src={appLanguage === "it" ? ITGameTeamsBannerUrl : ENGameTeamsBannerUrl}
											alt=""/>
									</div>
									<h3 className="info__item-title">{t("HomePage.Card2")}</h3>
								</Link>
							</li>
							<li className="info__item">
								<Link to="/" className="info__link">
									<div className="info__image">
										<img className="info__img"
											src={appLanguage === "it" ? ITSalesBannerUrl : ENSalesBannerUrl}//"https://en.parisinfo.com/var/otcp/sites/images/node_43/node_51/joueurs-d'esport-%7C-630x405-%7C-%C2%A9-dr/19307954-1-fre-FR/Joueurs-d'Esport-%7C-630x405-%7C-%C2%A9-DR.jpg"
											alt=""/>
									</div>
									<h3 className="info__item-title">{t("HomePage.Card3")}</h3>
								</Link>
							</li>
						</ul>
					</div>
				</section>

				<section className="news">
					<div className="container">
						<div className="info__logo logo-section">
							<img src={logoSection} alt="" className="info__img"/>
						</div>
						<h2 className="news__title title">
							{t("HomePage.LatestArticlesTitle")}
						</h2>

						<div className="banner banner__square">{stringTagsParser(middle)}</div>


						<div className="news__inner">
							<ShortArticlesList/>
						</div>
						<Link className='btn-more' to="/BlogPage">
							<button className="news__btn btn">{t("HomePage.OtherArticlesButton")}</button>
						</Link>
					</div>
				</section>

				<section className="slider">
					<div className="container">
						<h2 className="slider__title title">
							{t("HomePage.LatestStreamsTitle")}
						</h2>

						<LatestStreamsSwiper/>

						<Link className='btn-more btn-more__home-slider' to="/ContentPage">
							<button className="slider__btn btn">{t("HomePage.OtherVideosButton")}</button>
						</Link>
					</div>
				</section>

				<section className="feed">
					<div className="container">
						<div className="feed__inner">
							<div className="feed__item">
								<div className="feed__image">
									<img src={appLanguage === "it" ? ITSponsorshipBannerUrl : ENSponsorshipBannerUrl} alt=""
										className="feed__img"/>
								</div>
								<Link className="feed__link" to="/SponsorshipPage">
									{t("HomePage.SponsorshipBanner")}
								</Link>
							</div>
							<div className="feed__item">
								<div className="feed__image">
									<img src={appLanguage === "it" ? ITContactsBannerUrl : ENContactsBannerUrl} alt=""
										className="feed__img"/>
								</div>
								<Link className="feed__link" to="/ContactUsPage">
									{t("HomePage.ContactsBanner")}
								</Link>
							</div>
						</div>
					</div>
				</section>

				<div className="banner banner__square">{stringTagsParser(bottom)}</div>

				<div className="contact__btn">
					<Link className="contact__btn-link" to="/ContactUsPage">
						{t("HomePage.ContactsButton")}
					</Link>
				</div>
			</main>
		</>
	);
}