import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import logoBig from '../../assets/images/dest/logo-big.png';
import {useDataFromFirestoreCMS} from "../../customHooks/useFirestore";
import {useLanguageContext} from "../../context/LanguageContext";

function AboutUsPage() {
  console.log("AboutUsPage worked");

  const {appLanguage} = useLanguageContext();

  const {docsFromHookCMS} = useDataFromFirestoreCMS('web-app-cms');

  const [ENBannerUrl, setENBannerUrl] = useState("");
  const [ITBannerUrl, setITBannerUrl] = useState("");

  const [avatar1Url, setAvatar1Url] = useState("");
  const [avatar2Url, setAvatar2Url] = useState("");
  const [avatar3Url, setAvatar3Url] = useState("");
  const [avatar4Url, setAvatar4Url] = useState("");
  const [avatar5Url, setAvatar5Url] = useState("");
  const [avatar6Url, setAvatar6Url] = useState("");
  const [avatar7Url, setAvatar7Url] = useState("");
  const [avatar8Url, setAvatar8Url] = useState("");

  const [partnerLogo1Url, setPartnerLogo1Url] = useState("");
  const [partnerLogo2Url, setPartnerLogo2Url] = useState("");
  const [partnerLogo3Url, setPartnerLogo3Url] = useState("");
  const [partnerLogo4Url, setPartnerLogo4Url] = useState("");
  const [partnerLogo5Url, setPartnerLogo5Url] = useState("");

  const [oldENBannerUrl, setOldENBannerUrl] = useState("");
  const [oldITBannerUrl, setOldITBannerUrl] = useState("");

  const [oldAvatar1Url, setOldAvatar1Url] = useState("");
  const [oldAvatar2Url, setOldAvatar2Url] = useState("");
  const [oldAvatar3Url, setOldAvatar3Url] = useState("");
  const [oldAvatar4Url, setOldAvatar4Url] = useState("");
  const [oldAvatar5Url, setOldAvatar5Url] = useState("");
  const [oldAvatar6Url, setOldAvatar6Url] = useState("");
  const [oldAvatar7Url, setOldAvatar7Url] = useState("");
  const [oldAvatar8Url, setOldAvatar8Url] = useState("");

  const [oldPartnerLogo1Url, setOldPartnerLogo1Url] = useState("");
  const [oldPartnerLogo2Url, setOldPartnerLogo2Url] = useState("");
  const [oldPartnerLogo3Url, setOldPartnerLogo3Url] = useState("");
  const [oldPartnerLogo4Url, setOldPartnerLogo4Url] = useState("");
  const [oldPartnerLogo5Url, setOldPartnerLogo5Url] = useState("");

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

  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [name3, setName3] = useState("");
  const [name4, setName4] = useState("");
  const [name5, setName5] = useState("");
  const [name6, setName6] = useState("");
  const [name7, setName7] = useState("");
  const [name8, setName8] = useState("");

  const [ENPositionName1, setENPositionName1] = useState("");
  const [ITPositionName1, setITPositionName1] = useState("");
  const [ENPositionName2, setENPositionName2] = useState("");
  const [ITPositionName2, setITPositionName2] = useState("");
  const [ENPositionName3, setENPositionName3] = useState("");
  const [ITPositionName3, setITPositionName3] = useState("");
  const [ENPositionName4, setENPositionName4] = useState("");
  const [ITPositionName4, setITPositionName4] = useState("");
  const [ENPositionName5, setENPositionName5] = useState("");
  const [ITPositionName5, setITPositionName5] = useState("");
  const [ENPositionName6, setENPositionName6] = useState("");
  const [ITPositionName6, setITPositionName6] = useState("");
  const [ENPositionName7, setENPositionName7] = useState("");
  const [ITPositionName7, setITPositionName7] = useState("");
  const [ENPositionName8, setENPositionName8] = useState("");
  const [ITPositionName8, setITPositionName8] = useState("");

  const [ENTitle, setENTitle] = useState("");
  const [ITTitle, setITTitle] = useState("");

  const [ENTitleText, setENTitleText] = useState("");
  const [ITTitleText, setITTitleText] = useState("");
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

        setName1(doc.teamMembers.member1.name);
        setName2(doc.teamMembers.member2.name);
        setName3(doc.teamMembers.member3.name);
        setName4(doc.teamMembers.member4.name);
        setName5(doc.teamMembers.member5.name);
        setName6(doc.teamMembers.member6.name);
        setName7(doc.teamMembers.member7.name);
        setName8(doc.teamMembers.member8.name);

        setENCareerTitle(doc.careerTitle.en);
        setITCareerTitle(doc.careerTitle.it);
        setENCareerText(doc.careerText.en);
        setITCareerText(doc.careerText.it);

        setENPositionName1(doc.teamMembers.member1.title.en);
        setITPositionName1(doc.teamMembers.member1.title.it);
        setENPositionName2(doc.teamMembers.member2.title.en);
        setITPositionName2(doc.teamMembers.member2.title.it);
        setENPositionName3(doc.teamMembers.member3.title.en);
        setITPositionName3(doc.teamMembers.member3.title.it);
        setENPositionName4(doc.teamMembers.member4.title.en);
        setITPositionName4(doc.teamMembers.member4.title.it);
        setENPositionName5(doc.teamMembers.member5.title.en);
        setITPositionName5(doc.teamMembers.member5.title.it);
        setENPositionName6(doc.teamMembers.member6.title.en);
        setITPositionName6(doc.teamMembers.member6.title.it);
        setENPositionName7(doc.teamMembers.member7.title.en);
        setITPositionName7(doc.teamMembers.member7.title.it);
        setENPositionName8(doc.teamMembers.member8.title.en);
        setITPositionName8(doc.teamMembers.member8.title.it);

        setAvatar1Url(doc.teamMembers.member1.photo);
        setAvatar2Url(doc.teamMembers.member2.photo);
        setAvatar3Url(doc.teamMembers.member3.photo);
        setAvatar4Url(doc.teamMembers.member4.photo);
        setAvatar5Url(doc.teamMembers.member5.photo);
        setAvatar6Url(doc.teamMembers.member6.photo);
        setAvatar7Url(doc.teamMembers.member7.photo);
        setAvatar8Url(doc.teamMembers.member8.photo);

        setPartnerLogo1Url(doc.partnersLogos.partner1);
        setPartnerLogo2Url(doc.partnersLogos.partner2);
        setPartnerLogo3Url(doc.partnersLogos.partner3);
        setPartnerLogo4Url(doc.partnersLogos.partner4);
        setPartnerLogo5Url(doc.partnersLogos.partner5);
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
                Scopri di piu su Gold Fox Gaming
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
              {appLanguage==="it"?ITMissionText:ITMissionText}
            </p>
          </div>
        </div>
      </section>

      <section className="team">
        <div className="container">
          <div className="team__wrapper">
            <h2 className="team__title title">{appLanguage==="it"?ITCrewTitle:ENCrewTitle}</h2>
            <ul className="team__list">
              <li className="team__item">
                <img src={avatar1Url} alt="" className="team__image"/>
                <div className="team__name">{name1}</div>
                <div className="team__position">{appLanguage==="it"?ITPositionName1:ENPositionName1}</div>
              </li>
              <li className="team__item">
                <img src={avatar2Url} alt="" className="team__image"/>
                <div className="team__name">{name2}</div>
                <div className="team__position">{appLanguage==="it"?ITPositionName2:ENPositionName2}</div>
              </li>
              <li className="team__item">
                <img src={avatar3Url} alt="" className="team__image"/>
                <div className="team__name">{name3}</div>
                <div className="team__position">{appLanguage==="it"?ITPositionName3:ENPositionName3}</div>
              </li>
            </ul>
            <ul className="team__list team__list--second">
              <li className="team__item">
                <img src={avatar4Url} alt="" className="team__image"/>
                <div className="team__name">{name4}</div>
                <div className="team__position">{appLanguage==="it"?ITPositionName4:ENPositionName4}</div>
              </li>
              <li className="team__item">
                <img src={avatar5Url} alt="" className="team__image"/>
                <div className="team__name">{name5}</div>
                <div className="team__position">{appLanguage==="it"?ITPositionName5:ENPositionName5}</div>
              </li>
              <li className="team__item">
                <img src={avatar6Url} alt="" className="team__image"/>
                <div className="team__name">{name6}</div>
                <div className="team__position">{appLanguage==="it"?ITPositionName6:ENPositionName6}</div>
              </li>
              <li className="team__item">
                <img src={avatar7Url} alt="" className="team__image"/>
                <div className="team__name">{name7}</div>
                <div className="team__position">{appLanguage==="it"?ITPositionName7:ENPositionName7}</div>
              </li>
              <li className="team__item">
                <img src={avatar8Url} alt="" className="team__image"/>
                <div className="team__name">{name8}</div>
                <div className="team__position">{appLanguage==="it"?ITPositionName8:ENPositionName8}</div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="partner">
        <div className="container">
          <h2 className="partner__title title">{appLanguage==="it"?ITPartnersTitle:ENPartnersTitle}</h2>
          <ul className="partner__list">
            <li className="partner__item"><img src={partnerLogo1Url} alt="" className="partner__image"/></li>
            <li className="partner__item"><img src={partnerLogo2Url} alt="" className="partner__image"/></li>
            <li className="partner__item"><img src={partnerLogo3Url} alt="" className="partner__image"/></li>
            <li className="partner__item"><img src={partnerLogo4Url} alt="" className="partner__image"/></li>
            <li className="partner__item"><img src={partnerLogo5Url} alt="" className="partner__image"/></li>
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
              <Link className="career__btn" to='/SubmitCvForm'>Invia il tuo CV</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutUsPage;