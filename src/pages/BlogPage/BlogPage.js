import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDataFromFirestore, useDataFromFirestoreBanners, useDataFromFirestoreCMS} from "../../customHooks/useFirestore";
import logoSection from "../../assets/images/dest/logo-section.png";
import {useLanguageContext} from "../../context/LanguageContext";
import {useArticlesContext} from "../../context/ArticlesContext";
import {useTranslation} from "react-i18next";
import HtmlToReact from "html-to-react";
//Components import.
import BlogSearchBar from "./ArticlesSearchBar/BlogSearchBar";

export default function BlogPage() {
	const {t} = useTranslation();
	//Context variables.
	const {setChosenArticleNumber} = useArticlesContext();
	const {appLanguage} = useLanguageContext();
	//Hooks
	const {docsFromHook} = useDataFromFirestore("articles");
	const {docsFromHookCMS} = useDataFromFirestoreCMS("web-app-cms");
	const {docsFromHookBanners} = useDataFromFirestoreBanners("banners");
	//States
	const [ENMainText, setENMainText] = useState("");
	const [ITMainText, setITMainText] = useState("");
	const [ENFooterText, setENFooterText] = useState("");
	const [ITFooterText, setITFooterText] = useState("");
	const [_250x250320x100320x50,  set250x250320x100320x50] = useState("");
	const [Top, setTop] = useState("");
	const [bottom, setBottom] = useState("");

	//Stores the blog page banners from the database.
	let selectedBanners = "";

	useEffect(() => {
		if (docsFromHookBanners) {
			selectedBanners = docsFromHookBanners.filter(function (doc) {
				return doc.id === "blogPage";
			});
		}
	});

	//Filter approved articles
	let articlesArr;

	if (docsFromHook) {
		articlesArr = docsFromHook.filter(function (article) {
			return article.approved === true;
		});
	}

	//Filter articles by category:
	const moviesNews = articlesArr.filter(function (doc) {
		return doc.categories.includes("movies");
	});

	const musicNews = articlesArr.filter(function (doc) {
		return doc.categories.includes("music");
	});

	const videoGamesNews = articlesArr.filter(function (doc) {
		return doc.categories.includes("videogames");
	});

	//Stores the CMS info for the page.
	let selectedDoc = "";

	useEffect(() => {
		if (docsFromHookCMS) {
			selectedDoc = docsFromHookCMS.filter(function (doc) {
				return doc.id === "blogPage";
			});
		}
	});

	//Setting the states.
	useEffect(() => {
		if (selectedDoc !== "") {
			selectedDoc.map(doc => {
				setENMainText(doc.mainText.en);
				setITMainText(doc.mainText.it);
				setENFooterText(doc.footerText.en);
				setITFooterText(doc.footerText.it);
			});
		}

		if (selectedBanners !== ""){
			selectedBanners.map(doc => {
				set250x250320x100320x50(doc.desktop._250x250320x100320x50);
				setTop(doc.mobile.top);
				setBottom(doc.mobile.bottom);
			});
		}
	}, [docsFromHookCMS, docsFromHookBanners]);

	// Database string tags parser. Is needed to render the banners stored in the database.
	const stringTagsParser = (tag) => {
		if(tag) {
			let  htmlToReactParser = new HtmlToReact.Parser(React);
			return htmlToReactParser.parse(tag);
		}
	};

	return (
		<>
			<section className="news-banner">
				<div className="container">
					<div className="info__logo logo-section">
						<img src={logoSection} alt="" className="info__img"/>
					</div>
					<h1 className="news-banner__title title"><span>{t("BlogPage.NewsTitle")}</span></h1>
					<p className="news-banner__subtitle">{appLanguage === "it" ? ITMainText : ENMainText}</p>
					<div className='news-banner__search'>
						<BlogSearchBar />
					</div>
				
					<div className="banner banner__square">
						{stringTagsParser(Top)}
					</div>

					<div className="banner banner__square">
						{stringTagsParser(_250x250320x100320x50)}
					</div>

					<div className="tab__body">
						<ul className="nav nav-tabs tab__btn-list tab__news" id="myTab" role="tablist">
							<li className="nav-item tab__btn-item">
								<a className="tab__btn-news active" id="all-tab" data-toggle="tab" href="#all" role="tab"
									aria-controls="all" aria-selected="true">{t("BlogPage.All")}</a>
							</li>

							<li className="nav-item tab__btn-item">
								<a className="tab__btn-news" id="videogames-tab" data-toggle="tab" href="#videogames" role="tab"
									aria-controls="videogames" aria-selected="false">{t("BlogPage.VideoGames")}</a>
							</li>

							<li className="nav-item tab__btn-item">
								<a className="tab__btn-news" id="movies-tab" data-toggle="tab" href="#movies" role="tab"
									aria-controls="movies" aria-selected="false">{t("BlogPage.Movies")}</a>
							</li>

							<li className="nav-item tab__btn-item">
								<a className="tab__btn-news" id="music-tab" data-toggle="tab" href="#music" role="tab"
									aria-controls="music" aria-selected="false">{t("BlogPage.Music")}</a>
							</li>
						</ul>

						<div className="tab-content tab-content--blog" id="myTabContent">
							<div className="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tab">
								{/*Mapping the latest articles with no category filter.*/}
								{articlesArr && articlesArr.slice(0, 8).map(doc =>
									<article className="article" key={doc.id}>
										<Link className="article__link" to={`/article/${doc.id}`} onClick={() => setChosenArticleNumber(doc.id)}>
											<img
												src={doc.content[appLanguage].image ? doc.content[appLanguage].image : "https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"}
												alt="" className="article__image"/>
											<div className="article__content">
												<img className="article__logo" src={logoSection} alt=""/>
												<div className="article__box-text">
													<p className="article__text">
														{doc.content[appLanguage].title}
													</p>
												</div>
											</div>
										</Link>
									</article>
								)}

							</div>

							<div
								className="tab-pane fade"
								id="videogames"
								role="tabpanel"
								aria-labelledby="videogames-tab"
							>
								{/*Mapping the articles filtered by "videogames" category.*/}
								{videoGamesNews && videoGamesNews.slice(0, 8).map(doc =>
									<article className="article" key={doc.id}>
										<Link className="article__link" to={`/article/${doc.id}`} onClick={() => setChosenArticleNumber(doc.id)}>
											<img
												src={doc.content[appLanguage].image ? doc.content[appLanguage].image : "https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"}
												alt="" className="article__image"/>
											<div className="article__content">
												<img className="article__logo" src={logoSection} alt=""/>
												<div className="article__box-text">
													<p className="article__text">
														{doc.content[appLanguage].title}
													</p>
												</div>
											</div>
										</Link>

									</article>
								)}
							</div>

							<div
								className="tab-pane fade"
								id="movies"
								role="tabpanel"
								aria-labelledby="movies-tab"
							>
								{/*Mapping the articles filtered by "movies" category.*/}
								{moviesNews && moviesNews.slice(0, 8).map(doc =>
									<article className="article" key={doc.id}>
										<Link className="article__link" to={`/article/${doc.id}`} onClick={() => setChosenArticleNumber(doc.id)}>
											<img
												src={doc.content[appLanguage].image ? doc.content[appLanguage].image : "https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"}
												alt="" className="article__image"/>
											<div className="article__content">
												<img className="article__logo" src={logoSection} alt=""/>
												<div className="article__box-text">
													<p className="article__text">
														{doc.content[appLanguage].title}
													</p>
												</div>
											</div>
										</Link>
									</article>
								)}
							</div>

							<div
								className="tab-pane fade"
								id="music"
								role="tabpanel"
								aria-labelledby="music-tab"
							>
								{/*Mapping the articles filtered by "music" category.*/}
								{musicNews && musicNews.slice(0, 8).map(doc =>
									<article className="article" key={doc.id}>
										<Link className="article__link" to={`/article/${doc.id}`} onClick={() => setChosenArticleNumber(doc.id)}>
											<img
												src={doc.content[appLanguage].image ? doc.content[appLanguage].image : "https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"}
												alt="" className="article__image"/>
											<div className="article__content">
												<img className="article__logo" src={logoSection} alt=""/>
												<div className="article__box-text">
													<p className="article__text">
														{doc.content[appLanguage].title}
													</p>
												</div>
											</div>
										</Link>
									</article>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>

			<div className="banner banner__square">{stringTagsParser(bottom)}</div>

			<section className="contact">
				<div className="container">
					<h2 className="contact__title">{appLanguage === "it" ? ITFooterText : ENFooterText}</h2>
					<div className="contact__btn">
						<Link to="/ContactUsPage" className="contact__btn-link contact__btn-link--blog-page">
							{t("BlogPage.ContactsButton")}
						</Link>
					</div>
				</div>
			</section>
		</>
	);

}
