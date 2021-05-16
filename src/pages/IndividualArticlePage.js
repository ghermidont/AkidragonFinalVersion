import React from 'react';
import {useArticlesContext} from "../context/ArticlesContext";
import {useDataFromFirestore} from "../customHooks/useFirestore";
import {Link} from "react-router-dom";
import {useLanguageContext} from "../context/LanguageContext";
const queryString = require('query-string');

export default function Article() {
    console.log("Individual article component worked!");
    const {docsFromHook} = useDataFromFirestore('articles');
    const {appLanguage} = useLanguageContext();
    let parsedWindowLocation = queryString.parse(window.location.hash);
    const stringifiedSlug = queryString.stringify(parsedWindowLocation).substr(13);

    console.log("This is the stringified:");
    console.log(stringifiedSlug);

    let selectedArticle = "";

    if(docsFromHook) {
        console.log("second option worked");
        //Filter the articles object and select the article who's slug corresponds to the current window slug
        selectedArticle = docsFromHook.filter(function (article) {
            return article.id === stringifiedSlug;
        });
    }

    return(
        <section className="new-article">
            <div className="container">
                {selectedArticle && selectedArticle.map(
                    doc =>(
                        <>
                        <div className="new-article__inner">
                            <div className="new-article__btn-bg">
                                <Link to="/BlogPage">
                                    <button className="new-article__btn-back">Back <span>news</span></button>
                                </Link>
                            </div>

                        </div>
                        <div className="new-article__image">
                            <img style={{
                                maxWidth: '25%',
                                height: 'auto'
                            }}
                                 src={doc.content.image?doc.content.image:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"}
                                 className="articles-page__img"
                                 alt=""
                            />
                        </div>
                            <h1 className="new-article__title title">
                                Title: {doc.content[appLanguage].title}
                            </h1>
                        <p className="new-article__text">
                            Content: {doc.content[appLanguage].text}
                        </p>
                        <div className="new-article__info">
                        <br/>
                            <date className="new-article__date">Created at: </date>
                        </div>
                        <div>
                            <br/>
                            <Link to = "/BlogPage">
                                <button className="new--article__btn btn"><span>Other</span> news</button>
                            </Link>
                        </div>
                    </>
                    )
                )}
            </div>
        </section>
    );
}