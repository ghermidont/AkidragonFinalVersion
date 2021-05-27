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

        setOldENBannerUrl(doc.banner.en);
        setOldITBannerUrl(doc.banner.it);

        setOldAvatar1Url(doc.teamMembers.member1.photo);
        setOldAvatar2Url(doc.teamMembers.member2.photo);
        setOldAvatar3Url(doc.teamMembers.member3.photo);
        setOldAvatar4Url(doc.teamMembers.member4.photo);
        setOldAvatar5Url(doc.teamMembers.member5.photo);
        setOldAvatar6Url(doc.teamMembers.member6.photo);
        setOldAvatar7Url(doc.teamMembers.member7.photo);
        setOldAvatar8Url(doc.teamMembers.member8.photo);

        setOldPartnerLogo1Url(doc.partnersLogos.partner1);
        setOldPartnerLogo2Url(doc.partnersLogos.partner2);
        setOldPartnerLogo3Url(doc.partnersLogos.partner3);
        setOldPartnerLogo4Url(doc.partnersLogos.partner4);
        setOldPartnerLogo5Url(doc.partnersLogos.partner5);

        setITMissionTitle(doc.missionTitle.it);
        setENMissionTitle(doc.missionTitle.en);
        setITMissionText(doc.missionText.it);
        setENMissionText(doc.missionText.en);

        setENCareerTitle(doc.careerTitle.en);
        setITCareerTitle(doc.careerTitle.it);
        setENCareerText(doc.careerText.en);
        setITCareerText(doc.careerText.it);

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
              <h2 className="about__title title"><span>Chi</span> siamo</h2>
              <p className="about__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                blanditiis earum minus perspiciatis impedit sint, mollitia
                omnis. Odio nesciunt placeat consequatur reprehenderit eligendi
                iusto asperiores autem aliquam iure perferendis. Esse facere
                nihil eveniet quas, consectetur eius possimus perspiciatis
                aliquid fugiat? At eum libero ea dolorum incidunt eius quae
                repellendus maiores. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Ipsum, quaerat! In, pariatur aperiam non
                tempora commodi fugit expedita modi minus enim sapiente
                perspiciatis natus qui nam? Veritatis harum ipsa pariatur,
                corporis tempora voluptas illo et veniam! Quo eos ea deserunt.
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
              <img src="https://i.pcmag.com/imagery/roundups/06PrCnKwZ4IEdw5J7cYtmlg-2.fit_lim.size_1050x.jpg" alt="" className="mission__img"/>
            </div>
            <h2 className="mission__title title">Mission</h2>
            <p className="mission__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              tempora cupiditate enim aliquam blanditiis recusandae quasi quia
              facere. Porro, magnam optio? Qui, obcaecati quaerat? In labore
              aspernatur nobis ullam expedita assumenda, earum molestiae laborum
              ex totam nesciunt at id eum harum consequatur, molestias sequi a
              nemo commodi unde minus adipisci. Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Modi blanditiis quae eaque pariatur
              iure incidunt molestias architecto delectus! Expedita, mollitia.
            </p>
          </div>
        </div>
      </section>

      <section className="team">
        <div className="container">
          <div className="team__wrapper">
            <h2 className="team__title title">Crew</h2>
            <ul className="team__list">
              <li className="team__item">
                <img src="http://static.everypixel.com/ep-pixabay/0167/6119/0102/65563/1676119010265563032-man.jpg" alt="" className="team__image"/>
                <div className="team__name">Name</div>
                <div className="team__position">manager</div>
              </li>
              <li className="team__item">
                <img src="http://static.everypixel.com/ep-pixabay/0167/6119/0102/65563/1676119010265563032-man.jpg" alt="" className="team__image"/>
                <div className="team__name">Name</div>
                <div className="team__position">manager</div>
              </li>
              <li className="team__item">
                <img src="http://static.everypixel.com/ep-pixabay/0167/6119/0102/65563/1676119010265563032-man.jpg" alt="" className="team__image"/>
                <div className="team__name">Name</div>
                <div className="team__position">manager</div>
              </li>
            </ul>
            <ul className="team__list team__list--second">
              <li className="team__item">
                <img src="http://static.everypixel.com/ep-pixabay/0167/6119/0102/65563/1676119010265563032-man.jpg" alt="" className="team__image"/>
                <div className="team__name">Name</div>
                <div className="team__position">manager</div>
              </li>
              <li className="team__item">
                <img src="http://static.everypixel.com/ep-pixabay/0167/6119/0102/65563/1676119010265563032-man.jpg" alt="" className="team__image"/>
                <div className="team__name">Name</div>
                <div className="team__position">manager</div>
              </li>
              <li className="team__item">
                <img src="http://static.everypixel.com/ep-pixabay/0167/6119/0102/65563/1676119010265563032-man.jpg" alt="" className="team__image"/>
                <div className="team__name">Name</div>
                <div className="team__position">manager</div>
              </li>
              <li className="team__item">
                <img src="http://static.everypixel.com/ep-pixabay/0167/6119/0102/65563/1676119010265563032-man.jpg" alt="" className="team__image"/>
                <div className="team__name">Name</div>
                <div className="team__position">manager</div>
              </li>
              <li className="team__item">
                <img src="http://static.everypixel.com/ep-pixabay/0167/6119/0102/65563/1676119010265563032-man.jpg" alt="" className="team__image"/>
                <div className="team__name">Name</div>
                <div className="team__position">manager</div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="partner">
        <div className="container">
          <h2 className="partner__title title">Partner</h2>
          <ul className="partner__list">
            <li className="partner__item"><img src="https://pbs.twimg.com/profile_images/1227196756036898821/7TX7ZmQ4_400x400.jpg" alt="" className="partner__image"/></li>
            <li className="partner__item"><img src="https://game-tournaments.com/media/logo/t43022.png?91" alt="" className="partner__image"/></li>
            <li className="partner__item"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw3nRr6HLTmOZq_uLX7ErrHyG5poYecNliwmJiRdkRGwSu2t0WvsX7iIRcqvCwq-kgEgY&usqp=CAU" alt="" className="partner__image"/></li>
            <li className="partner__item"><img src="https://image.freepik.com/free-vector/kurokage-samurai-esport-logo_18228-1114.jpg" alt="" className="partner__image"/></li>
            <li className="partner__item"><img src="https://game-tournaments.com/media/logo/t55124.png?85" alt="" className="partner__image"/></li>
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
              <h2 className="career__title title">Career</h2>
              <p className="career__text">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Dolores fugit facere
                itaque quisquam doloremque similique qui in! Unde, nam. Aliquid tempora ab porro
                aspernatur, similique
                molestiae ipsam natus, ullam velit earum obcaecati laboriosam iste quae. Voluptates
                ipsum amet
                praesentium, quibusdam nisi dolor, inventore dolore voluptate, accusamus possimus
                dignissimos nam
                aperiam beatae rerum explicabo. Vel recusandae eius nulla, odit reiciendis numquam?</p>
              <Link className="career__btn" to='/SubmitCvForm'>Invia il tuo CV</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutUsPage;