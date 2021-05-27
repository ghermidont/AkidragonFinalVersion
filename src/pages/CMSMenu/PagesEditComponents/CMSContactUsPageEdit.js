import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from "react-router-dom";
import {projectFirestore} from "../../../fireBase";
import {useDataFromFirestoreCMS} from "../../../customHooks/useFirestore";

function CMSContactUpPageEdit() {
    let publishBtnRef = useRef();
    let cancelBtnRef = useRef();
    const {docsFromHookCMS} = useDataFromFirestoreCMS('web-app-cms');
    // const {currentUser} = useAuthContext();
    // const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
    const history = useHistory();

    const [ENAddress, setENAddress] = useState("");
    const [ITAddress, setITAddress] = useState("");
    const [ENText, setENText] = useState("");
    const [ITText, setITText] = useState("");
    const [ENTitle, setENTitle] = useState("");
    const [ITTitle, setITTitle] = useState("");
    const [phone, setPhone] = useState("");

    let selectedDoc = "";

    useEffect(() => {
        console.log(docsFromHookCMS);
        if (docsFromHookCMS) {
            selectedDoc = docsFromHookCMS.filter(function (doc) {
                return doc.id === "contactUsPage";
            });
            console.log(selectedDoc);
        }
    });

    useEffect(() => {
        if (selectedDoc !== "") {
            selectedDoc.map(doc => {
                setENAddress(doc.address.en);
                setITAddress(doc.address.it);
                setENText(doc.text.en);
                setITText(doc.text.it);
                setENTitle(doc.title.en);
                setITTitle(doc.title.it);
                setPhone(doc.phone.it);
            })
        }
    }, [docsFromHookCMS]);

    const writeToFBCallback = () => {
        const collectionRef = projectFirestore.collection('web-app-cms').doc("contactUsPage");
        collectionRef.set(
            {
                "address": {
                    "en": ENAddress,
                    "it": ITAddress
                },
                "phone": phone,
                "text": {
                    "en": ENText,
                    "it": ITText
                },

                "title": {
                    "en": ENTitle,
                    "it": ITTitle
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
                <center><h1>Edit <strong>ContactUs</strong> Page static content:</h1></center>
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
                                        Title:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ITTitle}
                                            onChange={
                                                (e)=>setITTitle(e.target.value)
                                            }
                                        ></textarea>
                                    </label>

                                    <label className='form-article__label'>
                                        Text:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ITText}
                                            onChange={
                                                (e)=>setITText(e.target.value)
                                            }
                                        ></textarea>
                                    </label>

                                    <label className='form-article__label'>
                                        Address:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ITAddress}
                                            onChange={
                                                (e)=>setITAddress(e.target.value)
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
                                        Title:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ENTitle}
                                            onChange={
                                                (e)=>setENTitle(e.target.value)
                                            }
                                        ></textarea>
                                    </label>

                                    <label className='form-article__label'>
                                        Text:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ENText}
                                            onChange={
                                                (e)=>setENText(e.target.value)
                                            }
                                        ></textarea>
                                    </label>

                                    <label className='form-article__label'>
                                        Address:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ENAddress}
                                            onChange={
                                                (e)=>setENAddress(e.target.value)
                                            }
                                        ></textarea>
                                    </label>

                                </form>
                            </div>
                        </div>

                        <label className='form-article__label'>
                            Phone number:
                            <textarea
                                className='form-article__input'
                                rows='2'
                                name="countent"
                                value={phone}
                                onChange={
                                    (e)=>setPhone(e.target.value)
                                }
                            ></textarea>
                        </label>

                        <div className="form-article__box-btn">

                            <button
                                ref={publishBtnRef}
                                className="form-article__btn"
                                onClick={()=>writeToFBCallback()}
                            >
                                Publish
                            </button>

                            {/*<button*/}
                            {/*    ref={cancelBtnRef}*/}
                            {/*    className="form-article__btn"*/}
                            {/*    onClick={() => history.push("/ContactUsPage")}*/}
                            {/*>*/}
                            {/*    Cancel*/}
                            {/*</button>*/}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default CMSContactUpPageEdit;