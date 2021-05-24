import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from "react-router-dom";
import {projectFirestore, projectStorage} from "../../../fireBase";
import {useDataFromFirestoreCMS} from "../../../customHooks/useFirestore";

function CMSHomePageEdit() {
    let publishBtnRef = useRef();
    let cancelBtnRef = useRef();
    // const {currentUser} = useAuthContext();
    // const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
    const [error, setError] = useState("");
    const fileTypesArray = ['image/png', 'image/jpeg'];
    const history = useHistory();

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

    //Errors
    const [ENBannerUploadError1, setENBannerUploadError1] = useState('');
    const [ENContactsBannerUploadError2, setENContactsBannerUploadError2] = useState('');
    const [ENGameTeamsBannerUploadError3, setENGameTeamsBannerUploadError3] = useState('');
    const [ENSalesBannerUploadError4, setENSalesBannerUploadError4] = useState('');
    const [ENSponsorshipBannerUploadError5, setENSponsorshipBannerUploadError5] = useState('');
    const [ENTournamentsBannerUploadError6, setENTournamentsBannerUploadError6] = useState('');
    const [ITBannerUploadError1, setITBannerUploadError1] = useState('');
    const [ITContactsBannerUploadError2, setITContactsBannerUploadError2] = useState('');
    const [ITGameTeamsBannerUploadError3, setITGameTeamsBannerUploadError3] = useState('');
    const [ITSalesBannerUploadError4, setITSalesBannerUploadError4] = useState('');
    const [ITSponsorshipBannerUploadError5, setITSponsorshipBannerUploadError5] = useState('');
    const [ITTournamentsBannerUploadError6, setITTournamentsBannerUploadError6] = useState('');

    const [ENBannerFileTypeError1, setENBannerFileTypeError1] = useState("");
    const [ENContactsBannerFileTypeError2, setENContactsBannerFileTypeError2] = useState("");
    const [ENGameTeamsBannerFileTypeError3, setENGameTeamsBannerFileTypeError3] = useState("");
    const [ENSalesBannerFileTypeError4, setENSalesBannerFileTypeError4] = useState("");
    const [ENSponsorshipBannerFileTypeError5, setENSponsorshipBannerFileTypeError5] = useState("");
    const [ENTournamentsBannerUrlFileTypeError6, setENTournamentsBannerUrlFileTypeError6] = useState("");
    const [ITBannerFileTypeError1, setITBannerFileTypeError1] = useState("");
    const [ITContactsBannerFileTypeError2, setITContactsBannerFileTypeError2] = useState("");
    const [ITGameTeamsBannerFileTypeError3, setITGameTeamsBannerFileTypeError3] = useState("");
    const [ITSalesBannerFileTypeError4, setITSalesBannerFileTypeError4] = useState("");
    const [ITSponsorshipBannerFileTypeError5, setITSponsorshipBannerFileTypeError5] = useState("");
    const [ITTournamentsBannerUrlFileTypeError6, setITTournamentsBannerUrlFileTypeError6] = useState("");

    //Success
    const [ENBannerFileSuccess1, setFileSuccess1] = useState(false);
    const [ENContactsBannerFileSuccess2, setFileSuccess2] = useState(false);
    const [FileSuccess3, setFileSuccess3] = useState(false);
    const [FileSuccess4, setFileSuccess4] = useState(false);
    const [FileSuccess5, setFileSuccess5] = useState(false);
    const [FileSuccess6, setFileSuccess6] = useState(false);

    //Files
    const [ENBanneruploadedPicFile1,setUploadedPicFile1] = useState();
    const [ENContactsBanneruploadedPicFile2,setUploadedPicFile2] = useState();
    const [uploadedPicFile3,setUploadedPicFile3] = useState();
    const [uploadedPicFile4,setUploadedPicFile4] = useState();
    const [uploadedPicFile5, setUploadedPicFile5] = useState();
    const [uploadedPicFile6, setUploadedPicFile6] = useState();
    const[loading, setLoading] = useState(false);
    const {docsFromHookCMS} = useDataFromFirestoreCMS('web-app-cms');

    //TODO transpose the logic of editTournamentsform
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

    async function putFile(File, setterKey){
       try {
            setLoading(true);
            setError("");
            const storageRef = projectStorage.ref('CMS-pictures/homePage').child(File.name);
            storageRef.put(File).on('state_changed', (err) => {
            },  (err) => {
                window.alert(err);
            }, async()=>{
                const finalUrl = await storageRef.getDownloadURL();
                if(finalUrl!==undefined) {
                    if (setterKey === "ENBanner") {
                        setENBannerFileSuccess(true);
                    }else{
                        setENBannerFileSuccess(false);
                    }
                    if (setterKey === "ENContactsBanner") {
                        setITBannerFileSuccess(true);
                    }else{
                        setITBannerFileSuccess(false);
                    }

                    if (setterKey === "ENGameTeamsBanner") {
                        setAvatar1FileSuccess(true);
                    }else{
                        setAvatar1FileSuccess(false);
                    }
                    if (setterKey === "ENSalesBanner") {
                        setAvatar2FileSuccess(true);
                    }else{
                        setAvatar2FileSuccess(false);
                    }
                    if (setterKey === "ENSponsorshipBanner") {
                        setAvatar3FileSuccess(true);
                    }else{
                        setAvatar3FileSuccess(false);
                    }
                    if (setterKey === "ENTournamentsBanner") {
                        setAvatar4FileSuccess(true);
                    }else{
                        setAvatar4FileSuccess(false);
                    }
                    if (setterKey === "ITBanner") {
                        setAvatar5FileSuccess(true);
                    }else{
                        setAvatar5FileSuccess(false);
                    }
                    if (setterKey === "ITContactsBanner") {
                        setAvatar6FileSuccess(true);
                    }else{
                        setAvatar6FileSuccess(false);
                    }
                    if (setterKey === "ITGameTeamsBanner") {
                        setAvatar7FileSuccess(true);
                    }else{
                        setAvatar7FileSuccess(false);
                    }
                    if (setterKey === "ITSalesBanner") {
                        setAvatar8FileSuccess(true);
                    }else{
                        setAvatar8FileSuccess(false);
                    }
                    if (setterKey === "ITSponsorshipBanner") {
                        setPartnerLogo1FileSuccess(true);
                    }else{
                        setPartnerLogo1FileSuccess(false);
                    }
                    if (setterKey === "ITTournamentsBanner") {
                        setPartnerLogo2FileSuccess(true);
                    }else{
                        setPartnerLogo2FileSuccess(false);
                    }
                }
                switch(setterKey){
                    case "ENBanner":
                        setENBanner(finalUrl);
                        break;
                    case "ENContactsBanner":
                        setENContactsBanner(finalUrl);
                        break;
                    case "ENGameTeamsBanner":
                        setENGameTeamsBanner(finalUrl);
                        break;
                    case "ENSalesBanner":
                        setENSalesBanner(finalUrl);
                        break;
                    case "ENSponsorshipBanner":
                        setENSponsorshipBanner(finalUrl);
                        break;
                    case "ENTournamentsBanner":
                        setENTournamentsBanner(finalUrl);
                        break;
                    case "ITBanner":
                        setITBanner(finalUrl);
                        break;
                    case "ITContactsBanner":
                        setITContactsBanner(finalUrl);
                        break;
                    case "ITGameTeamsBanner":
                        setITGameTeamsBanner(finalUrl);
                        break;
                    case "ITSalesBanner":
                        setITSalesBanner(finalUrl);
                        break;
                    case "ITSponsorshipBanner":
                        setITSponsorshipBanner(finalUrl);
                        break;
                    case "ITTournamentsBanner":
                        setITTournamentsBanner(finalUrl);
                        break;
                    default:
                        console.log("None of the above cases worked!");
                    }
            });
        } catch {
            setError("Failed to upload file " + setterKey);
        }
        setLoading(false);
    }

    const fileUploadEventListener = (e, setterKey) => {
        let uploadedFile = e.target.files[0];

        if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
            setUploadedPicFile(uploadedFile);
            putFile(uploadedFile, setterKey).then(()=>console.log("putFile() worked"));
        } else {
            setUploadedPicFile('');
            setError('Please select an image file (png or jpg)');
        }
    };

    const writeToFBCallback = () => {
        const collectionRef = projectFirestore.collection('web-app-cms').doc("homePage");

        if(loading === false) {
            collectionRef.set(
                {
                    "banner": {
                        "en": ENBanner,
                        "it": ITBanner
                    },
                    "contactsBanner": {
                        "en": ENContactsBanner,
                        "it": ITContactsBanner
                    },
                    "gameTeamsBanner": {
                        "en": ENGameTeamsBanner,
                        "it": ITGameTeamsBanner
                    },
                    "salesBanner": {
                        "en": ENSalesBanner,
                        "it": ITSalesBanner
                    },
                    "sponsorship": {
                        "en": ENSponsorshipBanner,
                        "it": ITSponsorshipBanner
                    },
                    "tournamentsBanner": {
                        "en": ENTournamentsBanner,
                        "it": ITTournamentsBanner
                    }
                })
                .then(() => {
                    window.alert("Stream added successfully!");
                })
                .catch((error) => {
                    console.error(error.code + " " + error.message + "" + error.details);
                });
        }
    }

    //Clears all the in puts of the form and deletes the uploaded file:
    const clearInput = () => {
        setENBanner("");
        setENContactsBanner("");
        setENGameTeamsBanner("");
        setENSalesBanner("");
        setENSponsorshipBanner("");
        setENTournamentsBanner("");
        setITBanner("");
        setITContactsBanner("");
        setITGameTeamsBanner("");
        setITSalesBanner("");
        setITSponsorshipBanner("");
        setITTournamentsBanner("");

        const desertRef = projectStorage.ref('CMS-pictures/homePage').child(uploadedPicFile.name);

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
            <center><h1>Edit <strong>Home</strong> Page static content:</h1></center>
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
                                {/*1*/}
                                <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Main banner
                                    <input
                                        className='form-article__btn visually-hidden'
                                        type="file"
                                        required
                                        placeholder='file'
                                        onChange={(e)=>fileUploadEventListener(e, "ITBanner")}
                                    />
                                </label>
                                <div className="output">
                                    { error && <div className="error">{ error }</div>}
                                    {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ITBanner} alt=""/></div> }
                                </div>
                                <div>Current main banner: <img style={{width: "25%", height: "auto"}} src={ITBanner} alt=""/></div>
                                <br/>

                                {/*2*/}
                                <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Tournaments banner
                                    <input
                                        className='form-article__btn visually-hidden'
                                        type="file"
                                        required
                                        placeholder='file'
                                        onChange={(e)=>fileUploadEventListener(e, "ITTournamentsBanner")}
                                    />
                                </label>
                                <div className="output">
                                    { error && <div className="error">{ error }</div>}
                                    {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ITTournamentsBanner} alt=""/></div> }
                                </div>
                                <div>Current main banner: <img style={{width: "25%", height: "auto"}} src={ITTournamentsBanner} alt=""/></div>
                                <br/>

                                {/*3*/}
                                <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Game teams banner
                                    <input
                                        className='form-article__btn visually-hidden'
                                        type="file"
                                        required
                                        placeholder='file'
                                        onChange={(e)=>fileUploadEventListener(e, "ITGameTeamsBanner")}
                                    />
                                </label>
                                <div className="output">
                                    { error && <div className="error">{ error }</div>}
                                    {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ITGameTeamsBanner} alt=""/></div> }
                                </div>
                                <div>Current main banner: <img style={{width: "25%", height: "auto"}} src={ITGameTeamsBanner} alt=""/></div>
                                <br/>

                                {/*4*/}
                                <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> SalesBanner
                                    <input
                                        className='form-article__btn visually-hidden'
                                        type="file"
                                        required
                                        placeholder='file'
                                        onChange={(e)=>fileUploadEventListener(e, "ITSalesBanner")}
                                    />
                                </label>
                                <div className="output">
                                    { error && <div className="error">{ error }</div>}
                                    {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ITSalesBanner} alt=""/></div> }
                                </div>
                                <div>Current sales banner: <img style={{width: "25%", height: "auto"}} src={ITSalesBanner} alt=""/></div>
                                <br/>

                                {/*5*/}
                                <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Sponsorship banner
                                    <input
                                        className='form-article__btn visually-hidden'
                                        type="file"
                                        required
                                        placeholder='file'
                                        onChange={(e)=>fileUploadEventListener(e, "ITSponsorshipBanner")}
                                    />
                                </label>
                                <div className="output">
                                    { error && <div className="error">{ error }</div>}
                                    {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ITSponsorshipBanner} alt=""/></div> }
                                </div>
                                <div>Current sponsorship banner: <img style={{width: "25%", height: "auto"}} src={ITSponsorshipBanner} alt=""/></div>
                                <br/>

                                {/*6*/}
                                <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Contacts banner
                                    <input
                                        className='form-article__btn visually-hidden'
                                        type="file"
                                        required
                                        placeholder='file'
                                        onChange={(e)=>fileUploadEventListener(e, "ITContactsBanner")}
                                    />
                                </label>
                                <div className="output">
                                    { error && <div className="error">{ error }</div>}
                                    {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ITContactsBanner} alt=""/></div> }
                                </div>
                                <div>Current contacts banner: <img style={{width: "25%", height: "auto"}} src={ITContactsBanner} alt=""/></div>
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

                                {/*1*/}
                                <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Main banner
                                    <input
                                        className='form-article__btn visually-hidden'
                                        type="file"
                                        required
                                        placeholder='file'
                                        onChange={(e)=>fileUploadEventListener(e, "ENBanner")}
                                    />
                                </label>
                                <div className="output">
                                    { error && <div className="error">{ error }</div>}
                                    {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ENBanner} alt=""/></div> }
                                </div>
                                <div>Current main banner: <img style={{width: "25%", height: "auto"}} src={ENBanner} alt=""/></div>
                                <br/>

                                {/*2*/}
                                <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Tournaments banner
                                    <input
                                        className='form-article__btn visually-hidden'
                                        type="file"
                                        required
                                        placeholder='file'
                                        onChange={(e)=>fileUploadEventListener(e, "ENTournamentsBanner")}
                                    />
                                </label>
                                <div className="output">
                                    { error && <div className="error">{ error }</div>}
                                    {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ENTournamentsBanner} alt=""/></div> }
                                </div>
                                <div>Current tournaments banner: <img style={{width: "25%", height: "auto"}} src={ENTournamentsBanner} alt=""/></div>
                                <br/>

                                {/*3*/}
                                <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Game teams banner
                                    <input
                                        className='form-article__btn visually-hidden'
                                        type="file"
                                        required
                                        placeholder='file'
                                        onChange={(e)=>fileUploadEventListener(e, "ENGameTeamsBanner")}
                                    />
                                </label>
                                <div className="output">
                                    { error && <div className="error">{ error }</div>}
                                    {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ENGameTeamsBanner} alt=""/></div> }
                                </div>
                                <div>Current game teams banner: <img style={{width: "25%", height: "auto"}} src={ENGameTeamsBanner} alt=""/></div>
                                <br/>

                                {/*4*/}
                                <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> SalesBanner
                                    <input
                                        className='form-article__btn visually-hidden'
                                        type="file"
                                        required
                                        placeholder='file'
                                        onChange={(e)=>fileUploadEventListener(e, "ENSalesBanner")}
                                    />
                                </label>
                                <div className="output">
                                    { error && <div className="error">{ error }</div>}
                                    {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ENSalesBanner} alt=""/></div> }
                                </div>
                                <div>Current sales banner: <img style={{width: "25%", height: "auto"}} src={ENSalesBanner} alt=""/></div>
                                <br/>

                                {/*5*/}
                                <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Sponsorship banner
                                    <input
                                        className='form-article__btn visually-hidden'
                                        type="file"
                                        required
                                        placeholder='file'
                                        onChange={(e)=>fileUploadEventListener(e, "ENSponsorshipBanner")}
                                    />
                                </label>
                                <div className="output">
                                    { error && <div className="error">{ error }</div>}
                                    {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ENSponsorshipBanner} alt=""/></div> }
                                </div>
                                <div>Current sponsorship banner: <img style={{width: "25%", height: "auto"}} src={ENSponsorshipBanner} alt=""/></div>
                                <br/>

                                {/*6*/}
                                <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Contacts banner
                                    <input
                                        className='form-article__btn visually-hidden'
                                        type="file"
                                        required
                                        placeholder='file'
                                        onChange={(e)=>fileUploadEventListener(e, "ENContactsBanner")}
                                    />
                                </label>
                                <div className="output">
                                    { error && <div className="error">{ error }</div>}
                                    {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ENContactsBanner} alt=""/></div> }
                                </div>
                                <div>Current contacts banner: <img style={{width: "25%", height: "auto"}} src={ENContactsBanner} alt=""/></div>
                                <br/>

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

export default CMSHomePageEdit;