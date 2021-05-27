import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from "react-router-dom";
import {projectFirestore} from "../../../fireBase";
import {useDataFromFirestoreCMS} from "../../../customHooks/useFirestore";

function CMSContentPageEdit() {
    let publishBtnRef = useRef();
    let cancelBtnRef = useRef();
    // const {currentUser} = useAuthContext();
    // const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
    const history = useHistory();

     const [ITBannerTitle, setITBannerTitle] = useState("");
     const [ITBannerText, setITBannerText] = useState("");
     const [ITSwiper1Title, setITSwiper1Title] = useState("");
     const [ITSwiper2Title, setITSwiper2Title] = useState("");

     const [ENBannerTitle, setENBannerTitle] = useState("");
     const [ENBannerText, setENBannerText] = useState("");
     const [ENSwiper1Title, setENSwiper1Title] = useState("");
     const [ENSwiper2Title, setENSwiper2Title] = useState("");

    const {docsFromHookCMS} = useDataFromFirestoreCMS('web-app-cms');

    let selectedDoc = "";

    useEffect(() => {
        console.log(docsFromHookCMS);
        if (docsFromHookCMS) {
            selectedDoc = docsFromHookCMS.filter(function (doc) {
                return doc.id === "contentPage";
            });
            console.log(selectedDoc);
        }
    });

    useEffect(() => {
        if (selectedDoc !== "") {
            selectedDoc.map(doc => {
                setITBannerTitle(doc.bannerTitle.it);
                setITBannerText(doc.bannerText.it);
                setITSwiper1Title(doc.swiper1.it);
                setITSwiper2Title(doc.swiper2.it);

                setENBannerTitle(doc.bannerTitle.en);
                setENBannerText(doc.bannerText.en);
                setENSwiper1Title(doc.swiper1.en);
                setENSwiper2Title(doc.swiper2.en);

            })
        }
    }, [docsFromHookCMS]);

    const writeToFBCallback = () => {
        const collectionRef = projectFirestore.collection('web-app-cms').doc("contentPage");
        collectionRef.set(
            {
                "bannerText": {
                    "en": ENBannerText,
                    "it": ITBannerText
                },
                "bannerTitle": {
                    "en": ENBannerTitle,
                    "it": ITBannerTitle
                },
                "swiper1": {
                    "en": ENSwiper1Title,
                    "it": ITSwiper1Title
                },
                "swiper2": {
                    "en": ENSwiper2Title,
                    "it": ITSwiper2Title
                }
            })
            .then(() => {
                window.alert("Content edited successfully!");

                return console.log("Content edited successfully!");
            })
            .catch((error) => {
                console.error(error.code + " " + error.message + "" + error.details);
            });
    }

    return (
        <>
            <div style={{paddingTop: "5em important"}}>
                <center><h1>Edit <strong>Content</strong> Page static content:</h1></center>
                <section>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                id="home-tab"
                                data-toggle="tab"
                                href="#tab1"
                                role="tab"
                                aria-controls="home"
                                aria-selected="true"
                            >Italian</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"
                               id="profile-tab"
                               data-toggle="tab"
                               href="#tab2"
                               role="tab"
                               aria-controls="profile"
                               aria-selected="false"
                            >English</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">

                        {/*Tab1*/}
                        <div
                            className="tab-pane fade show active"
                            id="tab1"
                            role="tabpanel"
                            aria-labelledby="home-tab">
                            <div className='form-article__body'>
                                <form className="form-article">

                                    <label className='form-article__label'>
                                        Banner title:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ITBannerTitle}
                                            onChange={
                                                (e)=>setITBannerTitle(e.target.value)
                                            }
                                        ></textarea>
                                    </label>

                                    <label className='form-article__label'>
                                        Banner text:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ITBannerText}
                                            onChange={
                                                (e)=>setITBannerText(e.target.value)
                                            }
                                        ></textarea>
                                    </label>

                                        <label className='form-article__label'>
                                            Swiper 1 title:
                                            <textarea
                                                className='form-article__input'
                                                rows='2'
                                                name="countent"
                                                value={ITSwiper1Title}
                                                onChange={
                                                    (e)=>setITSwiper1Title(e.target.value)
                                                }
                                            ></textarea>
                                        </label>

                                            <label className='form-article__label'>
                                                Swiper 2 title:
                                                <textarea
                                                    className='form-article__input'
                                                    rows='2'
                                                    name="countent"
                                                    value={ITSwiper2Title}
                                                    onChange={
                                                        (e)=>setITSwiper2Title(e.target.value)
                                                    }
                                                ></textarea>
                                    </label>
                                </form>
                            </div>
                        </div>

                        {/*Tab2*/}

                        <div
                            className="tab-pane fade"
                            id="tab2"
                            role="tabpanel"
                            aria-labelledby="profile-tab"
                        >
                            <div className='form-article__body'>
                                <form className="form-article">

                                    <label className='form-article__label'>
                                        Banner text:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ENBannerTitle}
                                            onChange={
                                                (e)=>setENBannerTitle(e.target.value)
                                            }
                                        ></textarea>
                                    </label>

                                    <label className='form-article__label'>
                                        Footer text:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ENBannerText}
                                            onChange={
                                                (e)=>setENBannerText(e.target.value)
                                            }
                                        ></textarea>
                                    </label>

                                    <label className='form-article__label'>
                                        Swiper 1 title:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ENSwiper1Title}
                                            onChange={
                                                (e)=>setENSwiper1Title(e.target.value)
                                            }
                                        ></textarea>
                                    </label>

                                        <label className='form-article__label'>
                                            Swiper 2 title:
                                            <textarea
                                                className='form-article__input'
                                                rows='2'
                                                name="countent"
                                                value={ENSwiper2Title}
                                                onChange={
                                                    (e)=>setENSwiper2Title(e.target.value)
                                                }
                                            ></textarea>
                                        </label>

                                </form>
                            </div>
                        </div>

                        <div className="form-article__box-btn">

                            <button
                                ref={publishBtnRef}
                                className="form-article__btn"
                                onClick={()=>writeToFBCallback()}
                            >
                                Publish
                            </button>

                            <button
                                ref={cancelBtnRef}
                                className="form-article__btn"
                                onClick={() => history.push("/ContentPage")}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default CMSContentPageEdit;