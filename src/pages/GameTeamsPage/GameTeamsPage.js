/* eslint-disable no-mixed-spaces-and-tabs */
import React, {useEffect, useState} from "react";
import {useDataFromFirestoreCMS} from "../../customHooks/useFirestore";
import {Link} from "react-router-dom";
import {useTeamsContext} from "../../context/TeamsContext";
import {useLanguageContext} from "../../context/LanguageContext";
import {useTranslation} from "react-i18next";
//Styles
import classes from "./GameTeamsPage.module.scss";

export default function GameTeamsPage() {
	const {t} = useTranslation();

	const {appLanguage} = useLanguageContext();
	//States.
	const [ITGamingTeamBannerUrl, setITGamingTeamBannerUrl] = useState("");
	const [ENGamingTeamBannerUrl, setENGamingTeamBannerUrl] = useState("");

	const [ITGamingTeamTitle, setITGamingTeamTitle] = useState("");
	const [ENGamingTeamTitle, setENGamingTeamTitle] = useState("");

	const [ITGamingTeamText, setITGamingTeamText] = useState("");
	const [ENGamingTeamText, setENGamingTeamText] = useState("");

	const [gameTeamMembersArr, setGameTeamMembersArr] = useState([]);

	//Context.
	const {setChosenTeamNumber} = useTeamsContext();

	//Getting data from the database.
	const {docsFromHookCMS} = useDataFromFirestoreCMS("web-app-cms");

   	let teamsArr = [];
	let selectedDoc = "";

	//Filtering the database data.
	useEffect(() => {
		if (docsFromHookCMS) {
			selectedDoc = docsFromHookCMS.filter(function (doc) {
				return doc.id === "game-teams";
			});
		}
	});

	//Updating the states on each database data call.
	useEffect(() => {
		if (selectedDoc !== "") {
			selectedDoc.map(doc => {
				doc.gameTeams.map(member => teamsArr.push({...member}));
				setGameTeamMembersArr(teamsArr);
				//Top Banner
				setITGamingTeamBannerUrl(doc.topBanner.it);
				setENGamingTeamBannerUrl(doc.topBanner.en);
				//Top Title
				setITGamingTeamTitle(doc.title.it);
				setENGamingTeamTitle(doc.title.en);
				//Top Text
				setITGamingTeamText(doc.text.it);
				setENGamingTeamText(doc.text.en);
			});
		}
	}, [docsFromHookCMS]);

	return (
		<>
			<div className='container'>
				<div className={classes.title}>
					{appLanguage === "it" ? ITGamingTeamTitle : ENGamingTeamTitle}
				</div>
				<div className={classes.banner}>
					<div className={classes.banner__image}>
						<img src={appLanguage === "it" ? ITGamingTeamBannerUrl : ENGamingTeamBannerUrl} alt="" className="feed__img"/>
					</div>
					<div className={classes.banner__text}>
						{appLanguage === "it" ? ITGamingTeamText : ENGamingTeamText}
					</div>
				</div>

				<div>
					<div className={classes.inner}>
						{gameTeamMembersArr && gameTeamMembersArr.map(team => (
							<article className="article" key={team.slug}>
								<img
									src={team.avatar[appLanguage] ? team.avatar[appLanguage] : "https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"}
									alt="" className="article__image"/>


								<ul className={classes.list}>
									<li className="social__item">
										<a href={team.social.facebook} className="social__link">
											<span className="icon-facebook2"> </span>
										</a>
									</li>
									<li className="social__item">
										<a href={team.social.instagram} className="social__link">
											<span className="icon-instagram"> </span>
										</a>
									</li>
									<li className="social__item">
										<a href={team.social.youtube} className="social__link">
											<span className="icon-youtube"> </span>
										</a>
									</li>
									<li className="social__item">
										<a href={team.social.twitch} className="social__link">
											<span className="icon-twitch"> </span>
										</a>
									</li>
								</ul>

								<Link to={`/team/${team.slug}`} className={classes.article__title} onClick={() => setChosenTeamNumber(team.slug)}>{team.teamTopTitle[appLanguage]}</Link>
							</article>
						))}
					</div>

					<div className={classes.offerText}>{t("GameTeamsPage.JoinUs")}</div>
					<div className="contact__btn">
						<Link className="contact__btn-link" to="/ContactUsPage">
							{t("GameTeamsPage.ContactsButton")}
						</Link>
					</div>
				</div>

			</div>
		</>
	);
}