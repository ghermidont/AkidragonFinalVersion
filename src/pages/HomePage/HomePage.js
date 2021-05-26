import React, {useEffect, useState} from 'react';
import ShortArticlesList from "../../components/ShortArticlesList";
import LatestStreamsSwiper from "../../components/swipers/LatestStreamsSwiper";
import {Link} from 'react-router-dom';
//import {useAuthContext} from "../../context/AuthContext";
import logoSection from '../../assets/images/dest/logo-section.png';
import logoBig from '../../assets/images/dest/logo-big.png';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {useDataFromFirestoreCMS} from "../../customHooks/useFirestore";

export default function HomePage() {
  console.log("HomePage component worked.");
  const {docsFromHookCMS} = useDataFromFirestoreCMS('web-app-cms');

  //Url
  const [ENBannerUrl, setENBannerUrl] = useState('');
  const [ENContactsBannerUrl, setENContactsBannerUrl] = useState('');
  const [ENGameTeamsBannerUrl, setENGameTeamsBannerUrl] = useState('');
  const [ENSalesBannerUrl, setENSalesBannerUrl] = useState('');
  const [ENSponsorshipBannerUrl, setENSponsorshipBannerUrl] = useState('');
  const [ENTournamentsBannerUrl, setENTournamentsBannerUrl] = useState('');
  const [ITBannerUrl, setITBannerUrl] = useState('');
  const [ITContactsBannerUrl, setITContactsBannerUrl] = useState('');
  const [ITGameTeamsBannerUrl, setITGameTeamsBannerUrl] = useState('');
  const [ITSalesBannerUrl, setITSalesBannerUrl] = useState('');
  const [ITSponsorshipBannerUrl, setITSponsorshipBannerUrl] = useState('');
  const [ITTournamentsBannerUrl, setITTournamentsBannerUrl] = useState('');

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
      })
    }
  }, [docsFromHookCMS]);

  return (
      <>
        <main className="page">
          <section className="banner">
            <div className="container">
              <div className="banner__image">
                <img className="banner__img" src={logoBig} alt="Akidragon banner"/>
              </div>
            </div>
          </section>

          <section className="info">
            <div className="container">
              <h2 className="title info__title">
                Esplora l'unniverso <span>aki</span>dragon
              </h2>
              <ul className="info__list">
                <li className="info__item">
                  <Link to="/TournamentsPage">
                    <a className="info__link">
                      <div className="info__image">
                        <img className="info__img"
                             src={ENTournamentsBannerUrl}
                             alt=""/>
                      </div>
                      <h3 className="info__item-title">Tornei</h3>
                    </a>
                  </Link>
                </li>
                <li className="info__item">
                  <Link to="/AboutUsPage">
                    <a className="info__link">
                      <div className="info__image">
                        <img className="info__img"
                             src={ENGameTeamsBannerUrl}
                             alt=""/>
                      </div>
                      <h3 className="info__item-title">Team e giochi</h3>
                    </a>
                  </Link>
                </li>
                <li className="info__item">
                  <Link to="/">
                    <a className="info__link">
                      <div className="info__image">
                        <img className="info__img"
                             src={ENSalesBannerUrl}//"https://en.parisinfo.com/var/otcp/sites/images/node_43/node_51/joueurs-d'esport-%7C-630x405-%7C-%C2%A9-dr/19307954-1-fre-FR/Joueurs-d'Esport-%7C-630x405-%7C-%C2%A9-DR.jpg"
                             alt=""/>
                      </div>
                      <h3 className="info__item-title">Sale Gaming</h3>
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
                <span>Ultimi</span> articole
              </h2>
              <div className="news__inner">
                <ShortArticlesList/>
              </div>
              <Link className='btn-more' to="/BlogPage">
                <button className="news__btn btn"><span>Altri</span> articoli</button>
              </Link>
            </div>

          </section>

          <section className="slider">
            <div className="container">
              <h2 className="slider__title title">
                <span>Ultimi</span> contenuti dei nostri streamer
              </h2>

              <LatestStreamsSwiper/>

              <Link className='btn-more btn-more__home-slider' to="/ContentPage">
                <button className="slider__btn btn"><span>Altri</span> video</button>
              </Link>
            </div>
          </section>

          <section className="feed">
            <div className="container">
              <div className="feed__inner">
                <div className="feed__item">
                  <div className="feed__image">
                    <img src={ENSponsorshipBannerUrl} alt="" className="feed__img"/>
                  </div>
                  <Link className="feed__link" to="/">
                    <a className="feed__link">Sponsorship</a>
                  </Link>
                </div>
                <div className="feed__item">
                  <div className="feed__image">
                    <img src={ENContactsBannerUrl} alt="" className="feed__img"/>
                  </div>
                  <Link className="feed__link" to="ContactUsPage">
                    <a className="feed__link">Contatti</a>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <div className="contact__btn">
            <Link className="contact__btn-link" to="/ContactUsPage">
              Contattaci
            </Link>
          </div>
        </main>
      </>
  );
}

