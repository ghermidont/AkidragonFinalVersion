import React, {useEffect, useState} from "react";
import { useDataFromFirestoreCMS } from "../../customHooks/useFirestore";
import {useLanguageContext} from "../../context/LanguageContext";
//import classes from "./IndividualGameTeamPage.module.scss";
// eslint-disable-next-line no-undef
const queryString = require("query-string");

export default function IndividualGameTeamPage() {
	const {docsFromHookCMS} = useDataFromFirestoreCMS("web-app-cms");
	const {appLanguage} = useLanguageContext();
	const parsedWindowLocation = queryString.parse(window.location.hash);
	const stringifiedSlug = queryString.stringify(parsedWindowLocation).substr(10);

	const[ENPageTitle, setENPageTitle] = useState("");
	const[ITPageTitle, setITPageTitle] = useState("");

	const[ENPageText, setENPageText] = useState("");
	const[ITPageText, setITPageText] = useState("");

	const[ENTopBanner, setENTopBanner] = useState("");
	const[ITTopBanner, setITTopBanner] = useState("");

	const[teams, setTeams] = useState([]);
	const[info, setInfo] = useState({
		avatar: {
			en: "",
			it: ""
		},
		teamTopTitle: {
			en: "",
			it: ""
		},
		teamTopText: {
			en: "",
			it: ""
		},
		lowTitle: {
			en: "",
			it: ""
		},
		lowText: {
			en: "",
			it: ""
		},
		social: {
			facebook: "",
			instagram: "",
			youtube: "",
			twitch: ""
		}
	});

	let selectedDoc = "";

	useEffect(() => {
		if (docsFromHookCMS !== []) {
			console.log("docsFromHookCMS", docsFromHookCMS);
			selectedDoc = docsFromHookCMS.filter(function (doc) {
				return doc.id === "game-teams";
			});
		}

		if (selectedDoc !== "") {
			selectedDoc.map(doc => {
				setENPageTitle(doc.title.en);
				setITPageTitle(doc.title.it);

				setENPageText(doc.text.en);
				setITPageText(doc.text.it);

				setENTopBanner(doc.topBanner.en);
				setITTopBanner(doc.topBanner.it);

				setTeams(doc.gameTeams.filter(t=>t.slug===stringifiedSlug));

			});
		}
	}, [docsFromHookCMS]);

	useEffect(() => {
		teams.map(t=>
			setInfo({
				avatar: {
					en: t.avatar.en,
					it: t.avatar.it
				},
				teamTopTitle: {
					en: t.teamTopTitle.en,
					it: t.teamTopTitle.it
				},
				teamTopText: {
					en: t.teamTopText.en,
					it: t.teamTopText.it
				},
				lowTitle: {
					en: t.lowTitle.en,
					it: t.lowTitle.it
				},
				lowText: {
					en: t.lowText.en,
					it: t.lowText.it
				},
				social: {
					facebook: t.social.facebook,
					instagram: t.social.instagram,
					youtube: t.social.youtube,
					twitch: t.social.twitch
				}
			})
		);
	}, [teams]);

	return(
		<section className="new-article">
			<div className="container">				
				<div>{appLanguage === "it" ? ITPageTitle : ENPageTitle}</div>
				<div>{appLanguage === "it" ? ITPageText : ENPageText}</div>
				<div>
					<img
						src={appLanguage === "it" ? ITTopBanner : ENTopBanner}
						alt="avatar"
						className="articles-page__img"
					/>
				</div>

				<div>Team info section</div>

				<div>
					<img
						src={appLanguage === "it" ? info.avatar.it : info.avatar.en}
						alt="avatar"
						className="articles-page__img"
					/>
				</div>
				<div>{appLanguage === "it" ? info.teamTopTitle.it : info.teamTopTitle.en}</div>
				<div>{appLanguage === "it" ? info.teamTopText.it : info.teamTopText.en}</div>
				<div>{appLanguage === "it" ? info.lowTitle.it : info.lowTitle.en}</div>
				<div>{appLanguage === "it" ? info.lowText.it : info.lowText.en}</div>

				<div>Channels:</div>

				<ul>
					<li className="social__item">
						<a href={info.social.facebook} className="social__link">
							<span className="icon-facebook2"> </span>
						</a>
					</li>
					<li className="social__item">
						<a href={info.social.instagram} className="social__link">
							<span className="icon-instagram"> </span>
						</a>
					</li>
					<li className="social__item">
						<a href={info.social.youtube} className="social__link">
							<span className="icon-youtube"> </span>
						</a>
					</li>
					<li className="social__item">
						<a href={info.social.twitch} className="social__link">
							<span className="icon-twitch"> </span>
						</a>
					</li>
				</ul>
			</div>					
		</section>
	);
}