import React, {useEffect, useState} from "react";
import {
	useDataFromFirestore,
	useDataFromFirestoreBanners
} from "../customHooks/useFirestore";
import {Link} from "react-router-dom";
import {useLanguageContext} from "../context/LanguageContext";
import { ShareLink } from "social-media-sharing";
import logoSection from "../assets/images/dest/logo-section.png";
import HtmlToReact from "html-to-react";
import ShortArticlesList from "../components/ShortArticlesList";
import date from "date-and-time";

// eslint-disable-next-line no-undef
const queryString = require("query-string");

export default function Article() {
	const {docsFromHook} = useDataFromFirestore("articles");
	const {appLanguage} = useLanguageContext();
	const parsedWindowLocation = queryString.parse(window.location.hash);
	const stringifiedSlug = queryString.stringify(parsedWindowLocation).substr(13);

	const [vertical, setVertical] = useState("");
	const [_250x250320x100320x50,  set250x250320x100320x50] = useState("");
	const [Top, setTop] = useState("");
	const [bottom, setBottom] = useState("");

	const {docsFromHookBanners} = useDataFromFirestoreBanners("banners");

	let selectedBanners = "";

	useEffect(() => {
		if (docsFromHookBanners) {
			selectedBanners = docsFromHookBanners.filter(function (doc) {
				return doc.id === "individualArticlePage";
			});
		}
	});

	useEffect(() => {
		if (selectedBanners !== ""){
			selectedBanners.map(doc => {
				setVertical(doc.desktop.vertical);
				set250x250320x100320x50(doc.desktop._250x250320x100320x50);
				setTop(doc.mobile.top);
				setBottom(doc.mobile.bottom);
			});
		}
	}, [docsFromHookBanners]);

	const shareFacebook = () => {
		let socialMediaLinks = new ShareLink("facebook");
		socialMediaLinks.get({u: `http://mydomainfortesting.ml/#/article/${stringifiedSlug}`});
		socialMediaLinks.open();
	};

	let selectedArticle = "";
	let authorID = "";

	if(docsFromHook) {
		//Filter the articles object and select the article who's slug corresponds to the current window slug
		selectedArticle = docsFromHook.filter(function (article) {
			return article.id === stringifiedSlug;
		});
		console.log(selectedArticle);

		if(selectedArticle){selectedArticle.map(doc =>authorID=doc.authorId);}
	}

	// DB string tags parser
	const stringTagsParser = (tag) => {
		if(tag) {
			let  htmlInput = tag;
			let  htmlToReactParser = new HtmlToReact.Parser(React);
			return htmlToReactParser.parse(htmlInput);
		}
	};

	const dateConverter = (DATE, format) => {
		if(format==="extended") {
			let date = new Date(DATE);
			return date.toString();
		} else {
			let now = new Date(DATE);
			return date.format(now, "ddd, MMM DD YYYY");
		}
	};

	//TODO Get and display the name of the author.

	return(
		<section className="new-article">
			<div className="banner__commercial banner__commercial--left">{stringTagsParser(vertical)}</div>
			<div className="banner__commercial banner__commercial--right">{stringTagsParser(vertical)}</div>
			
			<div className="container">
				{selectedArticle && selectedArticle.map(doc =>(
					<div key={doc.id}>
						<div>
							<div>Category: <ul>{doc.categories.map(category=><li key={doc.id+Date.now}>{category}</li>)}</ul></div>
							<div>Author: {authorID}</div>
							<div>Date: {dateConverter(doc.createdAt)}</div>
						</div>
						<div className="new-article__title-box">
							<img src={logoSection} alt="" className="new-article__logo"/>
							<h1 className="new-article__title title">
                            Title: {doc.content[appLanguage].title}
							</h1>
						</div>

						<div className="new-article__inner">
							<div className="new-article__btn-bg">
								<Link to="/BlogPage">
									<button className="new-article__btn-back">Back <span>news</span></button>
								</Link>
							</div>
						</div>

						<div className="new-article__image">
							<img
								src={doc.content[appLanguage].image?doc.content[appLanguage].image:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"}
								className="articles-page__img"
								alt=""
							/>
						</div>

						<p className="new-article__text">
							<div className="banner banner__square banner__square--article">{stringTagsParser(_250x250320x100320x50)}</div>
							<p className="new-article__text">
                            Content: {doc.content[appLanguage].text}
							</p>
						</p>
						
						<div className="banner banner__square banner__square--article">{stringTagsParser(Top)}</div>

						<div className="btn-upload">
							<span className="icon-facebook2" onClick={()=>shareFacebook()}> Share</span>
						</div>

						<div className="news__inner">
							<ShortArticlesList/>
						</div>

						<center>
							<div>
								<br/>
								<Link to = "/BlogPage">
									<button className="new--article__btn btn"><span>Other</span>news</button>
								</Link>
							</div>
						</center>
						<div className="banner banner__square banner__square--article">{stringTagsParser(bottom)}</div>
					</div>	
				)
				)}
			</div>
		</section>
	);
}