import React, {useEffect, useState} from 'react';
import ShortArticlesList from "../../components/ShortArticlesList";
import LatestStreamsSwiper from "../../components/swipers/LatestStreamsSwiper";
import {Link} from 'react-router-dom';
//import {useAuthContext} from "../../context/AuthContext";
import {useLanguageContext} from "../../context/LanguageContext";
import logoSection from '../../assets/images/dest/logo-section.png';
import logoBig from '../../assets/images/dest/logo-big.png';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {useDataFromFirestoreCMS} from "../../customHooks/useFirestore";
import {useTranslation} from "react-i18next";

export default function HomePage() {
  const {t} = useTranslation();
  console.log("HomePage component worked.");
  const {docsFromHookCMS} = useDataFromFirestoreCMS('web-app-cms');
  const {appLanguage} = useLanguageContext();

  //Url
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
  const [ENBannerText, setENBannerText] = useState("");
  const [ITBannerText, setITBannerText] = useState("");

  let selectedDoc = "";

  useEffect(() => {
    console.log(docsFromHookCMS);
    if (docsFromHookCMS) {
      selectedDoc = docsFromHookCMS.filter(function (doc) {
        return doc.id === "homePage";
      });
      console.log(selectedDoc);
    }
  });

  useEffect(() => {
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
      })
    }
  }, [docsFromHookCMS]);

  return (
    <>
      <main className="page">
        <section className="banner">
          <div className="container">
            <div className="banner__image">
              <img className="banner__img" src={appLanguage === "it" ? ITBannerUrl : ENBannerUrl}
                   alt="Akidrago banner"/>
              {/*<img className="banner__img" src={logoBig} alt="Akidrago banner"/>*/}
            </div>
          </div>
        </section>

        <section className="info">
          <div className="container">
            <h2 className="title info__title">
              {appLanguage === "it" ? ITBannerText : ENBannerText}
              {/*Esplora l'unniverso <span>aki</span>dragon*/}
            </h2>
            <ul className="info__list">
              <li className="info__item">
                <Link to="/TournamentsPage">
                  <a className="info__link">
                    <div className="info__image">
                      <img className="info__img"
                           src={appLanguage === "it" ? ITTournamentsBannerUrl : ENTournamentsBannerUrl}
                           alt=""/>
                    </div>
                    <h3 className="info__item-title">{t('HomePage.Card1')}</h3>
                  </a>
                </Link>
              </li>
              <li className="info__item">
                <Link to="/AboutUsPage">
                  <a className="info__link">
                    <div className="info__image">
                      <img className="info__img"
                           src={appLanguage === "it" ? ITGameTeamsBannerUrl : ENGameTeamsBannerUrl}
                           alt=""/>
                    </div>
                    <h3 className="info__item-title">{t('HomePage.Card2')}</h3>
                  </a>
                </Link>
              </li>
              <li className="info__item">
                <Link to="/">
                  <a className="info__link">
                    <div className="info__image">
                      <img className="info__img"
                           src={appLanguage === "it" ? ITSalesBannerUrl : ENSalesBannerUrl}//"https://en.parisinfo.com/var/otcp/sites/images/node_43/node_51/joueurs-d'esport-%7C-630x405-%7C-%C2%A9-dr/19307954-1-fre-FR/Joueurs-d'Esport-%7C-630x405-%7C-%C2%A9-DR.jpg"
                           alt=""/>
                    </div>
                    <h3 className="info__item-title">{t('HomePage.Card3')}</h3>
                  </a>
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
              {t('HomePage.LatestArticlesTitle')}
            </h2>
            <div className="news__inner">
              <ShortArticlesList/>
            </div>
            <Link className='btn-more' to="/BlogPage">
              <button className="news__btn btn">{t('HomePage.OtherArticlesButton')}</button>
            </Link>
          </div>

        </section>

        <section className="slider">
          <div className="container">
            <h2 className="slider__title title">
              {t('HomePage.LatestStreamsTitle')}
            </h2>

            <LatestStreamsSwiper/>

            <Link className='btn-more btn-more__home-slider' to="/ContentPage">
              <button className="slider__btn btn">{t('HomePage.OtherVideosButton')}</button>
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
                <Link className="feed__link" to="SponsorshipPage">
                  <a className="feed__link">{t('HomePage.SponsorshipBanner')}</a>
                </Link>
              </div>
              <div className="feed__item">
                <div className="feed__image">
                  <img src={appLanguage === "it" ? ITContactsBannerUrl : ENContactsBannerUrl} alt=""
                       className="feed__img"/>
                </div>
                <Link className="feed__link" to="ContactUsPage">
                  <a className="feed__link">{t('HomePage.ContactsBanner')}</a>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="contact__btn">
          <Link className="contact__btn-link" to="/ContactUsPage">
            {t('HomePage.ContactsButton')}
          </Link>
        </div>
      </main>
    </>
  );
}

