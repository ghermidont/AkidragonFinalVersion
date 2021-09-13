/**  This component is used in the homepage, user profile page and individual article page. */
/* eslint-disable no-mixed-spaces-and-tabs */
import React from "react";
import {useDataFromFirestore} from "../customHooks/useFirestore";
import {Link} from "react-router-dom";
//Contexts import.
import {useArticlesContext} from "../context/ArticlesContext";
import {useLanguageContext} from "../context/LanguageContext";
//Logo
import logo from "../assets/images/src/DragonLogo.png";

export default function ShortArticlesList() {
	//App language variable.
	const {appLanguage} = useLanguageContext();
	//Context.
	const {setChosenArticleNumber} = useArticlesContext();
	// Get articles from the database.
	const {docsFromHook} = useDataFromFirestore("articles");

	//The array contain the filtered articles.
	let articlesArr;

	if (docsFromHook) {
		articlesArr = docsFromHook.filter(function (article) {
			return article.approved === true;
		});
	}

	//'slice' is used to get only the 4 latest articles.
	return (
		<>
			{articlesArr && articlesArr.slice(0, 4).map(doc => (
				<article className="article" key={doc.id}>
					<Link to={`/article/${doc.id}`} className="article__link"
						  onClick={() => setChosenArticleNumber(doc.id)}>
						<img
							src={doc.content[appLanguage].image ? doc.content[appLanguage].image : "https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"}
							alt="" className="article__image"/>
						<div className="article__content">
							<img className="article__logo" src={logo} alt="logo"/>
							<div className="article__box-text">
								<p className="article__text">
									{doc.content[appLanguage].description}
								</p>
							</div>
						</div>
					</Link>
				</article>
			))}
		</>
	);
}