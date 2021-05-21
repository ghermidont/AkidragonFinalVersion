import React, {useRef, useState} from 'react';
import {useHistory} from "react-router-dom";
import {projectFirestore, projectStorage} from "../../../fireBase";
import {Avatar} from "@material-ui/core";

function TournamentsPageEdit() {
    let publishBtnRef = useRef();
    let cancelBtnRef = useRef();
    // const {currentUser} = useAuthContext();
    // const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
    const [error, setError] = useState("");
    const fileTypesArray = ['image/png', 'image/jpeg'];
    const history = useHistory();
    const [ENBanner, setENBanner] = useState('');
    const [ITBanner, setITBanner] = useState('');
    const [partner1Url, setPartner1Url ] = useState('');
    const [partner2Url, setPartner2Url ] = useState('');
    const [partner3Url, setPartner3Url ] = useState('');
    const [partner4Url, setPartner4Url ] = useState('');
    const [partner5Url, setPartner5Url ] = useState('');
    const [fileSuccess, setFileSuccess] = useState(false);
    const [ENCareerText, setENCareerText] = useState("");
    const [ITCareerText, setITCareerText] = useState("");
    const [ENCareerTitle, setENCareerTitle] = useState("");
    const [ITCareerTitle, setITCareerTitle] = useState("");
    const [ENCrewTitle, setENCrewTitle] = useState("");
    const [ITCrewTitle, setITCrewTitle] = useState("");
    const [ENMainText, setENMainText] = useState("");
    const [ITMainText, setITMainText] = useState("");
    const [ENPartnersTitle, setENPartnersTitle] = useState("");
    const [ITPartnersTitle, setITPartnersTitle] = useState("");
    const [name1, setName1] = useState("");
    const [avatar1, setAvatar1] = useState("");
    const [ENTitle1, setENTitle1] = useState("");
    const [ITTitle1, setITTitle1] = useState("");
    const [name2, setName2] = useState("");
    const [avatar2, setAvatar2] = useState("");
    const [ENTitle2, setENTitle2] = useState("");
    const [ITTitle2, setITTitle2] = useState("");
    const [name3, setName3] = useState("");
    const [avatar3, setAvatar3] = useState("");
    const [ENTitle3, setENTitle3] = useState("");
    const [ITTitle3, setITTitle3] = useState("");
    const [name4, setName4] = useState("");
    const [avatar4, setAvatar4] = useState("");
    const [ENTitle4, setENTitle4] = useState("");
    const [ITTitle4, setITTitle4] = useState("");
    const [name5, setName5] = useState("");
    const [avatar5, setAvatar5] = useState("");
    const [ENTitle5, setENTitle5] = useState("");
    const [ITTitle5, setITTitle5] = useState("");
    const [name6, setName6] = useState("");
    const [avatar6, setAvatar6] = useState("");
    const [ENTitle6, setENTitle6] = useState("");
    const [ITTitle6, setITTitle6] = useState("");
    const [name7, setName7] = useState("");
    const [avatar7, setAvatar7] = useState("");
    const [ENTitle7, setENTitle7] = useState("");
    const [ITTitle7, setITTitle7] = useState("");
    const [name8, setName8] = useState("");
    const [avatar8, setAvatar8] = useState("");
    const [ENTitle8, setENTitle8] = useState("");
    const [ITTitle8, setITTitle8] = useState("");
    const [ENTitle, setENTitle] = useState("");
    const [ITTitle, setITTitle] = useState("");
    const [ENTitleText, setENTitleText] = useState("");
    const [ITTitleText, setITTitleText] = useState("");
    const [uploadedPicFile, setUploadedPicFile] = useState('');
    //const [url, setUrl] = useState('');
    const[loading, setLoading] = useState(false);

    async function putFile(File, setterKey){
        try {
            setLoading(true);
            setError("");
            const storageRef = projectStorage.ref('CMS-pictures/aboutUsPage').child(File.name);
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
                    case "setPartner1Url":
                        setPartner1Url(finalUrl);
                        break;
                    case "setPartner2Url":
                        setPartner2Url(finalUrl);
                        break;
                    case "setPartner3Url":
                        setPartner3Url(finalUrl);
                        break;
                    case "setPartner4Url":
                        setPartner4Url(finalUrl);
                        break;
                    case "setPartner5Url":
                        setPartner5Url(finalUrl);
                        break;
                    case "setAvatar1":
                        setAvatar1(finalUrl);
                        break;
                    case "setAvatar2":
                        setAvatar2(finalUrl);
                        break;
                    case "setAvatar3":
                        setAvatar3(finalUrl);
                        break;
                    case "setAvatar4":
                        setAvatar4(finalUrl);
                        break;
                    case "setAvatar5":
                        setAvatar5(finalUrl);
                        break;
                    case "setAvatar6":
                        setAvatar6(finalUrl);
                        break;
                    case "setAvatar7":
                        setAvatar7(finalUrl);
                        break;
                    case "setAvatar8":
                        setAvatar8(finalUrl);
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
            putFile(uploadedFile, setterKey).then(()=>console.log("File written!"));
        } else {
            setUploadedPicFile('');
            setError('Please select an image file (png or jpg)');
        }
    };

    const writeToFBCallback = () => {
        const collectionRef = projectFirestore.collection('web-app-cms').doc("aboutUsPage");

        if(loading === false) {
            collectionRef.set(
                {
                    "banner": {
                        "en": ENBanner,
                        "it": ITBanner
                    },
                    "careerText": {
                        "en": ENCareerText,
                        "it": ITCareerText
                    },
                    "careerTitle": {
                        "en": ENCareerTitle,
                        "it": ITCareerTitle
                    },
                    "crewTitle": {
                        "en": ENCrewTitle,
                        "it": ITCrewTitle
                    },
                    "mainText": {
                        "en": ENMainText,
                        "it": ITMainText
                    },
                    "partnersLogos": {
                        "partner1": partner1Url,
                        "partner2": partner2Url,
                        "partner3": partner3Url,
                        "partner4": partner4Url,
                        "partner5": partner5Url,
                    },
                    "partnersTitle": {
                        "en": ENPartnersTitle,
                        "it": ITPartnersTitle
                    },
                    "teamMembers": {
                        "member1": {
                            "name": name1,
                            "photo": avatar1,
                            "title": {
                                "en": ENTitle1,
                                "it": ITTitle1
                            }
                        },
                        "member2": {
                            "name": name2,
                            "photo": avatar2,
                            "title": {
                                "en": ENTitle2,
                                "it": ITTitle2
                            }
                        },
                        "member3": {
                            "name": name3,
                            "photo": avatar3,
                            "title": {
                                "en": ENTitle3,
                                "it": ITTitle3
                            }
                        },
                        "member4": {
                            "name": name4,
                            "photo": avatar4,
                            "title": {
                                "en": ENTitle4,
                                "it": ITTitle4
                            }
                        },
                        "member5": {
                            "name": name5,
                            "photo": avatar5,
                            "title": {
                                "en": ENTitle5,
                                "it": ITTitle5
                            }
                            },
                        "member6": {
                            "name": name6,
                            "photo": avatar6,
                            "title": {
                                "en": ENTitle6,
                                "it": ITTitle6
                            }
                        },
                        "member7": {
                            "name": name7,
                            "photo": avatar7,
                            "title": {
                                "en": ENTitle7,
                                "it": ITTitle7
                            }
                        },
                        "member8": {
                            "name": name8,
                            "photo": avatar8,
                            "title": {
                                "en": ENTitle8,
                                "it": ITTitle8
                            }
                        }
                    },
                    "title": {
                        "en": ENTitle,
                        "it": ITTitle
                    },
                    "titleText": {
                        "en": ENTitleText,
                        "it": ITTitleText
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

        const desertRef = projectStorage.ref('CMS-pictures/aboutUsPage').child(uploadedPicFile.name);

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

                                   <label className='form-article__label'>
                                        Title:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ITTitle}
                                            required
                                            onChange={
                                                (e)=>setITTitle(e.target.value)
                                            }
                                        ></textarea>
                                    </label>

                                    <label className='form-article__label'>
                                        Title text:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ITTitleText}
                                            required
                                            onChange={
                                                (e)=>setITTitleText(e.target.value)
                                            }
                                        ></textarea>
                                    </label>

                                    {/*banner*/}
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

                                    <label className='form-article__label'>
                                        Crew title:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ITCrewTitle}
                                            required
                                            onChange={
                                                (e)=>setITCrewTitle(e.target.value)
                                            }
                                        ></textarea>
                                    </label>

                                    {/*Team members:*/}
                                    {/*Member1*/}
                                    <div>Team members list:</div>
                                    <div>Member 1:</div>
                                    <label className='form-article__label'>
                                       Name:
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            required
                                            value={name1}
                                            onChange={
                                                (e)=>setName1(e.target.value)
                                            }
                                        />
                                    </label>

                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Avatar
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            required
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "Avatar1")}
                                        />
                                    </label>
                                    <div className="output">
                                        { error && <div className="error">{ error }</div>}
                                        {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={avatar1} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Title
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            required
                                            value={ITTitle1}
                                            onChange={
                                                (e)=>setITTitle1(e.target.value)
                                            }
                                        />
                                    </label>

                                    {/*Member2*/}
                                    <div>Member 2:</div>
                                    <label className='form-article__label'>
                                        Name:
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            required
                                            value={name2}
                                            onChange={
                                                (e)=>setName2(e.target.value)
                                            }
                                        />
                                    </label>

                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Avatar
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            required
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "Avatar2")}
                                        />
                                    </label>
                                    <div className="output">
                                        { error && <div className="error">{ error }</div>}
                                        {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={avatar2} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Title
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            required
                                            value={ITTitle2}
                                            onChange={
                                                (e)=>setITTitle2(e.target.value)
                                            }
                                        />
                                    </label>

                                    {/*Member3*/}
                                    <div>Member 3:</div>
                                    <label className='form-article__label'>
                                        Name:
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            required
                                            value={name3}
                                            onChange={
                                                (e)=>setName3(e.target.value)
                                            }
                                        />
                                    </label>

                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Avatar
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            required
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "Avatar3")}
                                        />
                                    </label>
                                    <div className="output">
                                        { error && <div className="error">{ error }</div>}
                                        {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={avatar3} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Title
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            required
                                            value={ITTitle3}
                                            onChange={
                                                (e)=>setITTitle3(e.target.value)
                                            }
                                        />
                                    </label>

                                    {/*Member4*/}
                                    <div>Member 4:</div>
                                    <label className='form-article__label'>
                                        Name:
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            required
                                            value={name4}
                                            onChange={
                                                (e)=>setName4(e.target.value)
                                            }
                                        />
                                    </label>

                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Avatar
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            required
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "Avatar4")}
                                        />
                                    </label>
                                    <div className="output">
                                        { error && <div className="error">{ error }</div>}
                                        {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={avatar4} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Title
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            required
                                            value={ITTitle4}
                                            onChange={
                                                (e)=>setITTitle4(e.target.value)
                                            }
                                        />
                                    </label>

                                    {/*Member5*/}
                                    <div>Member 5:</div>
                                    <label className='form-article__label'>
                                        Name:
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            required
                                            value={name5}
                                            onChange={
                                                (e)=>setName5(e.target.value)
                                            }
                                        />
                                    </label>

                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Avatar
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            required
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "Avatar5")}
                                        />
                                    </label>
                                    <div className="output">
                                        { error && <div className="error">{ error }</div>}
                                        {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={avatar5} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Title
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            required
                                            value={ITTitle5}
                                            onChange={
                                                (e)=>setITTitle5(e.target.value)
                                            }
                                        />
                                    </label>

                                    {/*Member6*/}
                                    <div>Member 6:</div>
                                    <label className='form-article__label'>
                                        Name:
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            required
                                            value={name6}
                                            onChange={
                                                (e)=>setName6(e.target.value)
                                            }
                                        />
                                    </label>

                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Avatar
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            required
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "Avatar6")}
                                        />
                                    </label>
                                    <div className="output">
                                        { error && <div className="error">{ error }</div>}
                                        {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={avatar6} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Title
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            required
                                            value={ITTitle6}
                                            onChange={
                                                (e)=>setITTitle6(e.target.value)
                                            }
                                        />
                                    </label>

                                    {/*Member7*/}
                                    <div>Member 7:</div>
                                    <label className='form-article__label'>
                                        Name:
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            required
                                            value={name7}
                                            onChange={
                                                (e)=>setName7(e.target.value)
                                            }
                                        />
                                    </label>

                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Avatar
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            required
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "Avatar7")}
                                        />
                                    </label>
                                    <div className="output">
                                        { error && <div className="error">{ error }</div>}
                                        {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={avatar7} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Title
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            required
                                            value={ITTitle7}
                                            onChange={
                                                (e)=>setITTitle7(e.target.value)
                                            }
                                        />
                                    </label>

                                    {/*Member8*/}
                                    <div>Member 8:</div>
                                    <label className='form-article__label'>
                                        Name:
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            required
                                            value={name8}
                                            onChange={
                                                (e)=>setName8(e.target.value)
                                            }
                                        />
                                    </label>

                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Avatar
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            required
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "Avatar8")}
                                        />
                                    </label>
                                    <div className="output">
                                        { error && <div className="error">{ error }</div>}
                                        {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={avatar8} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Title
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            required
                                            value={ITTitle8}
                                            onChange={
                                                (e)=>setITTitle8(e.target.value)
                                            }
                                        />
                                    </label>

                                    <label className='form-article__label'>
                                        Partners title:
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            required
                                            value={ITPartnersTitle}
                                            onChange={
                                                (e)=>setITPartnersTitle(e.target.value)
                                            }
                                        />
                                    </label>

                                    <label className='form-article__label'>
                                        Career title:
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            required
                                            value={ITCareerTitle}
                                            onChange={
                                                (e)=>setITCareerTitle(e.target.value)
                                            }
                                        />
                                    </label>

                                    <label className='form-article__label'>
                                        Career text:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ITCareerText}
                                            required
                                            onChange={
                                                (e)=>setITCareerText(e.target.value)
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



                                </form>

                            </div>
                        </div>

                        {/*partners logos*/}
                        <div>
                            {/*1*/}
                            <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Main banner
                                <input
                                    className='form-article__btn visually-hidden'
                                    type="file"
                                    required
                                    placeholder='file'
                                    onChange={(e)=>fileUploadEventListener(e, "setPartner1Url")}
                                />
                            </label>
                            <div className="output">
                                { error && <div className="error">{ error }</div>}
                                {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={partner1Url} alt=""/></div> }
                            </div>

                            {/*2*/}
                            <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Tournaments banner
                                <input
                                    className='form-article__btn visually-hidden'
                                    type="file"
                                    required
                                    placeholder='file'
                                    onChange={(e)=>fileUploadEventListener(e, "partner2Url")}
                                />
                            </label>
                            <div className="output">
                                { error && <div className="error">{ error }</div>}
                                {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={partner2Url} alt=""/></div> }
                            </div>

                            {/*3*/}
                            <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Game teams banner
                                <input
                                    className='form-article__btn visually-hidden'
                                    type="file"
                                    required
                                    placeholder='file'
                                    onChange={(e)=>fileUploadEventListener(e, "partner3Url")}
                                />
                            </label>
                            <div className="output">
                                { error && <div className="error">{ error }</div>}
                                {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={partner3Url} alt=""/></div> }
                            </div>

                            {/*4*/}
                            <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> SalesBanner
                                <input
                                    className='form-article__btn visually-hidden'
                                    type="file"
                                    required
                                    placeholder='file'
                                    onChange={(e)=>fileUploadEventListener(e, "partner4Url")}
                                />
                            </label>
                            <div className="output">
                                { error && <div className="error">{ error }</div>}
                                {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={partner4Url} alt=""/></div> }
                            </div>

                            {/*5*/}
                            <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Sponsorship banner
                                <input
                                    className='form-article__btn visually-hidden'
                                    type="file"
                                    required
                                    placeholder='file'
                                    onChange={(e)=>fileUploadEventListener(e, "partner5Url")}
                                />
                            </label>
                            <div className="output">
                                { error && <div className="error">{ error }</div>}
                                {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={partner5Url} alt=""/></div> }
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

export default TournamentsPageEdit;