import React, {useRef, useState} from 'react';
import {useHistory} from "react-router-dom";
import {projectFirestore, projectStorage} from "../../../fireBase";

function HomePageEdit() {
    let publishBtnRef = useRef();
    let cancelBtnRef = useRef();
    // const {currentUser} = useAuthContext();
    // const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
    const [error, setError] = useState("");
    const fileTypesArray = ['image/png', 'image/jpeg'];
    const history = useHistory();
    const [ENBanner, setENBanner] = useState('');
    const [ENContactsBanner, setENContactsBanner] = useState('');
    const [ENGameTeamsBanner, setENGameTeamsBanner] = useState('');
    const [ENSalesBanner, setENSalesBanner] = useState('');
    const [ENSponsorship, setENSponsorshipBanner] = useState('');
    const [ENTournamentsBanner, setENTournamentsBanner] = useState('');
    const [ITBanner, setITBanner] = useState('');
    const [ITContactsBanner, setITContactsBanner] = useState('');
    const [ITGameTeamsBanner, setITGameTeamsBanner] = useState('');
    const [ITSalesBanner, setITSalesBanner] = useState('');
    const [ITSponsorship, setITSponsorship] = useState('');
    const [ITTournamentsBanner, setITTournamentsBanner] = useState('');
    const [fileSuccess, setFileSuccess] = useState(false);
    const [uploadedPicFile, setUploadedPicFile] = useState('');
    const [url, setUrl] = useState('');
    const[loading, setLoading] = useState(false);

    async function putFile(File, setterKey){
       try {
            setLoading(true);
            setError("");
            const storageRef = projectStorage.ref('CMS-pictures/homepage').child(File.name);
            storageRef.put(File).on('state_changed', (err) => {
            },  (err) => {
                window.alert(err);
            }, async()=>{
                const finalUrl = await storageRef.getDownloadURL();
                finalUrl!==undefined?setFileSuccess(true):setFileSuccess(false);
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
                    case "ENSponsorship":
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
                    case "ITSponsorship":
                        setITSponsorship(finalUrl);
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
            putFile(uploadedFile, setterKey).then(()=>console.log(url));
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
                        "en": ENSponsorship,
                        "it": ITSponsorship
                    },
                    "tournamentsBanner": {
                        "en": ENTournamentsBanner,
                        "it": ITTournamentsBanner
                    }
                })
                .then(() => {
                    window.alert("Stream added successfully!");
                    return console.log("To streams collection added successfully!");
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
        setITSponsorship("");
        setITTournamentsBanner("");

        const desertRef = projectStorage.ref('CMS-pictures/homepage').child(uploadedPicFile.name);

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
                                    {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url} alt=""/></div> }
                                </div>

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
                                    {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url} alt=""/></div> }
                                </div>

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
                                    {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url} alt=""/></div> }
                                </div>

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
                                    {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url} alt=""/></div> }
                                </div>

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
                                    {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url} alt=""/></div> }
                                </div>

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
                                    {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url} alt=""/></div> }
                                </div>

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
                                    {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url} alt=""/></div> }
                                </div>

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
                                    {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url} alt=""/></div> }
                                </div>

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
                                    {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url} alt=""/></div> }
                                </div>

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
                                    {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url} alt=""/></div> }
                                </div>

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
                                    {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url} alt=""/></div> }
                                </div>

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
                                    {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url} alt=""/></div> }
                                </div>

                            </form>
                        </div>
                    </div>

                    <div className="form-article__box-btn">

                        <button
                            ref={publishBtnRef}
                            className="form-article__btn"
                            onClick={writeToFBCallback}
                        >
                            Publish
                        </button>

                        <button
                            ref={cancelBtnRef}
                            className="form-article__btn"
                            onClick={clearInput}
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

export default HomePageEdit;