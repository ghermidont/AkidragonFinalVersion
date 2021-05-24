import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from "react-router-dom";
import {projectFirestore, projectStorage} from "../../../fireBase";
import {useDataFromFirestoreCMS} from "../../../customHooks/useFirestore";
import {useAuthContext} from "../../../context/AuthContext";

function CMSAboutUsPageEdit() {
    let publishBtnRef = useRef();
    let cancelBtnRef = useRef();
    const {currentUser} = useAuthContext();
    const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
    //const [error, setError] = useState("");
    const fileTypesArray = ['image/png', 'image/jpeg'];
    const history = useHistory();

    // Files
    const [uploadedPicFileENBanner, setUploadedPicFileENBanner] = useState();
    const [uploadedPicFileITBanner, setUploadedPicFileITBanner] = useState();

    const [uploadedPicFileAvatar1, setUploadedPicFileAvatar1] = useState();
    const [uploadedPicFileAvatar2, setUploadedPicFileAvatar2] = useState();
    const [uploadedPicFileAvatar3, setUploadedPicFileAvatar3] = useState();
    const [uploadedPicFileAvatar4, setUploadedPicFileAvatar4] = useState();
    const [uploadedPicFileAvatar5, setUploadedPicFileAvatar5] = useState();
    const [uploadedPicFileAvatar6, setUploadedPicFileAvatar6] = useState();
    const [uploadedPicFileAvatar7, setUploadedPicFileAvatar7] = useState();
    const [uploadedPicFileAvatar8, setUploadedPicFileAvatar8] = useState();

    const [uploadedPicFilePartnerLogo1, setUploadedPicFilePartnerLogo1] = useState();
    const [uploadedPicFilePartnerLogo2, setUploadedPicFilePartnerLogo2] = useState();
    const [uploadedPicFilePartnerLogo3, setUploadedPicFilePartnerLogo3] = useState();
    const [uploadedPicFilePartnerLogo4, setUploadedPicFilePartnerLogo4] = useState();
    const [uploadedPicFilePartnerLogo5, setUploadedPicFilePartnerLogo5] = useState();

    // Errors
    const [picFileENBannerUploadError, setPicFileENBannerUploadError] = useState(null);
    const [picFileITBannerUploadError, setPicFileITBannerUploadError] = useState(null);

    const [picFileAvatarUploadError1, setPicFileAvatarUploadError1] = useState();
    const [picFileAvatarUploadError2, setPicFileAvatarUploadError2] = useState();
    const [picFileAvatarUploadError3, setPicFileAvatarUploadError3] = useState();
    const [picFileAvatarUploadError4, setPicFileAvatarUploadError4] = useState();
    const [picFileAvatarUploadError5, setPicFileAvatarUploadError5] = useState();
    const [picFileAvatarUploadError6, setPicFileAvatarUploadError6] = useState();
    const [picFileAvatarUploadError7, setPicFileAvatarUploadError7] = useState();
    const [picFileAvatarUploadError8, setPicFileAvatarUploadError8] = useState();

    const [picFilePartnerLogoUploadError1, setPicFilePartnerLogoUploadError1] = useState();
    const [picFilePartnerLogoUploadError2, setPicFilePartnerLogoUploadError2] = useState();
    const [picFilePartnerLogoUploadError3, setPicFilePartnerLogoUploadError3] = useState();
    const [picFilePartnerLogoUploadError4, setPicFilePartnerLogoUploadError4] = useState();
    const [picFilePartnerLogoUploadError5, setPicFilePartnerLogoUploadError5] = useState();

    const [picFileENFileTypeError, setPicFileENFileTypeError] = useState('');
    const [picFileITFileTypeError, setPicFileITFileTypeError] = useState('');

    const [picFileAvatarFileTypeError1, setPicFileAvatarFileTypeError1] = useState();
    const [picFileAvatarFileTypeError2, setPicFileAvatarFileTypeError2] = useState();
    const [picFileAvatarFileTypeError3, setPicFileAvatarFileTypeError3] = useState();
    const [picFileAvatarFileTypeError4, setPicFileAvatarFileTypeError4] = useState();
    const [picFileAvatarFileTypeError5, setPicFileAvatarFileTypeError5] = useState();
    const [picFileAvatarFileTypeError6, setPicFileAvatarFileTypeError6] = useState();
    const [picFileAvatarFileTypeError7, setPicFileAvatarFileTypeError7] = useState();
    const [picFileAvatarFileTypeError8, setPicFileAvatarFileTypeError8] = useState();

    const [picFilePartnerLogoFileTypeError1, setPicFilePartnerLogoFileTypeError1] = useState();
    const [picFilePartnerLogoFileTypeError2, setPicFilePartnerLogoFileTypeError2] = useState();
    const [picFilePartnerLogoFileTypeError3, setPicFilePartnerLogoFileTypeError3] = useState();
    const [picFilePartnerLogoFileTypeError4, setPicFilePartnerLogoFileTypeError4] = useState();
    const [picFilePartnerLogoFileTypeError5, setPicFilePartnerLogoFileTypeError5] = useState();

    // Urls
    const [ENBannerUrl, setENBannerUrl] = useState('');
    const [ITBannerUrl, setITBannerUrl] = useState('');

    const [partnerLogo1Url, setPartnerLogo1Url] = useState('');
    const [partnerLogo2Url, setPartnerLogo2Url] = useState('');
    const [partnerLogo3Url, setPartnerLogo3Url] = useState('');
    const [partnerLogo4Url, setPartnerLogo4Url] = useState('');
    const [partnerLogo5Url, setPartnerLogo5Url] = useState('');

    const [avatar1Url, setAvatar1Url] = useState("");
    const [avatar2Url, setAvatar2Url] = useState("");
    const [avatar3Url, setAvatar3Url] = useState("");
    const [avatar4Url, setAvatar4Url] = useState("");
    const [avatar5Url, setAvatar5Url] = useState("");
    const [avatar6Url, setAvatar6Url] = useState("");
    const [avatar7Url, setAvatar7Url] = useState("");
    const [avatar8Url, setAvatar8Url] = useState("");

    // Success
    const [ENBannerFileSuccess, setENBannerFileSuccess] = useState(false);
    const [ITBannerFileSuccess, setITBannerFileSuccess] = useState(false);

    const [avatar1FileSuccess, setAvatar1FileSuccess] = useState(false);
    const [avatar2FileSuccess, setAvatar2FileSuccess] = useState(false);
    const [avatar3FileSuccess, setAvatar3FileSuccess] = useState(false);
    const [avatar4FileSuccess, setAvatar4FileSuccess] = useState(false);
    const [avatar5FileSuccess, setAvatar5FileSuccess] = useState(false);
    const [avatar6FileSuccess, setAvatar6FileSuccess] = useState(false);
    const [avatar7FileSuccess, setAvatar7FileSuccess] = useState(false);
    const [avatar8FileSuccess, setAvatar8FileSuccess] = useState(false);

    const [partnerLogo1FileSuccess, setPartnerLogo1FileSuccess] = useState(false);
    const [partnerLogo2FileSuccess, setPartnerLogo2FileSuccess] = useState(false);
    const [partnerLogo3FileSuccess, setPartnerLogo3FileSuccess] = useState(false);
    const [partnerLogo4FileSuccess, setPartnerLogo4FileSuccess] = useState(false);
    const [partnerLogo5FileSuccess, setPartnerLogo5FileSuccess] = useState(false);

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

    const {docsFromHookCMS} = useDataFromFirestoreCMS('web-app-cms');
    //const [url, setUrl] = useState('');
    //const[loading, setLoading] = useState(false);
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

                setAvatar1Url(doc.teamMembers.member1.photo);
                setAvatar2Url(doc.teamMembers.member2.photo);
                setAvatar3Url(doc.teamMembers.member3.photo);
                setAvatar4Url(doc.teamMembers.member4.photo);
                setAvatar5Url(doc.teamMembers.member5.photo);
                setAvatar6Url(doc.teamMembers.member6.photo);
                setAvatar7Url(doc.teamMembers.member7.photo);
                setAvatar8Url(doc.teamMembers.member8.photo);

                setENCareerTitle(doc.careerTitle.en);
                setITCareerTitle(doc.careerTitle.it);
                setENCareerText(doc.careerText.en);
                setITCareerText(doc.careerText.it);

                setENCrewTitle(doc.crewTitle.en);
                setITCrewTitle(doc.crewTitle.it);

                setENMissionText(doc.mainText.en);
                setENMissionText(doc.mainText.it);

                setPartnerLogo1Url(doc.partnersLogos.partner1);
                setPartnerLogo2Url(doc.partnersLogos.partner2);
                setPartnerLogo3Url(doc.partnersLogos.partner3);
                setPartnerLogo4Url(doc.partnersLogos.partner4);
                setPartnerLogo5Url(doc.partnersLogos.partner5);

                setENPartnersTitle(doc.partnersTitle.en);
                setITPartnersTitle(doc.partnersTitle.it);

                setName1(doc.member1.name);
                setName2(doc.member2.name);
                setName3(doc.member3.name);
                setName4(doc.member4.name);
                setName5(doc.member5.name);
                setName6(doc.member6.name);
                setName7(doc.member7.name);
                setName8(doc.member8.name);

                setENPositionName1(doc.member1.title.en);
                setITPositionName1(doc.member1.title.it);
                setENPositionName2(doc.member2.title.en);
                setITPositionName2(doc.member2.title.it);
                setENPositionName3(doc.member3.title.en);
                setITPositionName3(doc.member3.title.it);
                setENPositionName4(doc.member4.title.en);
                setITPositionName4(doc.member4.title.it);
                setENPositionName5(doc.member5.title.en);
                setITPositionName5(doc.member5.title.it);
                setENPositionName6(doc.member6.title.en);
                setITPositionName6(doc.member6.title.it);
                setENPositionName7(doc.member7.title.en);
                setITPositionName7(doc.member7.title.it);
                setENPositionName8(doc.member8.title.en);
                setITPositionName8(doc.member8.title.it);

            })
        }
    }, [docsFromHookCMS]);

    async function putFile(File, setterKey){
        try {
            //setLoading(true);
            //setError("");
            const storageRef = projectStorage.ref('CMS-pictures/aboutUsPage').child(File.name);
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
                    if (setterKey === "ITBanner") {
                        setITBannerFileSuccess(true);
                    }else{
                        setITBannerFileSuccess(false);
                    }

                    if (setterKey === "avatar1") {
                        setAvatar1FileSuccess(true);
                    }else{
                        setAvatar1FileSuccess(false);
                    }
                    if (setterKey === "avatar2") {
                        setAvatar2FileSuccess(true);
                    }else{
                        setAvatar2FileSuccess(false);
                    }
                    if (setterKey === "avatar3") {
                        setAvatar3FileSuccess(true);
                    }else{
                        setAvatar3FileSuccess(false);
                    }
                    if (setterKey === "avatar4") {
                        setAvatar4FileSuccess(true);
                    }else{
                        setAvatar4FileSuccess(false);
                    }
                    if (setterKey === "avatar5") {
                        setAvatar5FileSuccess(true);
                    }else{
                        setAvatar5FileSuccess(false);
                    }
                    if (setterKey === "avatar6") {
                        setAvatar6FileSuccess(true);
                    }else{
                        setAvatar6FileSuccess(false);
                    }
                    if (setterKey === "avatar7") {
                        setAvatar7FileSuccess(true);
                    }else{
                        setAvatar7FileSuccess(false);
                    }
                    if (setterKey === "avatar8") {
                        setAvatar8FileSuccess(true);
                    }else{
                        setAvatar8FileSuccess(false);
                    }

                    if (setterKey === "partnerLogo1") {
                        setPartnerLogo1FileSuccess(true);
                    }else{
                        setPartnerLogo1FileSuccess(false);
                    }
                    if (setterKey === "partnerLogo2") {
                        setPartnerLogo2FileSuccess(true);
                    }else{
                        setPartnerLogo2FileSuccess(false);
                    }
                    if (setterKey === "partnerLogo3") {
                        setPartnerLogo3FileSuccess(true);
                    }else{
                        setPartnerLogo3FileSuccess(false);
                    }
                    if (setterKey === "partnerLogo4") {
                        setPartnerLogo4FileSuccess(true);
                    }else{
                        setPartnerLogo4FileSuccess(false);
                    }
                    if (setterKey === "partnerLogo5") {
                        setPartnerLogo5FileSuccess(true);
                    }else{
                        setPartnerLogo5FileSuccess(false);
                    }
                }

                switch(setterKey){
                    case "ENBanner":
                        setENBannerUrl(finalUrl);
                        break;
                    case "ITBanner":
                        setITBannerUrl(finalUrl);
                        break;
                    case "partnerLogo1":
                        setPartnerLogo1Url(finalUrl);
                        break;
                    case "partnerLogo2":
                        setPartnerLogo2Url(finalUrl);
                        break;
                    case "partnerLogo3":
                        setPartnerLogo3Url(finalUrl);
                        break;
                    case "partnerLogo4":
                        setPartnerLogo4Url(finalUrl);
                        break;
                    case "partnerLogo5":
                        setPartnerLogo5Url(finalUrl);
                        break;
                    case "avatar1":
                        setAvatar1Url(finalUrl);
                        break;
                    case "avatar2":
                        setAvatar2Url(finalUrl);
                        break;
                    case "avatar3":
                        setAvatar3Url(finalUrl);
                        break;
                    case "avatar4":
                        setAvatar4Url(finalUrl);
                        break;
                    case "avatar5":
                        setAvatar5Url(finalUrl);
                        break;
                    case "avatar6":
                        setAvatar6Url(finalUrl);
                        break;
                    case "avatar7":
                        setAvatar7Url(finalUrl);
                        break;
                    case "avatar8":
                        setAvatar8Url(finalUrl);
                        break;
                    default:
                        console.log("None of the above cases worked!");
                }
            });
        } catch {
            if (setterKey === "ENBanner") {
                setPicFileENBannerUploadError("Failed to upload file " + setterKey);
            } else if (setterKey ===  "ITBanner") {
                setPicFileITBannerUploadError("Failed to upload file " + setterKey);
            } else if (setterKey ===  "partnerLogo1") {
                setPicFilePartnerLogoUploadError1("Failed to upload file " + setterKey);
            } else if (setterKey ===  "partnerLogo2") {
                setPicFilePartnerLogoUploadError2("Failed to upload file " + setterKey);
            } else if (setterKey ===  "partnerLogo3") {
                setPicFilePartnerLogoUploadError3("Failed to upload file " + setterKey);
            } else if (setterKey === "partnerLogo4") {
                setPicFilePartnerLogoUploadError4("Failed to upload file " + setterKey);
            } else if (setterKey === "partnerLogo5") {
                setPicFilePartnerLogoUploadError5("Failed to upload file " + setterKey);
            } else if (setterKey === "avatar1") {
                setPicFileAvatarUploadError1("Failed to upload file " + setterKey);
            } else if (setterKey === "avatar2") {
                setPicFileAvatarUploadError2("Failed to upload file " + setterKey);
            } else if (setterKey === "avatar3") {
                setPicFileAvatarUploadError3("Failed to upload file " + setterKey);
            } else if (setterKey === "avatar4") {
                setPicFileAvatarUploadError4("Failed to upload file " + setterKey);
            } else if (setterKey === "avatar5") {
                setPicFileAvatarUploadError5("Failed to upload file " + setterKey);
            } else if (setterKey === "avatar6") {
                setPicFileAvatarUploadError6("Failed to upload file " + setterKey);
            } else if (setterKey === "avatar7") {
                setPicFileAvatarUploadError7("Failed to upload file " + setterKey);
            } else if (setterKey === "avatar8") {
                setPicFileAvatarUploadError8("Failed to upload file " + setterKey);
            }
        }
        //setLoading(false);
    }

    const fileUploadEventListener = (e, setterKey) => {
        let uploadedFile = e.target.files[0];
        if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
            if (setterKey === "ENBanner") {
                setUploadedPicFileENBanner(uploadedFile);
                putFile(uploadedPicFileENBanner, setterKey).then(()=>console.log("putFile() worked"));
            } else if (setterKey === "ITBanner") {
                setUploadedPicFileITBanner(uploadedFile);
                putFile(uploadedPicFileITBanner, setterKey).then(()=>console.log("putFile() worked"));
            } else if (setterKey ===  "partnerLogo1") {
                setUploadedPicFilePartnerLogo1(uploadedFile);
                putFile(uploadedPicFilePartnerLogo1, setterKey).then(()=>console.log("putFile() worked"));
            } else if (setterKey === "partnerLogo2") {
                setUploadedPicFilePartnerLogo2(uploadedFile);
                putFile(uploadedPicFilePartnerLogo2, setterKey).then(()=>console.log("putFile() worked"));
            } else if (setterKey === "partnerLogo3") {
                setUploadedPicFilePartnerLogo3(uploadedFile);
                putFile(uploadedPicFilePartnerLogo3, setterKey).then(()=>console.log("putFile() worked"));
            } else if (setterKey === "partnerLogo4") {
                setUploadedPicFilePartnerLogo4(uploadedFile);
                putFile(uploadedPicFilePartnerLogo4, setterKey).then(()=>console.log("putFile() worked"));
            } else if (setterKey === "partnerLogo5") {
                setUploadedPicFilePartnerLogo5(uploadedFile);
                putFile(uploadedPicFilePartnerLogo5, setterKey).then(()=>console.log("putFile() worked"));
            } else if (setterKey === "avatar1") {
                setUploadedPicFileAvatar1(uploadedFile);
                putFile(uploadedPicFileAvatar1, setterKey).then(()=>console.log("putFile() worked"));
            } else if (setterKey === "avatar2") {
                setUploadedPicFileAvatar2(uploadedFile);
                putFile(uploadedPicFileAvatar2, setterKey).then(()=>console.log("putFile() worked"));
            } else if (setterKey === "avatar3") {
                setUploadedPicFileAvatar3(uploadedFile);
                putFile(uploadedPicFileAvatar3, setterKey).then(()=>console.log("putFile() worked"));
            } else if (setterKey === "avatar4") {
                setUploadedPicFileAvatar4(uploadedFile);
                putFile(uploadedPicFileAvatar4, setterKey).then(()=>console.log("putFile() worked"));
            } else if (setterKey === "avatar5") {
                setUploadedPicFileAvatar5(uploadedFile);
                putFile(uploadedPicFileAvatar5, setterKey).then(()=>console.log("putFile() worked"));
            } else if (setterKey === "avatar6") {
                setUploadedPicFileAvatar6(uploadedFile);
                putFile(uploadedPicFileAvatar6, setterKey).then(()=>console.log("putFile() worked"));
            } else if (setterKey === "avatar7") {
                setUploadedPicFileAvatar7(uploadedFile);
                putFile(uploadedPicFileAvatar7, setterKey).then(()=>console.log("putFile() worked"));
            } else if (setterKey === "avatar8") {
                setUploadedPicFileAvatar8(uploadedFile);
                putFile(uploadedPicFileAvatar8, setterKey).then(()=>console.log("putFile() worked"));
            }
        } else {
            if (setterKey === "ENBanner") {
                setPicFileENFileTypeError('Please select an image file (png or jpg)');
                uploadedPicFileENBanner('');
            } else if (setterKey === "ITBanner") {
                setPicFileITFileTypeError('Please select an image file (png or jpg)');
                uploadedPicFileITBanner('');
            } else if (setterKey ===  "partnerLogo1") {
                setPicFilePartnerLogoFileTypeError1('Please select an image file (png or jpg)');
                setUploadedPicFilePartnerLogo1('');
            } else if (setterKey === "partnerLogo2") {
                setPicFilePartnerLogoFileTypeError2('Please select an image file (png or jpg)');
                setUploadedPicFilePartnerLogo2('');
            } else if (setterKey === "partnerLogo3") {
                setPicFilePartnerLogoFileTypeError3('Please select an image file (png or jpg)');
                setUploadedPicFilePartnerLogo3('');
            } else if (setterKey === "partnerLogo4") {
                setPicFilePartnerLogoFileTypeError4('Please select an image file (png or jpg)');
                setUploadedPicFilePartnerLogo4('');
            } else if (setterKey === "partnerLogo5") {
                setPicFilePartnerLogoFileTypeError5('Please select an image file (png or jpg)');
                setUploadedPicFilePartnerLogo5('');
            } else if (setterKey === "avatar1") {
                setPicFileAvatarFileTypeError1('Please select an image file (png or jpg)');
                setUploadedPicFileAvatar1('');
            } else if (setterKey === "avatar2") {
                setPicFileAvatarFileTypeError2('Please select an image file (png or jpg)');
                setUploadedPicFileAvatar2('');
            } else if (setterKey === "avatar3") {
                setPicFileAvatarFileTypeError3('Please select an image file (png or jpg)');
                setUploadedPicFileAvatar3('');
            } else if (setterKey === "avatar4") {
                setPicFileAvatarFileTypeError4('Please select an image file (png or jpg)');
                setUploadedPicFileAvatar4('');
            } else if (setterKey === "avatar5") {
                setPicFileAvatarFileTypeError5('Please select an image file (png or jpg)');
                setUploadedPicFileAvatar5('');
            } else if (setterKey === "avatar6") {
                setPicFileAvatarFileTypeError6('Please select an image file (png or jpg)');
                setUploadedPicFileAvatar6('');
            } else if (setterKey === "avatar7") {
                setPicFileAvatarFileTypeError7('Please select an image file (png or jpg)');
                setUploadedPicFileAvatar7('');
            } else if (setterKey === "avatar8") {
                setPicFileAvatarFileTypeError8('Please select an image file (png or jpg)');
                setUploadedPicFileAvatar8('');
            }
        }
    };

    const clearInput = () => {
        const storageRef1 = uploadedPicFileENBanner?projectStorage.ref(`CMS-pictures/aboutUsPage/${currentUser.uid||CurrentUserFromLS.uid}`).child(uploadedPicFileENBanner.name):"";
        const storageRef2 = uploadedPicFileITBanner?projectStorage.ref(`CMS-pictures/aboutUsPage/${currentUser.uid||CurrentUserFromLS.uid}`).child(uploadedPicFileITBanner.name):"";
        const storageRef3 = setUploadedPicFileAvatar1?projectStorage.ref(`CMS-pictures/aboutUsPage/${currentUser.uid||CurrentUserFromLS.uid}`).child(setUploadedPicFileAvatar1.name):"";
        const storageRef4 = setUploadedPicFileAvatar2?projectStorage.ref(`CMS-pictures/aboutUsPage/${currentUser.uid||CurrentUserFromLS.uid}`).child(setUploadedPicFileAvatar2.name):"";
        const storageRef5 = setUploadedPicFileAvatar3?projectStorage.ref(`CMS-pictures/aboutUsPage/${currentUser.uid||CurrentUserFromLS.uid}`).child(setUploadedPicFileAvatar3.name):"";
        const storageRef6 = setUploadedPicFileAvatar4?projectStorage.ref(`CMS-pictures/aboutUsPage/${currentUser.uid||CurrentUserFromLS.uid}`).child(setUploadedPicFileAvatar4.name):"";
        const storageRef7 = setUploadedPicFileAvatar5?projectStorage.ref(`CMS-pictures/aboutUsPage/${currentUser.uid||CurrentUserFromLS.uid}`).child(setUploadedPicFileAvatar5.name):"";
        const storageRef8 = setUploadedPicFileAvatar6?projectStorage.ref(`CMS-pictures/aboutUsPage/${currentUser.uid||CurrentUserFromLS.uid}`).child(setUploadedPicFileAvatar6.name):"";
        const storageRef9 = setUploadedPicFileAvatar7?projectStorage.ref(`CMS-pictures/aboutUsPage/${currentUser.uid||CurrentUserFromLS.uid}`).child(setUploadedPicFileAvatar7.name):"";
        const storageRef10 = setUploadedPicFileAvatar8?projectStorage.ref(`CMS-pictures/aboutUsPage/${currentUser.uid||CurrentUserFromLS.uid}`).child(setUploadedPicFileAvatar8.name):"";
        const storageRef11 = uploadedPicFilePartnerLogo1?projectStorage.ref(`CMS-pictures/aboutUsPage/${currentUser.uid||CurrentUserFromLS.uid}`).child(uploadedPicFilePartnerLogo1.name):"";
        const storageRef12 = uploadedPicFilePartnerLogo2?projectStorage.ref(`CMS-pictures/aboutUsPage/${currentUser.uid||CurrentUserFromLS.uid}`).child(uploadedPicFilePartnerLogo2.name):"";
        const storageRef13 = uploadedPicFilePartnerLogo3?projectStorage.ref(`CMS-pictures/aboutUsPage/${currentUser.uid||CurrentUserFromLS.uid}`).child(uploadedPicFilePartnerLogo3.name):"";
        const storageRef14 = uploadedPicFilePartnerLogo4?projectStorage.ref(`CMS-pictures/aboutUsPage/${currentUser.uid||CurrentUserFromLS.uid}`).child(uploadedPicFilePartnerLogo4.name):"";
        const storageRef15 = uploadedPicFilePartnerLogo5?projectStorage.ref(`CMS-pictures/aboutUsPage/${currentUser.uid||CurrentUserFromLS.uid}`).child(uploadedPicFilePartnerLogo5.name):"";

        if(storageRef1){
            storageRef1.delete().then(() => {
                console.log("uploaded image removed successfully");
            }).catch((error) => {
                console.log("could not delete the file because:" + error);
            });
        }

        if(storageRef2){
            storageRef2.delete().then(() => {
                console.log("uploaded image removed successfully");
            }).catch((error) => {
                console.log("could not delete the file because:" + error);
            });
        }

        if(storageRef3){
            storageRef3.delete().then(() => {
                console.log("uploaded image removed successfully");
            }).catch((error) => {
                console.log("could not delete the file because:" + error);
            });
        }

        if(storageRef4){
            storageRef4.delete().then(() => {
                console.log("uploaded image removed successfully");
            }).catch((error) => {
                console.log("could not delete the file because:" + error);
            });
        }

        if(storageRef5){
            storageRef5.delete().then(() => {
                console.log("uploaded image removed successfully");
            }).catch((error) => {
                console.log("could not delete the file because:" + error);
            });
        }

        if(storageRef6){
            storageRef6.delete().then(() => {
                console.log("uploaded image removed successfully");
            }).catch((error) => {
                console.log("could not delete the file because:" + error);
            });
        }

        if(storageRef7){
            storageRef7.delete().then(() => {
                console.log("uploaded image removed successfully");
            }).catch((error) => {
                console.log("could not delete the file because:" + error);
            });
        }

        if(storageRef8){
            storageRef8.delete().then(() => {
                console.log("uploaded image removed successfully");
            }).catch((error) => {
                console.log("could not delete the file because:" + error);
            });
        }

        if(storageRef9){
            storageRef9.delete().then(() => {
                console.log("uploaded image removed successfully");
            }).catch((error) => {
                console.log("could not delete the file because:" + error);
            });
        }

        if(storageRef10){
            storageRef10.delete().then(() => {
                console.log("uploaded image removed successfully");
            }).catch((error) => {
                console.log("could not delete the file because:" + error);
            });
        }

        if(storageRef11){
            storageRef11.delete().then(() => {
                console.log("uploaded image removed successfully");
            }).catch((error) => {
                console.log("could not delete the file because:" + error);
            });
        }

        if(storageRef12){
            storageRef12.delete().then(() => {
                console.log("uploaded image removed successfully");
            }).catch((error) => {
                console.log("could not delete the file because:" + error);
            });
        }

        if(storageRef13){
            storageRef13.delete().then(() => {
                console.log("uploaded image removed successfully");
            }).catch((error) => {
                console.log("could not delete the file because:" + error);
            });
        }

        if(storageRef14){
            storageRef14.delete().then(() => {
                console.log("uploaded image removed successfully");
            }).catch((error) => {
                console.log("could not delete the file because:" + error);
            });
        }

        if(storageRef15){
            storageRef15.delete().then(() => {
                console.log("uploaded image removed successfully");
            }).catch((error) => {
                console.log("could not delete the file because:" + error);
            });
        }

        history.push("/UserProfilePage", {from: "/CMSMenu"});
    }

    const writeToFBCallback = () => {
        const collectionRef = projectFirestore.collection('web-app-cms').doc("aboutUsPage");

        // if(loading === false) {
            collectionRef.set(
                {
                    "banner": {
                        "en": ENBannerUrl,
                        "it": ITBannerUrl
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
                    "missionText": {
                        "en": ENMissionText,
                        "it": ITMissionText
                    },
                    "missionTitle": {
                        "en": ENMissionTitle,
                        "it": ITMissionTitle
                    },
                    "partnersLogos": {
                        "partner1": partnerLogo1Url,
                        "partner2": partnerLogo2Url,
                        "partner3": partnerLogo3Url,
                        "partner4": partnerLogo4Url,
                        "partner5": partnerLogo5Url,
                    },
                    "partnersTitle": {
                        "en": ENPartnersTitle,
                        "it": ITPartnersTitle
                    },
                    "teamMembers": {
                        "member1": {
                            "name": name1,
                            "photo": avatar1Url,
                            "title": {
                                "en": ENPositionName1,
                                "it": ITPositionName1
                            }
                        },
                        "member2": {
                            "name": name2,
                            "photo": avatar2Url,
                            "title": {
                                "en": ENPositionName2,
                                "it": ITPositionName2
                            }
                        },
                        "member3": {
                            "name": name3,
                            "photo": avatar3Url,
                            "title": {
                                "en": ENPositionName3,
                                "it": ITPositionName3
                            }
                        },
                        "member4": {
                            "name": name4,
                            "photo": avatar4Url,
                            "title": {
                                "en": ENPositionName4,
                                "it": ITPositionName4
                            }
                        },
                        "member5": {
                            "name": name5,
                            "photo": avatar5Url,
                            "title": {
                                "en": ENPositionName5,
                                "it":ITPositionName5
                            }
                            },
                        "member6": {
                            "name": name6,
                            "photo": avatar6Url,
                            "title": {
                                "en": ENPositionName6,
                                "it": ITPositionName6
                            }
                        },
                        "member7": {
                            "name": name7,
                            "photo": avatar7Url,
                            "title": {
                                "en": ENPositionName7,
                                "it": ITPositionName7
                            }
                        },
                        "member8": {
                            "name": name8,
                            "photo": avatar8Url,
                            "title": {
                                "en": ENPositionName8,
                                "it": ITPositionName8
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
                    window.alert("Content edited successfully!");
                    history.push("/UserProfilePage", {from: "/CMSMenu"});
                    return console.log("Content edited successfully.");
                })
                .catch((error) => {
                    console.error(error.code + " " + error.message + "" + error.details);
                });
        // }
    }

    return (
        <>
            <div style={{paddingTop: "5em important"}}>
                <center><h1>Edit <strong>AboutUs</strong> Page static content:</h1></center>
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
                                        Title text:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ITTitleText}
                                            onChange={
                                                (e)=>setITTitleText(e.target.value)
                                            }
                                        ></textarea>
                                    </label>

                                    {/*banner*/}
                                    <div>
                                        Current banner1:
                                        <img style={{width: "25%", height: "auto"}} src={ITBannerUrl} alt=""/>
                                    </div>
                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Main banner
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "ITBanner")}
                                        />
                                    </label>
                                    <div className="output">
                                        { picFileITBannerUploadError!=="" && <div className="error">{ picFileITBannerUploadError }</div>}
                                        { picFileITFileTypeError!=="" && <div className="error">{ picFileITFileTypeError }</div> }
                                        {ITBannerFileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ITBannerUrl} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Mission title:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ITMissionText}
                                            onChange={
                                                (e)=>setITMissionTitle(e.target.value)
                                            }
                                        ></textarea>
                                    </label>
                                    <label className='form-article__label'>
                                        Mission text:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ITMissionText}
                                            onChange={
                                                (e)=>setITMissionText(e.target.value)
                                            }
                                        ></textarea>
                                    </label>

                                    <label className='form-article__label'>
                                        Crew title:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ITCrewTitle}
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
                                            value={name1}
                                            onChange={
                                                (e)=>setName1(e.target.value)
                                            }
                                        />
                                    </label>
                                    <div>
                                        Current avarat:
                                        <img style={{width: "25%", height: "auto"}} src={avatar1Url} alt=""/>
                                    </div>
                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Avatar
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "Avatar1")}
                                        />
                                    </label>
                                    <div className="output">
                                        { picFileAvatarUploadError1!=="" && <div className="error">{ picFileAvatarUploadError1 }</div>}
                                        { picFileAvatarFileTypeError1!=="" && <div className="error">{ picFileAvatarFileTypeError1 }</div> }
                                        {avatar1FileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={avatar1Url} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Title
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            value={ITPositionName1}
                                            onChange={
                                                (e)=>setITPositionName1(e.target.value)
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
                                            value={name2}
                                            onChange={
                                                (e)=>setName2(e.target.value)
                                            }
                                        />
                                    </label>
                                    <div>
                                        Current avatar:
                                        <img style={{width: "25%", height: "auto"}} src={avatar2Url} alt=""/>
                                    </div>
                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Avatar
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "Avatar2")}
                                        />
                                    </label>
                                    <div className="output">
                                        { picFileAvatarUploadError2!=="" && <div className="error">{ picFileAvatarUploadError2 }</div>}
                                        { picFileAvatarFileTypeError2!=="" && <div className="error">{ picFileAvatarFileTypeError2 }</div> }
                                        {avatar2FileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={avatar2Url} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Title
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            value={ITPositionName2}
                                            onChange={
                                                (e)=>setITPositionName2(e.target.value)
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
                                            value={name3}
                                            onChange={
                                                (e)=>setName3(e.target.value)
                                            }
                                        />
                                    </label>
                                    <div>
                                        Current avatar:
                                        <img style={{width: "25%", height: "auto"}} src={avatar3Url} alt=""/>
                                    </div>
                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Avatar
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "Avatar3")}
                                        />
                                    </label>
                                    <div className="output">
                                        { picFileAvatarUploadError3!=="" && <div className="error">{ picFileAvatarUploadError3 }</div>}
                                        {picFileAvatarFileTypeError3!=="" && <div className="error">{ picFileAvatarFileTypeError3 }</div> }
                                        {avatar3FileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={avatar3Url} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Title
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            value={ITPositionName3}
                                            onChange={
                                                (e)=>setITPositionName3(e.target.value)
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
                                            value={name4}
                                            onChange={
                                                (e)=>setName4(e.target.value)
                                            }
                                        />
                                    </label>
                                    <div>
                                        Current avatar:
                                        <img style={{width: "25%", height: "auto"}} src={avatar4Url} alt=""/>
                                    </div>
                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Avatar
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "Avatar4")}
                                        />
                                    </label>
                                    <div className="output">
                                        { picFileAvatarUploadError4!=="" && <div className="error">{ picFileAvatarUploadError4 }</div>}
                                        { picFileAvatarFileTypeError4!=="" && <div className="error">{ picFileAvatarFileTypeError4 }</div> }
                                        {avatar4FileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={avatar4Url} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Title
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            value={ITPositionName4}
                                            onChange={
                                                (e)=>setITPositionName4(e.target.value)
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
                                            value={name5}
                                            onChange={
                                                (e)=>setName5(e.target.value)
                                            }
                                        />
                                    </label>
                                    <div>
                                        Current avatar:
                                        <img style={{width: "25%", height: "auto"}} src={avatar5Url} alt=""/>
                                    </div>
                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Avatar
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "Avatar5")}
                                        />
                                    </label>
                                    <div className="output">
                                        { picFileAvatarUploadError5!=="" && <div className="error">{ picFileAvatarUploadError5 }</div>}
                                        { picFileAvatarFileTypeError5!=="" && <div className="error">{ picFileAvatarFileTypeError5 }</div> }
                                        {avatar5FileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={avatar5Url} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Title
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            value={ITPositionName5}
                                            onChange={
                                                (e)=>setITPositionName5(e.target.value)
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
                                            value={name6}
                                            onChange={
                                                (e)=>setName6(e.target.value)
                                            }
                                        />
                                    </label>
                                    <div>
                                        Current avatar:
                                        <img style={{width: "25%", height: "auto"}} src={avatar6Url} alt=""/>
                                    </div>
                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Avatar
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "Avatar6")}
                                        />
                                    </label>
                                    <div className="output">
                                        { picFileAvatarUploadError6!=="" && <div className="error">{ picFileAvatarUploadError6 }</div>}
                                        { picFileAvatarFileTypeError6!=="" && <div className="error">{ picFileAvatarFileTypeError6 }</div> }
                                        {avatar6FileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={avatar6Url} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Title
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            value={ITPositionName6}
                                            onChange={
                                                (e)=>setITPositionName6(e.target.value)
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
                                            value={name7}
                                            onChange={
                                                (e)=>setName7(e.target.value)
                                            }
                                        />
                                    </label>
                                    <div>
                                        Current avatar:
                                        <img style={{width: "25%", height: "auto"}} src={avatar7Url} alt=""/>
                                    </div>
                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Avatar
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "Avatar7")}
                                        />
                                    </label>
                                    <div className="output">
                                        { picFileAvatarUploadError7!=="" && <div className="error">{ picFileAvatarUploadError7 }</div>}
                                        { picFileAvatarFileTypeError7!=="" && <div className="error">{ picFileAvatarFileTypeError7}</div> }
                                        {avatar7FileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={avatar7Url} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Title
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            value={ITPositionName7}
                                            onChange={
                                                (e)=>setITPositionName7(e.target.value)
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
                                            value={name8}
                                            onChange={
                                                (e)=>setName8(e.target.value)
                                            }
                                        />
                                    </label>
                                    <div>
                                        Current avatar:
                                        <img style={{width: "25%", height: "auto"}} src={avatar8Url} alt=""/>
                                    </div>
                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Avatar
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "Avatar8")}
                                        />
                                    </label>
                                    <div className="output">
                                        { picFileAvatarUploadError8!=="" && <div className="error">{picFileAvatarUploadError8 }</div>}
                                        { picFileAvatarFileTypeError8!=="" && <div className="error">{ picFileAvatarFileTypeError8 }</div> }
                                        {avatar8FileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={avatar8Url} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Title
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            value={ITPositionName8}
                                            onChange={
                                                (e)=>setITPositionName8(e.target.value)
                                            }
                                        />
                                    </label>

                                    <label className='form-article__label'>
                                        Partners title:
                                        <input
                                            className='form-article__input'
                                            type="text"
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
                                        Title text:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ENTitleText}
                                            onChange={
                                                (e)=>setENTitleText(e.target.value)
                                            }
                                        ></textarea>
                                    </label>

                                    {/*banner*/}
                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Main banner
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "ENBanner")}
                                        />
                                    </label>
                                    <div className="output">
                                        { picFileENBannerUploadError!=="" && <div className="error">{ picFileENBannerUploadError }</div>}
                                        { picFileENFileTypeError!=="" && <div className="error">{ picFileENFileTypeError }</div> }
                                        {ENBannerFileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ENBannerUrl} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Mission text:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ENMissionText}
                                            onChange={
                                                (e)=>setENMissionText(e.target.value)
                                            }
                                        ></textarea>
                                    </label>

                                    <label className='form-article__label'>
                                        Crew title:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ENCrewTitle}
                                            onChange={
                                                (e)=>setENCrewTitle(e.target.value)
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
                                            value={name1}
                                            onChange={
                                                (e)=>setName1(e.target.value)
                                            }
                                        />
                                    </label>
                                    <div>
                                        Current avatar:
                                        <img style={{width: "25%", height: "auto"}} src={avatar1Url} alt=""/>
                                    </div>
                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Avatar
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "Avatar1")}
                                        />
                                    </label>
                                    <div className="output">
                                        { uploadedPicFileAvatar1!=="" && <div className="error">{ uploadedPicFileAvatar1}</div>}
                                        { picFileAvatarUploadError1!=="" && <div className="error">{ picFileAvatarUploadError1 }</div> }
                                        {avatar1FileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={avatar1Url} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Title
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            value={ENPositionName1}
                                            onChange={
                                                (e)=>setENPositionName1(e.target.value)
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
                                            value={name2}
                                            onChange={
                                                (e)=>setName2(e.target.value)
                                            }
                                        />
                                    </label>
                                    <div>
                                        Current avatar:
                                        <img style={{width: "25%", height: "auto"}} src={avatar2Url} alt=""/>
                                    </div>
                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Avatar
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "Avatar2")}
                                        />
                                    </label>
                                    <div className="output">
                                        { uploadedPicFileAvatar2!=="" && <div className="error">{ uploadedPicFileAvatar2 }</div>}
                                        { picFileAvatarFileTypeError2!=="" && <div className="error">{ picFileAvatarFileTypeError2 }</div> }
                                        {avatar2FileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={avatar2Url} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Title
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            value={ENPositionName2}
                                            onChange={
                                                (e)=>setENPositionName2(e.target.value)
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
                                            value={name3}
                                            onChange={
                                                (e)=>setName3(e.target.value)
                                            }
                                        />
                                    </label>
                                    <div>
                                        Current avatar:
                                        <img style={{width: "25%", height: "auto"}} src={avatar3Url} alt=""/>
                                    </div>
                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Avatar
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "Avatar3")}
                                        />
                                    </label>
                                    <div className="output">
                                        { uploadedPicFileAvatar3!=="" && <div className="error">{ uploadedPicFileAvatar3 }</div>}
                                        { picFileAvatarFileTypeError3!=="" && <div className="error">{ picFileAvatarFileTypeError3 }</div> }
                                        {avatar3FileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={avatar3Url} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Title
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            value={ENPositionName3}
                                            onChange={
                                                (e)=>setENPositionName3(e.target.value)
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
                                            value={name4}
                                            onChange={
                                                (e)=>setName4(e.target.value)
                                            }
                                        />
                                    </label>
                                    <div>
                                        Current avatar:
                                        <img style={{width: "25%", height: "auto"}} src={avatar4Url} alt=""/>
                                    </div>
                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Avatar
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "Avatar4")}
                                        />
                                    </label>
                                    <div className="output">
                                        { uploadedPicFileAvatar4!=="" && <div className="error">{ uploadedPicFileAvatar4 }</div>}
                                        { picFileAvatarFileTypeError4!=="" && <div className="error">{ picFileAvatarFileTypeError4 }</div> }
                                        {avatar4FileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={avatar4Url} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Title
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            value={ENPositionName4}
                                            onChange={
                                                (e)=>setENPositionName4(e.target.value)
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
                                            value={name5}
                                            onChange={
                                                (e)=>setName5(e.target.value)
                                            }
                                        />
                                    </label>
                                    <div>
                                        Current avatar:
                                        <img style={{width: "25%", height: "auto"}} src={avatar5Url} alt=""/>
                                    </div>
                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Avatar
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "Avatar5")}
                                        />
                                    </label>
                                    <div className="output">
                                        { uploadedPicFileAvatar5!=="" && <div className="error">{ uploadedPicFileAvatar5 }</div>}
                                        { picFileAvatarFileTypeError5!=="" && <div className="error">{ picFileAvatarFileTypeError5 }</div> }
                                        {avatar5FileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={avatar5Url} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Title
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            value={ENPositionName5}
                                            onChange={
                                                (e)=>setENPositionName5(e.target.value)
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
                                            value={name6}
                                            onChange={
                                                (e)=>setName6(e.target.value)
                                            }
                                        />
                                    </label>
                                    <div>
                                        Current avatar:
                                        <img style={{width: "25%", height: "auto"}} src={avatar6Url} alt=""/>
                                    </div>
                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Avatar
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "Avatar6")}
                                        />
                                    </label>
                                    <div className="output">
                                        { uploadedPicFileAvatar6!=="" && <div className="error">{ uploadedPicFileAvatar6 }</div>}
                                        { picFileAvatarFileTypeError6!=="" && <div className="error">{ picFileAvatarFileTypeError6 }</div> }
                                        {avatar6FileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={avatar6Url} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Title
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            value={ENPositionName6}
                                            onChange={
                                                (e)=>setENPositionName6(e.target.value)
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
                                            value={name7}
                                            onChange={
                                                (e)=>setName7(e.target.value)
                                            }
                                        />
                                    </label>
                                    <div>
                                        Current avatar:
                                        <img style={{width: "25%", height: "auto"}} src={avatar7Url} alt=""/>
                                    </div>
                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Avatar
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"
                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "Avatar7")}
                                        />
                                    </label>
                                    <div className="output">
                                        { uploadedPicFileAvatar7!=="" && <div className="error">{ uploadedPicFileAvatar7}</div>}
                                        { picFileAvatarFileTypeError7!=="" && <div className="error">{ picFileAvatarFileTypeError7 }</div> }
                                        {avatar7FileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={avatar7Url} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Title
                                        <input
                                            className='form-article__input'
                                            type="text"
                                            value={ENPositionName7}
                                            onChange={
                                                (e)=>setENPositionName7(e.target.value)
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
                                            value={name8}
                                            onChange={
                                                (e)=>setName8(e.target.value)
                                            }
                                        />
                                    </label>
                                    <div>
                                        Current avatar:
                                        <img style={{width: "25%", height: "auto"}} src={avatar8Url} alt=""/>
                                    </div>
                                    <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Avatar
                                        <input
                                            className='form-article__btn visually-hidden'
                                            type="file"

                                            placeholder='file'
                                            onChange={(e)=>fileUploadEventListener(e, "Avatar8")}
                                        />
                                    </label>
                                    <div className="output">
                                        { uploadedPicFileAvatar8!=="" && <div className="error">{ uploadedPicFileAvatar8 }</div>}
                                        { picFileAvatarFileTypeError8!=="" && <div className="error">{ picFileAvatarFileTypeError8 }</div> }
                                        {avatar8FileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={avatar8Url} alt=""/></div> }
                                    </div>

                                    <label className='form-article__label'>
                                        Title
                                        <input
                                            className='form-article__input'
                                            type="text"

                                            value={ENPositionName8}
                                            onChange={
                                                (e)=>setENPositionName8(e.target.value)
                                            }
                                        />
                                    </label>

                                    <label className='form-article__label'>
                                        Partners title:
                                        <input
                                            className='form-article__input'
                                            type="text"

                                            value={ENPartnersTitle}
                                            onChange={
                                                (e)=>setENPartnersTitle(e.target.value)
                                            }
                                        />
                                    </label>

                                    <label className='form-article__label'>
                                        Career title:
                                        <input
                                            className='form-article__input'
                                            type="text"

                                            value={ENCareerTitle}
                                            onChange={
                                                (e)=>setENCareerTitle(e.target.value)
                                            }
                                        />
                                    </label>

                                    <label className='form-article__label'>
                                        Career text:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ENCareerText}

                                            onChange={
                                                (e)=>setENCareerText(e.target.value)
                                            }
                                        ></textarea>
                                    </label>
                                </form>
                            </div>
                        </div>

                        {/*partners logos*/}
                        <div>
                            {/*1*/}
                            <div>
                                Current Logo 1:
                                <img style={{width: "25%", height: "auto"}} src={partnerLogo1Url} alt=""/>
                            </div>
                            <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Logo 1
                                <input
                                    className='form-article__btn visually-hidden'
                                    type="file"

                                    placeholder='file'
                                    onChange={(e)=>fileUploadEventListener(e, "setPartner1Url")}
                                />
                            </label>
                            <div className="output">
                                { picFilePartnerLogoUploadError1!=="" && <div className="error">{ picFilePartnerLogoUploadError1 }</div>}
                                { picFilePartnerLogoFileTypeError1!=="" && <div className="error">{ picFilePartnerLogoFileTypeError1 }</div> }
                                {partnerLogo1FileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={partnerLogo1Url} alt=""/></div> }
                            </div>

                            {/*2*/}
                            <div>
                                Current Logo 2:
                                <img style={{width: "25%", height: "auto"}} src={partnerLogo2Url} alt=""/>
                            </div>
                            <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Logo 2
                                <input
                                    className='form-article__btn visually-hidden'
                                    type="file"

                                    placeholder='file'
                                    onChange={(e)=>fileUploadEventListener(e, "partner2Url")}
                                />
                            </label>
                            <div className="output">
                                { picFilePartnerLogoUploadError2!=="" && <div className="error">{ picFilePartnerLogoUploadError2 }</div>}
                                { picFilePartnerLogoFileTypeError2!=="" && <div className="error">{ picFilePartnerLogoFileTypeError2 }</div> }
                                {partnerLogo2FileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={partnerLogo2Url} alt=""/></div> }
                            </div>

                            {/*3*/}
                            <div>
                                Current Logo 3:
                                <img style={{width: "25%", height: "auto"}} src={partnerLogo3Url} alt=""/>
                            </div>
                            <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Logo 3
                                <input
                                    className='form-article__btn visually-hidden'
                                    type="file"

                                    placeholder='file'
                                    onChange={(e)=>fileUploadEventListener(e, "partner3Url")}
                                />
                            </label>
                            <div className="output">
                                { picFilePartnerLogoUploadError3!=="" && <div className="error">{ picFilePartnerLogoUploadError3 }</div>}
                                { picFilePartnerLogoFileTypeError3!=="" && <div className="error">{ picFilePartnerLogoFileTypeError3 }</div> }
                                {partnerLogo3FileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={partnerLogo3Url} alt=""/></div> }
                            </div>

                            {/*4*/}
                            <div>
                                Current Logo 4:
                                <img style={{width: "25%", height: "auto"}} src={partnerLogo4Url} alt=""/>
                            </div>
                            <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Logo 4
                                <input
                                    className='form-article__btn visually-hidden'
                                    type="file"

                                    placeholder='file'
                                    onChange={(e)=>fileUploadEventListener(e, "partner4Url")}
                                />
                            </label>
                            <div className="output">
                                { picFilePartnerLogoUploadError4!=="" && <div className="error">{ picFilePartnerLogoUploadError4 }</div>}
                                { picFilePartnerLogoFileTypeError4!=="" && <div className="error">{ picFilePartnerLogoFileTypeError4 }</div> }
                                {partnerLogo4FileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={partnerLogo4Url} alt=""/></div> }
                            </div>

                            {/*5*/}
                            <div>
                                Current Logo 5:
                                <img style={{width: "25%", height: "auto"}} src={partnerLogo5Url} alt=""/>
                            </div>
                            <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Logo 5
                                <input
                                    className='form-article__btn visually-hidden'
                                    type="file"

                                    placeholder='file'
                                    onChange={(e)=>fileUploadEventListener(e, "partner5Url")}
                                />
                            </label>
                            <div className="output">
                                { picFilePartnerLogoUploadError5!=="" && <div className="error">{ picFilePartnerLogoUploadError5 }</div>}
                                { picFilePartnerLogoFileTypeError5!=="" && <div className="error">{ picFilePartnerLogoFileTypeError5 }</div> }
                                {partnerLogo5FileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={partnerLogo5Url} alt=""/></div> }
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

export default CMSAboutUsPageEdit;