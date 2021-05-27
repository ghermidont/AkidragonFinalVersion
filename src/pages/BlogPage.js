//https://firebase.google.com/docs/firestore/data-model
//https://firebase.google.com/docs/firestore/query-data/index-overview
//https://www.pluralsight.com/guides/how-to-implement-a-read-more-link-in-react
import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDataFromFirestore, useDataFromFirestoreCMS} from "../customHooks/useFirestore";
import logoSection from '../assets/images/dest/logo-section.png';
import {useLanguageContext} from "../context/LanguageContext";

export default function BlogPage() {
    console.log("ArticlesPage worked!");
    const {appLanguage} = useLanguageContext();
    const {docsFromHook} = useDataFromFirestore('articles');
    const {docsFromHookCMS} = useDataFromFirestoreCMS('web-app-cms');
    const [ENMainText, setENMainText] = useState("");
    const [ITMainText, setITMainText] = useState("");
    const [ENFooterText, setENFooterText] = useState("");
    const [ITFooterText, setITFooterText] = useState("");

    //Filter news by category:
    const moviesNews =  docsFromHook.filter(function(doc) {
        return doc.categories.includes("movies");
    });

    const musicNews =  docsFromHook.filter(function(doc) {
        return doc.categories.includes("music");
    });

    const videoGamesNews =  docsFromHook.filter(function(doc) {
        return doc.categories.includes("videogames");
    });

    let selectedDoc = "";

    useEffect(() => {
        console.log(docsFromHookCMS);
        if (docsFromHookCMS) {
            selectedDoc = docsFromHookCMS.filter(function (doc) {
                return doc.id === "blogPage";
            });
            console.log(selectedDoc);
        }
    });

    useEffect(() => {
        if (selectedDoc !== "") {
            selectedDoc.map(doc => {
                setENMainText(doc.mainText.en);
                setITMainText(doc.mainText.it);
                setENFooterText(doc.footerText.en);
                setITFooterText(doc.footerText.it);
            })
        }
    }, [docsFromHookCMS]);
    return(
        <>
            <section className="news-banner">
                <div className="container">
                    <div className="info__logo logo-section">
                        <img src={logoSection} alt="" className="info__img"/>
                    </div>
                    <h1 className="news-banner__title title"><span>News</span></h1>
                    <p className="news-banner__subtitle">{appLanguage==="it"?ITMainText:ENMainText}</p>

                    <div className="tab__body">
                        <ul className="nav nav-tabs tab__btn-list" id="myTab" role="tablist">
                            <li className="nav-item tab__btn-item" >
                                <a className="tab__btn active" id="all-tab" data-toggle="tab" href="#all" role="tab"
                                   aria-controls="all" aria-selected="true">All</a>
                            </li>

                            <li className="nav-item tab__btn-item">
                                <a className="tab__btn" id="videogames-tab" data-toggle="tab" href="#videogames" role="tab"
                                   aria-controls="videogames" aria-selected="false">Video games</a>
                            </li>

                            <li className="nav-item tab__btn-item">
                                <a className="tab__btn" id="movies-tab" data-toggle="tab" href="#movies" role="tab"
                                   aria-controls="movies" aria-selected="false">Movies</a>
                            </li>

                            <li className="nav-item tab__btn-item">
                                <a className="tab__btn" id="music-tab" data-toggle="tab" href="#music" role="tab"
                                   aria-controls="music" aria-selected="false">Music</a>
                            </li>
                        </ul>


                        <div className="tab-content" id="myTabContent">

                            <div className="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tab">
                                {docsFromHook && docsFromHook.slice(0, 8).map(doc=>
                                    <article className="article" key={doc.id}>
                                       <Link className="article__link">
                                            <img src={doc.content[appLanguage].image?doc.content[appLanguage].image:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"} alt="" className="article__image"/>
                                            <div className="article__content">
                                                <img className="article__logo" src={logoSection} alt=""/>
                                                <div className="article__box-text">
                                                    <p className="article__text">
                                                        {doc.content[appLanguage].title}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="article__footer">
                                                {/*<img src={doc.content.image?doc.content.image:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"} alt=""/>*/}
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
                                {videoGamesNews && videoGamesNews.slice(0, 8).map(doc=>
                                    <article className="article" key={doc.id}>
                                        <Link className="article__link">
                                            <img src={doc.content[appLanguage].image?doc.content[appLanguage].image:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"} alt="" className="article__image"/>
                                            <div className="article__content">
                                                <img className="article__logo" src={logoSection} alt=""/>
                                                <div className="article__box-text">
                                                    <p className="article__text">
                                                        {doc.content[appLanguage].title}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="article__footer">
                                                <img src={doc.content[appLanguage].image?doc.content[appLanguage].image:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"} alt=""/>
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
                                {moviesNews && moviesNews.slice(0, 8).map(doc=>
                                    <article className="article" key={doc.id}>
                                        <Link className="article__link">
                                            <img src={doc.content[appLanguage].image?doc.content[appLanguage].image:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"} alt="" className="article__image"/>
                                            <div className="article__content">
                                                <img className="article__logo" src={logoSection} alt=""/>
                                                <div className="article__box-text">
                                                    <p className="article__text">
                                                        {doc.content[appLanguage].title}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="article__footer">
                                                <img src={doc.content[appLanguage].image?doc.content[appLanguage].image:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"} alt=""/>
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
                                {musicNews && musicNews.slice(0, 8).map(doc=>
                                    <article className="article" key={doc.id}>
                                        <Link className="article__link">
                                            <img src={doc.content[appLanguage].image?doc.content[appLanguage].image:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"} alt="" className="article__image"/>
                                            <div className="article__content">
                                                <img className="article__logo" src={logoSection} alt=""/>
                                                <div className="article__box-text">
                                                    <p className="article__text">
                                                        {doc.content[appLanguage].title}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="article__footer">
                                                <img src={doc.content[appLanguage].image?doc.content[appLanguage].image:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"} alt=""/>
                                            </div>
                                        </Link>

                                    </article>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact">
                <div className="container">
                    <h2 className="contact__title">{appLanguage==="it"?ITFooterText:ENFooterText}</h2>
                    <div className="contact__btn">
                        <Link to="/ContacUsPage" className="contact__btn-link contact__btn-link--blog-page">
                           Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );

}


