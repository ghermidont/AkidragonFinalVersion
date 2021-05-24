import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from "react-router-dom";
import {projectFirestore, projectStorage} from "../../../fireBase";
import {useDataFromFirestoreCMS} from "../../../customHooks/useFirestore";

function CMSTournamentsPageEdit() {
    let publishBtnRef = useRef();
    let cancelBtnRef = useRef();
    // const {currentUser} = useAuthContext();
    // const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
    const [error, setError] = useState("");
    const fileTypesArray = ['image/png', 'image/jpeg'];
    const history = useHistory();
    const [ENBanner, setENBanner] = useState();
    const [ITBanner, setITBanner] = useState('');
    const [ENBannerText, setENBannerText] = useState('');
    const [ITBannerText, setITBannerText] = useState('');
    const [ENFooterMessage, setENFooterMessage] = useState('');
    const [ITFooterMessage, setITFooterMessage] = useState('');
    const [fileSuccess, setFileSuccess] = useState(false);
    const [uploadedPicFile, setUploadedPicFile] = useState('');
    const [url, setUrl] = useState('');
    const[loading, setLoading] = useState(false);
    const {docsFromHookCMS} = useDataFromFirestoreCMS('web-app-cms');

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
                setENBanner(doc.mainBanner.en);
                setITBanner(doc.mainBanner.it);
                setENBannerText(doc.bannerText.en);
                setITBannerText(doc.bannerText.it);
                setENFooterMessage(doc.footerMessage.en);
                setITFooterMessage(doc.footerMessage.it);
            })
        }
    }, [docsFromHookCMS]);

    const fileUploadEventListener = (e) => {
        let uploadedFile = e.target.files[0];
        if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
            setUploadedPicFile(uploadedFile);
            async function putFile(uploadedFile){
                e.preventDefault();
                try {
                    setLoading(true);
                    setError("");
                    const storageRef = projectStorage.ref('CMS-pictures/tournamentsPage').child(uploadedFile.name);
                    storageRef.put(uploadedFile).on('state_changed', (err) => {
                    },  (err) => {
                        window.alert(err);
                    }, async()=>{
                        const finalUrl = await storageRef.getDownloadURL();
                        finalUrl!==undefined?setFileSuccess(true):setFileSuccess(false);
                        setUrl(finalUrl);
                        setLoading(false);
                    });
                } catch {
                    setError("Failed to upload file");
                }
            }
            putFile(uploadedFile).then(()=>console.log(url));
        } else {
            setUploadedPicFile('');
            setError('Please select an image file (png or jpg)');
        }
    };

    const writeToFBCallback = () => {
        const collectionRef = projectFirestore.collection('web-app-cms').doc("tournamentsPage");

        if(loading === false) {
            collectionRef.set(
                {
                    "mainBanner": {
                        "en": ENBanner,
                        "it": ITBanner
                    },
                    "bannerText": {
                        "en": ENBannerText,
                        "it": ITBannerText
                    },
                    "footerMessage": {
                        "en": ENFooterMessage,
                        "it": ITFooterMessage
                    }
                })
                .then(() => {
                    window.alert("Stream added successfully!");
                    history.push("/UserProfilePage", {from: "/CMSMenu"});
                    return console.log("To streams collection added successfully!");
                })
                .catch((error) => {
                    console.error(error.code + " " + error.message + "" + error.details);
                });
        }
    }

    //Clears all the in puts of the form and deletes the uploaded file:
    const clearInput = () => {
        // setENBanner("");
        // setITBanner("");
        // setENBannerText("");
        // setITBannerText("");
        // setENFooterMessage("");
        // setITFooterMessage("");

        const desertRef = uploadedPicFile?projectStorage.ref('CMS-pictures/tournamentsPage').child(uploadedPicFile.name):"";

        if(desertRef){
            desertRef.delete().then(() => {
                console.log("uploaded image removed successfully");
            }).catch((error) => {
                console.log("could not delete the file because:" + error);
            });
        }
        history.push("/UserProfilePage", {from: "/CMSMenu"});
    }

    return (
        <>
            <div style={{paddingTop: "5em important"}}>
                <center><h1>Edit <strong>Tournaments</strong> Page static content:</h1></center>
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
                                    <div>
                                        Current banner:
                                        <img style={{width: "25%", height: "auto"}} src={ITBanner} alt=""/>
                                    </div>
                                    {/*file input*/}
                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Main banner
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            placeholder='file'
                                            onChange={()=>fileUploadEventListener()}
                                        />
                                    </label>
                                    <div className="output">
                                        { error && <div className="error">{ error }</div>}
                                        {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ENBanner} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Banner text:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ITBannerText}
                                            required
                                            onChange={
                                                (e)=>setITBannerText(e.target.value)
                                            }
                                        ></textarea>
                                    </label>

                                    <label className='form-article__label'>
                                        Footer message:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ITFooterMessage}
                                            required
                                            onChange={
                                                (e)=>setITFooterMessage(e.target.value)
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
                                    <div>
                                        Current banner:
                                        <img style={{width: "25%", height: "auto"}} src={ENBanner} alt=""/>
                                    </div>
                                    {/*File*/}
                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Main banner
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener()}
                                        />
                                    </label>
                                    <div className="output">
                                        { error && <div className="error">{ error }</div>}
                                        {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ENBanner} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Content
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ENBannerText}
                                            required
                                            onChange={
                                                (e)=>setENBannerText(e.target.value)
                                            }
                                        ></textarea>
                                    </label>

                                    <label className='form-article__label'>
                                        Content
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ENFooterMessage}
                                            required
                                            onChange={
                                                (e)=>setENFooterMessage(e.target.value)
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
                                onClick={()=>clearInput()}
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

export default CMSTournamentsPageEdit;