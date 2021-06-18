import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDataFromFirestore, useDataFromFirestoreCMS} from "../customHooks/useFirestore";
import logoSection from '../assets/images/dest/logo-section.png';
import vsIcon from '../assets/images/dest/icons/vsIcon.png';
import {useLanguageContext} from "../context/LanguageContext";
import {useTranslation} from "react-i18next";

function TournamentsPage() {
  console.log("TournamentsPage() worked");
  const {t} = useTranslation();
  const [passedEvents, setPassedEvents] = useState();
  const [futureEvents, setFutureEvents] = useState();
  const {docsFromHookCMS} = useDataFromFirestoreCMS('web-app-cms');
  const {docsFromHook} = useDataFromFirestore('tournaments');
  const [ENBannerUrl,setENBannerUrl] = useState("");
  const [ITBannerUrl, setITBannerUrl] = useState("");
  const [ENBannerText, setENBannerText] = useState("");
  const [ITBannerText, setITBannerText] = useState("");
  const [ENFooterMessage, setENFooterMessage] = useState("");
  const [ITFooterMessage, setITFooterMessage] = useState("");
  const {appLanguage} = useLanguageContext();

  useEffect(()=>{
    console.log(docsFromHook);
      const passedEvents = docsFromHook.filter(function (doc) {
        return doc.eventStatus === "passed";
      });
      console.log(passedEvents);
      setPassedEvents(passedEvents);

      const futureEvents = docsFromHook.filter(function (doc) {
        return doc.eventStatus === "future";
      });
      console.log(futureEvents);
      setFutureEvents(futureEvents);
  }, [docsFromHook]);

  let selectedDoc = "";

  useEffect(() => {
    console.log(docsFromHookCMS);
    if (docsFromHookCMS) {
      selectedDoc = docsFromHookCMS.filter(function (doc) {
        return doc.id === "tournamentsPage";
      });
      console.log(selectedDoc);
    }
  });

  useEffect(() => {
    if (selectedDoc !== "") {
      selectedDoc.map(doc => {
        setENBannerUrl(doc.mainBanner.en);
        setITBannerUrl(doc.mainBanner.it);
        setENBannerText(doc.bannerText.en);
        setITBannerText(doc.bannerText.it);
        setENFooterMessage(doc.footerMessage.en);
        setITFooterMessage(doc.footerMessage.it);
      })
    }
  }, [docsFromHookCMS]);

 //Templates
  const PassedMatchTemp = (doc) => {
    let date = new Date(doc.eventDate);
    let parsedDate = date.toString();

    return (
        <li className="tab__item" key={doc.id}>

          <div className="tab__image"
               style={{
                 position: "center",
                 backgroundSize: "cover",
                 backgroundRepeat: "no-repeat"
               }}>
                   <img
                className="tab__img"
                src={doc.eventBanner}
                alt="some text"/>
          </div>
          <div className="tab__content">
            <a className="tab__title">{t('TournamentsPage.Category')}: {doc.eventCategory}</a>
            <div className="tab__name">{t('TournamentsPage.Title')}: {doc.eventTitle}</div>
            <br/>
            <div className="tab__date">{t('TournamentsPage.EventDate')}: {parsedDate}</div>
          </div>
          <ul className="tab__icon">
            <li className="tab__item-icon">
              <a className="tab__link-icon">
                <img className="tab__img" src={doc.eventWinner1?doc.eventWinner1:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"} alt=""/>
              </a>
            </li>
            <li className="tab__item-icon">
              <a className="tab__link-icon">
                <img className="tab__img" src={doc.eventWinner2?doc.eventWinner2:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"} alt=""/>
              </a>
            </li>
          </ul>
          <div className="tab__btn">
            <button className="tab__link-strim">
              <a className="" href={doc.eventVideoLink}>{t('TournamentsPage.WatchButton')}</a>
            </button>
            <button className="tab__link-info">
              <a className="" href={doc.eventInfoPage}>{t('TournamentsPage.InfoButton')}</a>
            </button>
          </div>
        </li>
    );
  }

  const PassedTournTemp = (doc) => {
    let date = new Date(doc.eventDate);
    let parsedDate = date.toString();

    return (
      <li className="tab__item" key={doc.id}>

      <div className="tab__image"
           style={{
             position: "center",
             backgroundSize: "cover",
             backgroundRepeat: "no-repeat"
           }}>
             <img
                className="tab__img"
                src={doc.eventBanner}
                alt="some text"/>
      </div>
      <div className="tab__content">
        <a className="tab__title">{t('TournamentsPage.Category')}: {doc.eventCategory}</a>
        <div className="tab__name">{t('TournamentsPage.Title')}: {doc.eventTitle}</div>
        <br/>
        <div className="tab__date">{t('TournamentsPage.EventDate')}: {parsedDate}</div>
      </div>
      <ul className="tab__icon">
        <li className="tab__item-icon">
          <a className="tab__link-icon">
            <img
                className="tab__img"
                src={doc.eventWinner1?doc.eventWinner1:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"}
                alt=""/>
          </a>
        </li>
      </ul>
      <div className="tab__btn">
        <button className="tab__link-strim">
          <a className="" href={doc.eventVideoLink}>{t('TournamentsPage.WatchButton')}</a>
        </button>
        <button className="tab__link-info">
          <a href={doc.eventInfoPage}>{t('TournamentsPage.InfoButton')}</a>
        </button>
      </div>
    </li>);
  }

  const FutureMatchTemp = (doc) => {
    let date = new Date(doc.eventDate);
    let parsedDate = date.toString();

    return (
      <li className="tab__item" key={doc.id}>

      <div className="tab__image"
           style={{
             position: "center",
             backgroundSize: "cover",
             backgroundRepeat: "no-repeat"
           }}>
               <img
                className="tab__img"
                src={doc.eventBanner}
                alt="some text"/>
      </div>
      <div className="tab__content">
        <a className="tab__title">{t('TournamentsPage.Category')}: {doc.eventCategory}</a>
        <div className="tab__name">{t('TournamentsPage.Title')}: {doc.eventTitle}</div>
        <br/>
        <div className="tab__date">{t('TournamentsPage.EventDate')}: {parsedDate}</div>
      </div>
      <ul className="tab__icon">
        <li className="tab__item-icon">
          <a href="#" className="tab__link-icon">
            <img
                className="tab__img"
                src={doc.pictureURL1?doc.pictureURL1:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"}
                alt=""/>
          </a>
        </li>
        <li className="tab__item-icon">
            <img
                className="tab__img-icon"
                src={vsIcon}
                alt=""/>
        </li>
        <li className="tab__item-icon">
          <a className="tab__link-icon">
            <img
                className="tab__img"
                src={doc.pictureURL2?doc.pictureURL2:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"}
                alt=""/>
          </a>
        </li>
      </ul>
      <div className="tab__btn">
        <button className="tab__link-strim">
          <a className="" href={doc.eventVideoLink}>{t('TournamentsPage.WatchButton')}</a>
        </button>
        <button className="tab__link-info">
          <a className="" href={doc.eventInfoPage}>{t('TournamentsPage.InfoButton')}</a>
        </button>
      </div>
    </li>);
  }

  const FutureTournTemp = (doc) => {
    let date = new Date(doc.eventDate);
    let parsedDate = date.toString();

    return (
        <li className="tab__item" key={doc.id}>

      <div className="tab__image"
           style={{
             position: "center",
             backgroundSize: "cover",
             backgroundRepeat: "no-repeat"
           }}>
               <img
                className="tab__img"
                src={doc.eventBanner}
                alt="some text"/>
      </div>
      <div className="tab__content">
        <a className="tab__title">{t('TournamentsPage.Category')}: {doc.eventCategory}</a>
        <div className="tab__name">{t('TournamentsPage.Title')}: {doc.eventTitle}</div>
        <br/>
        <div className="tab__date">{t('TournamentsPage.EventDate')}: {parsedDate}</div>
      </div>
      <ul className="tab__icon">
        <li className="tab__item-icon">
          <a href="#" className="tab__link-icon">
            <img
                className="tab__img"
                src={doc.pictureURL1?doc.pictureURL1:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"} alt=""/>
          </a>
        </li>
        <li className="tab__item-icon">
          <a href="#" className="tab__link-icon">
            <img
                className="tab__img"
                src={doc.pictureURL2?doc.pictureURL2:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"}
                alt=""/>
          </a>
        </li>
        <li className="tab__item-icon">
          <a href="#" className="tab__link-icon">
            <img
                className="tab__img"
                src={doc.pictureURL3?doc.pictureURL3:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"}
                alt=""/>
          </a>
        </li>
        <li className="tab__item-icon">
          <a className="tab__link-icon">
            <img
                className="tab__img"
                src={doc.pictureURL4?doc.pictureURL4:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"}
                alt=""/>
          </a>
        </li>
      </ul>
      <div className="tab__btn">
        <button className="tab__link-strim">
          <a className="" href={doc.eventVideoLink}>{t('TournamentsPage.WatchButton')}</a>
        </button>

        <button className="tab__link-info">
          <a href={doc.eventInfoPage}>{t('TournamentsPage.InfoButton')}</a>
        </button>

      </div>
    </li>);
  }

  return (
    <>
      <main className="page">
        <section className="tournament">
          <div className="container">

            <div className="info__logo logo-section">
              <img src={logoSection} alt="" className="info__img"/>
            </div>
            <h1 className="tournament__title title">
              {t('TournamentsPage.AkidragonTournaments')}
            </h1>
            <div className="tournament__image">
              <img className="tournament__img" src={appLanguage==="it"?ITBannerUrl:ENBannerUrl} alt=""/>
            </div>

            <p className="tournament__text">
              {appLanguage==="it"?ITBannerText:ENBannerText}
            </p>

            <div className="tab__body">

              <ul className="nav nav-tabs tab__btn-list" id="myTab" role="tablist">

                <li className="nav-item tab__btn-item" >
                  <a className="tab__btn active" id="passed-tab" data-toggle="tab" href="#passed" role="tab"
                     aria-controls="passed" aria-selected="true">{t('TournamentsPage.PassedEvents')}</a>
                </li>

                <li className="nav-item tab__btn-item">
                  <a className="tab__btn" id="future-tab" data-toggle="tab" href="#future" role="tab"
                     aria-controls="future" aria-selected="false">{t('TournamentsPage.FutureEvents')}</a>
                </li>

             </ul>

              <div className="tab-content" id="myTabContent">

                <div className="tab-pane fade show active" id="passed" role="tabpanel" aria-labelledby="passed-tab">
                  {passedEvents && passedEvents.slice(0, 4).map(doc =>
                     doc.eventCategory === "match" ? PassedMatchTemp(doc) : PassedTournTemp(doc)
                  )}
                </div>

                <div className="tab-pane fade" id="future" role="tabpanel" aria-labelledby="future-tab">
                  {futureEvents && futureEvents.slice(0, 4).map(doc =>
                     doc.eventCategory === "match" ? FutureMatchTemp(doc) : FutureTournTemp(doc)
                  )}
                </div>

              </div>
            </div>
          </div>
        </section>

        <section className="contact">
          <div className="container">
            <h2 className="contact__title">{appLanguage==="it"?ITFooterMessage:ENFooterMessage}</h2>
            <div className="contact__btn">
              <Link to="/ContactUsPage">
                <a className="contact__btn-link">{t('TournamentsPage.ContactsButton')}</a>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default TournamentsPage;