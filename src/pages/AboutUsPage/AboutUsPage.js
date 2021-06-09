import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import logoBig from '../../assets/images/dest/logo-big.png';
import {useDataFromFirestoreCMS} from "../../customHooks/useFirestore";
import {useLanguageContext} from "../../context/LanguageContext";
import {useTranslation} from "react-i18next";

function AboutUsPage() {
  console.log("AboutUsPage worked");

  const {t} = useTranslation();
  const {appLanguage} = useLanguageContext();

  const {docsFromHookCMS} = useDataFromFirestoreCMS('web-app-cms');

  const [ENBannerUrl, setENBannerUrl] = useState("");
  const [ITBannerUrl, setITBannerUrl] = useState("");

  // Text
  const [ENCareerTitle, setENCareerTitle] = useState("");
  const [ITCareerTitle, setITCareerTitle] = useState("");

  const [ENCareerText, setENCareerText] = useState("");
  const [ITCareerText, setITCareerText] = useState("");

  const [ENCrewTitle, setENCrewTitle] = useState("");
  const [ITCrewTitle, setITCrewTitle] = useState("");

  const [ITMissionTitle, setITMissionTitle] = useState("");
  const [ENMissionTitle, setENMissionTitle] = useState("");

  const [ITMissionText, setITMissionText] = useState("");
  const [ENMissionText, setENMissionText] = useState("");

  const [ENPartnersTitle, setENPartnersTitle] = useState("");
  const [ITPartnersTitle, setITPartnersTitle] = useState("");

  const [generalTeamMembersArr, setGeneralTeamMembersArr] = useState([]);
  const [generalPartnersLogoArr, setGeneralPartnersLogoArr] = useState([]);

  const [ENTitle, setENTitle] = useState("");
  const [ITTitle, setITTitle] = useState("");

  const [ENTitleText, setENTitleText] = useState("");
  const [ITTitleText, setITTitleText] = useState("");

  let membersArr = [];
  let partnersArr = [];
  let selectedDoc = "";

  useEffect(() => {
    console.log(docsFromHookCMS);
    if (docsFromHookCMS) {
      selectedDoc = docsFromHookCMS.filter(function (doc) {
        return doc.id === "aboutUsPage";
      });
      console.log(selectedDoc);
    }
  });

  useEffect(() => {
    if (selectedDoc !== "") {
      selectedDoc.map(doc => {
        doc.members.map(member => membersArr.push({...member}));
        setGeneralTeamMembersArr(membersArr);

        doc.partners.map(partner => partnersArr.push({...partner}));
        setGeneralPartnersLogoArr(partnersArr);

        setENTitle(doc.title.en);
        setITTitle(doc.title.it);
        setENTitleText(doc.titleText.en);
        setITTitleText(doc.titleText.it);

        setENBannerUrl(doc.banner.en);
        setITBannerUrl(doc.banner.it);

        setITMissionTitle(doc.missionTitle.it);
        setENMissionTitle(doc.missionTitle.en);
        setITMissionText(doc.missionText.it);
        setENMissionText(doc.missionText.en);

        setENCrewTitle(doc.crewTitle.en);
        setITCrewTitle(doc.crewTitle.it);

        setENPartnersTitle(doc.partnersTitle.en);
        setITPartnersTitle(doc.partnersTitle.it);

        setENCareerTitle(doc.careerTitle.en);
        setITCareerTitle(doc.careerTitle.it);
        setENCareerText(doc.careerText.en);
        setITCareerText(doc.careerText.it);
      })
    }
  }, [docsFromHookCMS]);

  return (
    <main className="page">
      <section className="intro"></section>
      <section className="about">
        <div className="container">
          <div className="about__inner">
            <div className="about__image">
              <img src={logoBig} alt="" className="about__img"/>
            </div>
            <div className="about__content">
              <h2 className="about__title title">{appLanguage==="it"?ITTitle:ENTitle}</h2>
              <p className="about__text">
              {appLanguage==="it"?ITTitleText:ENTitleText}
              </p>
              <button className="about__btn">
                <a className="" href="https://www.goldfoxgaming.it/">{t('AboutUsPage.FindOutMoreButton')}</a>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mission">
        <div className="container">
          <div className="mission__wrapper">
            <div className="mission__image">
              <img src={appLanguage==="it"?ITBannerUrl:ENBannerUrl} alt="" className="mission__img"/>
            </div>
            <h2 className="mission__title title">{appLanguage==="it"?ITMissionTitle:ENMissionTitle}</h2>
            <p className="mission__text">
              {appLanguage==="it"?ITMissionText:ENMissionText}
            </p>
          </div>
        </div>
      </section>

      <section className="team">
        <div className="container">
          <div className="team__wrapper">
            <h2 className="team__title title">{appLanguage==="it"?ITCrewTitle:ENCrewTitle}</h2>
            <ul className="team__list">
              { generalTeamMembersArr.map(doc =>
                    <li className="team__item" key={doc.id}>
                    <img src={doc.avatar} alt="" className="team__image"/>
                    <div className="team__name">{doc.name}</div>
                    <div className="team__position">{appLanguage==="it"?doc.title.it:doc.title.en}</div>
                  </li>
                )
              }

            </ul>
          </div>
        </div>
      </section>

      <section className="partner">
        <div className="container">
          <h2 className="partner__title title">{appLanguage==="it"?ITPartnersTitle:ENPartnersTitle}</h2>
          <ul className="partner__list">
            { generalPartnersLogoArr.map(doc =>
                <li className="partner__item" key={doc.id}><img src={doc.logo} alt="" className="partner__image"/></li>
            )}
          </ul>
        </div>
      </section>

      <section className="career">
        <div className="container">
          <div className="career__inner">
            <div className="career__image">
              <img src="https://corporate.exxonmobil.com/-/media/Global/Images/New-purchases/business-meeting-breakout-discussions_supporting.jpg" alt="" className="career__img"/>
            </div>
            <div className="career__content">
              <h2 className="career__title title">{appLanguage==="it"?ITCareerTitle:ENCareerTitle}</h2>
              <p className="career__text">
              {appLanguage==="it"?ITCareerText:ENCareerText}
              </p>
              <Link className="career__btn" to='/SubmitCvForm'>{t('AboutUsPage.SubmitCVButton')}</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutUsPage;