import React from 'react';
import {Link} from "react-router-dom";
import {useDataFromFirestore} from "../customHooks/useFirestore";
import logoSection from '../assets/images/dest/logo-section.png';

function TournamentsPage() {
  const tabsBtn = document.querySelectorAll('.tab__body-btn');
  const tabsItems = document.querySelectorAll('.tab__list');
  tabsBtn.forEach(function (item) {
    item.addEventListener('click', function () {
      let currentBtn = item;
      let tabId = currentBtn.getAttribute('data-tab');
      let currentTab = document.querySelector(tabId);

      tabsBtn.forEach(function (item) {
        item.classList.remove('active');
      });
      tabsItems.forEach(function (item) {
        item.classList.remove('active');
      });

      currentBtn.classList.add('active');
      currentTab.classList.add('active');
    });
  });

  /*====EndTab====*/

  const {docsFromHook} = useDataFromFirestore('TEMP-tournaments');

  const passedEvents = docsFromHook.filter(function (doc) {
    return doc.eventStatus === "passed";
  });

  const futureEvents = docsFromHook.filter(function (doc) {
    return doc.eventStatus === "future";
  });

//Templates
  const PassedMatchTemp = (doc) => {
    return (<li className="tab__item">
          <div className="tab__image"
               style={{
                 background: "blue",
                 url: "#",
                 position: "center",
                 backgroundSize: "cover",
                 backgroundRepeat: "no-repeat"
               }}>
          </div>
          <div className="tab__content">
            <a className="tab__title">{doc.eventCategory}</a>
            <div className="tab__name">{doc.eventTitle}</div>
            <date className="tab__date">{doc.eventDate}</date>
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
              <a className="" href={doc.eventVideoLink}>Watch</a>
            </button>
            <button className="tab__link-info">
              <a className="" href={doc.eventInfoPage}>Info</a>Info
            </button>
          </div>
    </li>
    );
  }

  const PassedTournTemp = (doc) => {
    return (<li className="tab__item">
      <div className="tab__image"
           style={{
             background: "blue",
             url: "#",
             position: "center",
             backgroundSize: "cover",
             backgroundRepeat: "no-repeat"
           }}>
      </div>
      <div className="tab__content">
        <a className="tab__title">{doc.eventCategory}</a>
        <div className="tab__name">Rambow Six Siege</div>
        <date className="tab__date">{doc.eventDate}</date>
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
          <a className="" href={doc.eventVideoLink}>Watch</a>
        </button>
        <button className="tab__link-info">
          <a className="" href={doc.eventInfoPage}>Info</a>Info
        </button>
      </div>
    </li>);
  }

  const FutureMatchTemp = (doc) => {
    return (<li className="tab__item">
      <div className="tab__image"
           style={{
             background: "blue",
             url: "#",
             position: "center",
             backgroundSize: "cover",
             backgroundRepeat: "no-repeat"
           }}>
      </div>
      <div className="tab__content">
        <a className="tab__title">{doc.eventCategory}</a>
        <div className="tab__name">{doc.eventTitle}</div>
        <date className="tab__date">{doc.eventDate}</date>
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
          <a className="" href={doc.eventVideoLink}>Watch</a>
        </button>
        <button className="tab__link-info">
          <a className="" href={doc.eventInfoPage}>Info</a>Info
        </button>
      </div>
    </li>);
  }

  const FutureTournTemp = (doc) => {
    return (<li className="tab__item">
      <div className="tab__image"
           style={{
             background: "blue",
             url: "#",
             position: "center",
             backgroundSize: "cover",
             backgroundRepeat: "no-repeat"
           }}>
      </div>
      <div className="tab__content">
        <a className="tab__title">{doc.eventCategory}</a>
        <div className="tab__name">{doc.eventTitle}</div>
        <date className="tab__date">{doc.eventDate}</date>
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
          <a className="" href={doc.eventVideoLink}>Watch</a>
        </button>
        <button className="tab__link-info">
          <a className="" href={doc.eventInfoPage}>Info</a>Info
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
              <span>I tornei aki</span>dragon
            </h1>
            <div className="tournament__image">
              <img className="tournament__img" src="https://www.esportswizard.com/wp-content/uploads/south-korea-triumphing-in-the-overwatch-league.jpg" alt=""/>
            </div>

            <p className="tournament__text">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur odio ipsum explicabo
              repudiandae eius, quos corrupti dolorem sint voluptatum rem nihil sequi fugit quis amet
              iusto numquam recusandae dolores quasi repellat fuga, nam suscipit illum labore. Iste
              uasi animi necessitatibus temporibus et earum assumenda.
              Earum neque quasi vel laudantium nemo?
            </p>

            <div className="tournament__tab tab">
              <div className="tab__body">
                <ul className="tab__body-list">
                  <li className="tab__body-item">
                    <button className="tab__body-btn active" type="button"
                            data-tab="#tab_1">Eventi passati
                    </button>
                  </li>
                  <li className="tab__body-item">
                    <button className="tab__body-btn" type="button"
                            data-tab="#tab_2">Prossimi eventi
                    </button>
                  </li>
                </ul>

                <ul className="tab__list active" id="tab_1">
                  {passedEvents && passedEvents.slice(0, 4).map(doc =>
                    doc.EventCategory === "match" ? PassedMatchTemp(doc) : PassedTournTemp(doc)
                  )}
                </ul>

                <ul className="tab__list active" id="tab_2">
                  {futureEvents && futureEvents.slice(0, 4).map(doc =>
                    doc.EventCategory === "match" ? FutureMatchTemp(doc) : FutureTournTemp(doc)
                  )}
                </ul>

              </div>
            </div>
          </div>
        </section>

        <section className="contact">
          <div className="container">
            <h2 className="contact__title">Hai un team? partecipa anche tu!</h2>
            <div className="contact__btn">
              <Link to="/ContactUsPage">
                <a className="contact__btn-link">Contattaci</a>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default TournamentsPage;
