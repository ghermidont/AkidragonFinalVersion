import React, {useEffect, useState} from 'react';
import {projectFirestore, projectStorage} from "../../fireBase";
import {useHistory} from 'react-router-dom';
import {useAuthContext} from "../../context/AuthContext";
import {Dropdown} from "react-bootstrap";
import ReactPlayer from "react-player/lazy";
import {useDataFromFirestore} from "../../customHooks/useFirestore";
const queryString = require('query-string');

export default function EditTournamentsForm() {
    console.log("EditTournamentsForm worked");
    const {docsFromHook} = useDataFromFirestore('tournaments');
    const {currentUser} = useAuthContext();
    const fileTypesArray = ['image/png', 'image/jpeg'];
    const history = useHistory();
    const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
    //const [loading, setLoading] = useState(true);
    const [eventCategory, setEventCategory] = useState('');
    const [eventTitle, setEventTitle] = useState('');
    const [eventStatus, setEventStatus] = useState('');
    const [eventVideoLink, setEventVideoLink] =useState('');
    const [eventDate, setEventDate] = useState();
    const [eventInfoPageLink, setEventInfoPageLink] = useState('');
    //const [uploadedPicFile, setUploadedPicFile] = useState('');
    const [uploadError1, setUploadError1] = useState(null);
    const [uploadError2, setUploadError2] = useState(null);
    const [uploadError3, setUploadError3] = useState(null);
    const [uploadError4, setUploadError4] = useState(null);
    const [uploadErrorWin1, setUploadErrorWin1] = useState(null);
    const [uploadErrorWin2, setUploadErrorWin2] = useState(null);
    const [fileSuccess1, setFileSuccess1] = useState(false);
    const [fileSuccess2, setFileSuccess2] = useState(false);
    const [fileSuccess3, setFileSuccess3] = useState(false);
    const [fileSuccess4, setFileSuccess4] = useState(false);
    const [fileSuccessWin1, setFileSuccessWin1] = useState(false);
    const [fileSuccessWin2, setFileSuccessWin2] = useState(false);
    const [url1, setUrl1] = useState('');
    const [url2, setUrl2] = useState('');
    const [url3, setUrl3] = useState('');
    const [url4, setUrl4] = useState('');
    const [urlWin1, setUrlWin1] = useState('');
    const [urlWin2, setUrlWin2] = useState('');
    const [fileTypeError1, setFileTypeError1] = useState("");
    const [fileTypeError2, setFileTypeError2] = useState("");
    const [fileTypeError3, setFileTypeError3] = useState("");
    const [fileTypeError4, setFileTypeError4] = useState("");
    const [fileTypeErrorWin1, setFileTypeErrorWin1] = useState("");
    const [fileTypeErrorWin2, setFileTypeErrorWin2] = useState("");
    const [uploadedPicFile1,setUploadedPicFile1] = useState();
    const [uploadedPicFile2,setUploadedPicFile2] = useState();
    const [uploadedPicFile3,setUploadedPicFile3] = useState();
    const [uploadedPicFile4,setUploadedPicFile4] = useState();
    const [uploadedPicFileWin1, setUploadedPicFileWin1] = useState();
    const [uploadedPicFileWin2, setUploadedPicFileWin2] = useState();
    //const [createdAt, setCreatedAt] = useState('');
    //const [fileSuccess, setFileSuccess] = useState(false);
    const [fileTypeError, setFileTypeError] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    let parsedWindowLocation = queryString.parse(window.location.hash);
    const stringifiedSlug = queryString.stringify(parsedWindowLocation).substr(21);

    console.log("This is the stringified:");
    console.log(stringifiedSlug);

    let selectedTournament = "";

    useEffect(() => {
        if (docsFromHook) {
            selectedTournament = docsFromHook.filter(function (tournament) {
               return tournament.id === stringifiedSlug;
            });
            console.log(selectedTournament);
        }
    });

    useEffect(() => {
        if (selectedTournament !== "") {
            selectedTournament && selectedTournament.map(doc => {
                let date = new Date(doc.eventDate);
                let parsedDate = date.toString();
                setEventCategory(doc.eventCategory);
                setEventStatus(doc.eventStatus);
                setEventTitle(doc.eventTitle);
                setUrlWin1(doc.eventWinner1?doc.eventWinner1:"");
                setUrlWin2(doc.eventWinner2?doc.eventWinner2:"");
                setEventInfoPageLink(doc.eventInfoPage);
                setEventDate(doc.eventDate);
                setCurrentDate(parsedDate);

                setEventVideoLink(doc.eventVideoLink);
                setUrl1(doc.pictureURL1?doc.pictureURL1:"");
                setUrl2(doc.pictureURL2?doc.pictureURL2:"");
                setUrl3(doc.pictureURL3?doc.pictureURL3:"");
                setUrl4(doc.pictureURL4?doc.pictureURL4:"");
            })
        }
    }, [docsFromHook]);

    async function putFile(File, setterKey){
        try {
            //setLoading(true);
            setFileTypeError("");
            const storageRef = projectStorage.ref('tournaments_pictures').child(File.name);
            storageRef.put(File).on('state_changed', (err) => {
            },  (err) => {
                window.alert(err);
            }, async()=>{
                const finalUrl = await storageRef.getDownloadURL();

                if(finalUrl!==undefined) {
                    if (setterKey === "url1") {
                        setFileSuccess1(true);
                    }else{
                        setFileSuccess1(false);
                    }
                    if (setterKey === "url2") {
                        setFileSuccess2(true);
                    }else{
                        setFileSuccess2(false);
                    }
                    if (setterKey === "url3") {
                        setFileSuccess3(true);
                    }else{
                        setFileSuccess3(false);
                    }
                    if (setterKey === "url4") {
                        setFileSuccess4(true);
                    }else{
                        setFileSuccess4(false);
                    }
                    if (setterKey === "urlWin1") {
                        setFileSuccessWin1(true);
                    }else{
                        setFileSuccessWin1(false);
                    }
                    if (setterKey === "urlWin2") {
                        setFileSuccessWin2(true);
                    }else{
                        setFileSuccessWin2(false);
                    }
                }

                switch(setterKey){
                    case "url1":
                        setUrl1(finalUrl);
                        break;
                    case "url2":
                        setFileSuccess2(true);
                        break;
                    case "url3":
                        setFileSuccess3(true);
                        break;
                    case "url4":
                        setFileSuccess4(true);
                        break;
                    case "urlWin1":
                        setFileSuccessWin1(true);
                        break;
                    case "urlWin2":
                        setFileSuccessWin2(true);
                        break;
                    default:
                        console.log("None of the cases worked!");
                }
            });
        } catch {
            if (setterKey === "url1") {
                setUploadError1("Failed to upload file " + setterKey);
            } else if (setterKey === "url2") {
                setUploadError2("Failed to upload file " + setterKey);
            } else if (setterKey === "url3") {
                setUploadError3("Failed to upload file " + setterKey);
            } else if (setterKey === "url4") {
                setUploadError4("Failed to upload file " + setterKey);
            } else if (setterKey === "urlWin1") {
                setUploadErrorWin1("Failed to upload file " + setterKey);
            } else if (setterKey === "urlWin2") {
                setUploadErrorWin2("Failed to upload file " + setterKey);
            }
        }
        //setLoading(false);
    }

    const fileUploadEventListener = (e, setterKey) => {
        let uploadedFile = e.target.files[0];
        if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
            if (setterKey === "url1") {
               setUploadedPicFile1(uploadedFile);
                putFile(uploadedPicFile1, setterKey).then(()=>console.log("putFile() worked"));
            } else if (setterKey === "url2") {
               setUploadedPicFile2(uploadedFile);
                putFile(uploadedPicFile2, setterKey).then(()=>console.log("putFile() worked"));
            } else if (setterKey === "url3") {
              setUploadedPicFile3(uploadedFile);
                putFile(uploadedPicFile3, setterKey).then(()=>console.log("putFile() worked"));
            } else if (setterKey === "url4") {
              setUploadedPicFile4(uploadedFile);
                putFile(uploadedPicFile4, setterKey).then(()=>console.log("putFile() worked"));
            } else if (setterKey === "urlWin1") {
              setUploadedPicFileWin1(uploadedFile);
                putFile(uploadedPicFileWin1, setterKey).then(()=>console.log("putFile() worked"));
            } else if (setterKey === "urlWin2") {
              setUploadedPicFileWin2(uploadedFile);
                putFile(uploadedPicFileWin2, setterKey).then(()=>console.log("putFile() worked"));
            }
        } else {
            if (setterKey === "url1") {
                setFileTypeError1('Please select an image file (png or jpg)');
                setUploadedPicFile1('');
            } else if (setterKey === "url2") {
                setFileTypeError2('Please select an image file (png or jpg)');
                setUploadedPicFile2('');
            } else if (setterKey === "url3") {
                setFileTypeError3('Please select an image file (png or jpg)');
                setUploadedPicFile3('');
            } else if (setterKey === "url4") {
                setFileTypeError4('Please select an image file (png or jpg)');
                setUploadedPicFile4('');
            } else if (setterKey === "urlWin1") {
                setFileTypeErrorWin1('Please select an image file (png or jpg)');
                setUploadedPicFileWin1('');
            } else if (setterKey === "urlWin2") {
                setFileTypeErrorWin2('Please select an image file (png or jpg)');
                setUploadedPicFileWin2('');
            }
        }
   };

    const clearInput = () => {
        const storageRef1 = uploadedPicFile1?projectStorage.ref(`tournaments_pictures/${currentUser.uid||CurrentUserFromLS.uid}`).child(uploadedPicFile1.name):"";
        const storageRef2 = uploadedPicFile2?projectStorage.ref(`tournaments_pictures/${currentUser.uid||CurrentUserFromLS.uid}`).child(uploadedPicFile2.name):"";
        const storageRef3 = uploadedPicFile3?projectStorage.ref(`tournaments_pictures/${currentUser.uid||CurrentUserFromLS.uid}`).child(uploadedPicFile3.name):"";
        const storageRef4 = uploadedPicFile4?projectStorage.ref(`tournaments_pictures/${currentUser.uid||CurrentUserFromLS.uid}`).child(uploadedPicFile4.name):"";
        const storageRefWin1 = uploadedPicFileWin1?projectStorage.ref(`tournaments_pictures/${currentUser.uid||CurrentUserFromLS.uid}`).child(uploadedPicFileWin1.name):"";
        const storageRefWin2 = uploadedPicFileWin2?projectStorage.ref(`tournaments_pictures/${currentUser.uid||CurrentUserFromLS.uid}`).child(uploadedPicFileWin2.name):"";

        if(storageRef1){
            storageRef1.delete().then(() => {
                console.log("uploaded image removed successfully");
            }).catch((error) => {
                console.log("could not delete the file because:" + error);
            });
        }

        if(storageRef2){
            storageRef1.delete().then(() => {
                console.log("uploaded image removed successfully");
            }).catch((error) => {
                console.log("could not delete the file because:" + error);
            });
        }

        if(storageRef3){
            storageRef1.delete().then(() => {
                console.log("uploaded image removed successfully");
            }).catch((error) => {
                console.log("could not delete the file because:" + error);
            });
        }

        if(storageRef4){
            storageRef1.delete().then(() => {
                console.log("uploaded image removed successfully");
            }).catch((error) => {
                console.log("could not delete the file because:" + error);
            });
        }

        if(storageRefWin1){
            storageRef1.delete().then(() => {
                console.log("uploaded image removed successfully");
            }).catch((error) => {
                console.log("could not delete the file because:" + error);
            });
        }

        if(storageRefWin2){
            storageRef2.delete().then(() => {
                console.log("uploaded image removed successfully");
            }).catch((error) => {
                console.log("could not delete the file because:" + error);
            });
        }
        history.push("/TournamentsPage", {from: "/ModeratorAddTournamentsForm"});
    }

    const editTournamentWithFBCallback = () => {
        const collectionRef = projectFirestore.collection('tournaments').doc(stringifiedSlug);

        if (eventStatus === "passed" && eventCategory === "match") {
            collectionRef.set(
                {
                    "authorID": currentUser ? currentUser.uid : CurrentUserFromLS.uid,
                    "eventCategory": eventCategory,
                    "eventStatus": eventStatus,
                    "eventTitle": eventTitle,
                    "eventWinner1": urlWin1,
                    "eventWinner2": urlWin2,
                    "eventInfoPage": eventInfoPageLink,
                    "eventDate": Date.parse(eventDate),
                    "eventVideoLink": eventVideoLink,
                    "updatedAt": Date.now()
                })
                .then(() => {
                    window.alert("Tournament edited successfully!");
                    history.push("/TournamentsPage", {from: "/ModeratorAddTournamentsForm"});
                    return console.log("Tournament edited successfully.");
                })
                .catch((error) => {
                    console.error(error.code + " " + error.message + "" + error.details);
                });
        }

        if (eventStatus === "passed" && eventCategory === "tournament") {
            collectionRef.set(
                {
                    "authorID": currentUser ? currentUser.uid : CurrentUserFromLS.uid,
                    "eventCategory": eventCategory,
                    "eventStatus": eventStatus,
                    "eventTitle": eventTitle,
                    "eventWinner1": urlWin1,
                    "eventInfoPage": eventInfoPageLink,
                    "eventDate": Date.parse(eventDate),
                    "eventVideoLink": eventVideoLink,
                    "updatedAt": Date.now()
                })
                .then(() => {
                    window.alert("Tournament edited successfully!");
                    history.push("/TournamentsPage", {from: "/ModeratorAddTournamentsForm"});
                    return console.log("Tournament edited successfully.");
                })
                .catch((error) => {
                    console.error(error.code + " " + error.message + "" + error.details);
                });
        }

        if (eventStatus === "future" && eventCategory === "match") {
            collectionRef.set(
                {
                    "authorID": currentUser ? currentUser.uid : CurrentUserFromLS.uid,
                    "eventCategory": eventCategory,
                    "eventStatus": eventStatus,
                    "eventTitle": eventTitle,
                    "eventInfoPage": eventInfoPageLink,
                    "eventDate": Date.parse(eventDate),
                    "eventVideoLink": eventVideoLink,
                    "pictureURL1": url1,
                    "pictureURL2": url2,
                    "updatedAt": Date.now()
                })
                .then(() => {
                    window.alert("Tournament edited successfully!");
                    history.push("/TournamentsPage", {from: "/ModeratorAddTournamentsForm"});
                    return console.log("Tournament edited successfully.");
                })
                .catch((error) => {
                    console.error(error.code + " " + error.message + "" + error.details);
                });
        }

        if (eventStatus === "future" && eventCategory === "tournament") {
            collectionRef.set(
                {
                    "authorID": currentUser ? currentUser.uid : CurrentUserFromLS.uid,
                    "eventCategory": eventCategory,
                    "eventStatus": eventStatus,
                    "eventTitle": eventTitle,
                    "eventInfoPage": eventInfoPageLink,
                    "eventDate": eventDate,
                    "eventVideoLink": eventVideoLink,
                    "pictureURL1": url1,
                    "pictureURL2": url2,
                    "pictureURL3": url3,
                    "pictureURL4": url4,
                    "updatedAt": Date.now()
                })
                .then(() => {
                    window.alert("Tournament edited successfully!");
                    history.push("/TournamentsPage", {from: "/ModeratorAddTournamentsForm"});
                    return console.log("Tournament edited successfully.");
                })
                .catch((error) => {
                    console.error(error.code + " " + error.message + "" + error.details);
                });
        }
    }

    return (
        <>
            <div className='form-update__body form-add-tournament'>
                <form className="form-update">
                    <div className="form-dropdown">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {eventCategory!==''? eventCategory : "Event category"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>setEventCategory("match")}>Match</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setEventCategory("tournament")}>Tournament</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className="form-dropdown">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {eventStatus!==''? eventStatus : "Event status"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>setEventStatus("future")}>Future</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setEventStatus("passed")}>Passed</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <label className='form-update__label'>
                        Event title
                        <input
                            className='form-update__input'
                            type="text"
                            value={eventTitle}
                            onChange={
                                (e)=>setEventTitle(e.target.value)
                            }
                        />
                    </label>

                    {/*{eventStatus==="future"&&*/}
                    <>
                        <div>
                            Current Picture1:
                            <img style={{width: "25%", height: "auto"}} src={url1} alt=""/>
                        </div>
                        <label className='form-update__label btn-upload btn-upload--tournament'> <span className='icon-upload2'></span> Picture team 1
                            <input
                                className='form-update__btn visually-hidden'
                                type="file"
                                placeholder='file'
                                onChange={(e)=>fileUploadEventListener(e, "url1")}
                            />
                            <div className="output">
                                { uploadError1!=="" && <div className="error">{ uploadError1 }</div>}
                                { fileTypeError1!=="" && <div className="error">{ fileTypeError1 }</div> }
                                { fileSuccess1&&<div>Image 1 Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url1} alt=""/></div> }
                            </div>
                        </label>
                        <div>
                            Current Picture2:
                            <img style={{width: "25%", height: "auto"}} src={url2} alt=""/>
                        </div>
                        <label className='form-update__label btn-upload btn-upload--tournament'> <span className='icon-upload2'></span> Picture team 2
                            <input
                                className='form-update__btn visually-hidden'
                                type="file"
                                placeholder='file'
                                onChange={(e)=>fileUploadEventListener(e, "url2")}
                            />
                            <div className="output">
                                { uploadError2!=="" && <div className="error">{ uploadError2 }</div>}
                                { fileTypeError2!=="" && <div className="error">{ fileTypeError2 }</div> }
                                {fileSuccess2&&<div>Image 2 Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url2} alt=""/></div> }
                            </div>
                        </label>
                    </>
                    {/*}*/}

                    {/*{(eventCategory==="tournament"&&eventStatus==="future")&&*/}UploadE                    <>
                        <div>
                            Current Picture3:
                            <img style={{width: "25%", height: "auto"}} src={url3} alt=""/>
                        </div>
                        <label className='form-update__label btn-upload btn-upload--tournament'><span className='icon-upload2'></span> Picture team 3
                            <input
                                className='form-update__btn visually-hidden'
                                type="file"
                                placeholder='file'
                                onChange={(e)=>fileUploadEventListener(e, "url3")}
                            />
                            <div className="output">
                                { uploadError3!=="" && <div className="error">{ uploadError3 }</div>}
                                { fileTypeError3!=="" && <div className="error">{ fileTypeError3 }</div> }
                                {fileSuccess3&&<div>Image 3 Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url3} alt=""/></div> }
                            </div>
                        </label>

                        <div>
                            Current Picture4:
                            <img style={{width: "25%", height: "auto"}} src={url4} alt=""/>
                        </div>
                        <label className='form-update__label btn-upload btn-upload--tournament'> <span className='icon-upload2'></span> Picture team 4
                            <input
                                className='form-update__btn visually-hidden'
                                type="file"
                                placeholder='file'
                                onChange={(e)=>fileUploadEventListener(e, "url4")}
                            />
                            <div className="output">
                                { uploadError4!=="" && <div className="error">{ uploadError4 }</div>}
                                { fileTypeError4!=="" && <div className="error">{ fileTypeError4 }</div> }
                                {fileSuccess4&&<div>Image 4 Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url4} alt=""/></div> }
                            </div>
                        </label>
                    </>
                    {/*}*/}
                    {eventVideoLink&&
                    <ReactPlayer
                        url={eventVideoLink ? eventVideoLink : ""}
                        controls={true}
                        light={true}
                        playing={false}
                    />
                    }
                    <label className='form-update__label'>
                        Video Link
                        <input
                            className='form-update__input'
                            type="text"
                            value={eventVideoLink}
                            onChange={
                                (e)=>setEventVideoLink(e.target.value)
                            }
                        />
                    </label>

                    <label className='form-update__label'>
                        Info Page
                        <input
                            className='form-update__input'
                            type="text"
                            value={eventInfoPageLink}
                            onChange={
                                (e)=>setEventInfoPageLink(e.target.value)
                            }
                        />
                    </label>

                    <div>Current date: {currentDate}</div>
                    <label className='form-update__label'>
                        Date/Hour
                        <input
                            className='form-update__input date'
                            type="date"
                            min="2021-05-03"
                            max="2022-12-31"
                            onChange={
                                (e)=>setEventDate(Date.parse(e.target.value))
                            }
                        />
                    </label>

                    {/*{eventStatus === "passed" &&*/}
                    <div>
                        Current Winner 1:
                        <img style={{width: "25%", height: "auto"}} src={urlWin1} alt=""/>
                    </div>
                    <label
                        className='form-update__label btn-upload btn-upload--tournament'>
                    <span
                        className='icon-upload2'>
                    </span>
                        Event winner 1
                        <input
                            className='form-update__btn visually-hidden'
                            type="file"
                            placeholder='file'
                            onChange={(e)=>fileUploadEventListener(e, "urlWin1")}
                        />
                        <div className="output">
                            { uploadErrorWin1!=="" && <div className="error">{ uploadErrorWin1 }</div>}
                            { fileTypeErrorWin1!=="" && <div className="error">{ fileTypeErrorWin1 }</div>}
                            {fileSuccessWin1&&<div>Image Win1 Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={urlWin1} alt=""/></div> }
                        </div>
                    </label>
                    {/*}*/}
                    {/*{(eventStatus === "passed" && eventCategory === "match")&&*/}
                    <div>
                        Current Winner 2:
                        <img style={{width: "25%", height: "auto"}} src={urlWin2} alt=""/>
                    </div>
                    <label
                        className='form-update__label btn-upload btn-upload--tournament'>
                    <span
                        className='icon-upload2'>
                    </span>

                        Event winner 2
                        <input
                            className='form-update__btn visually-hidden'
                            type="file"
                            placeholder='file'
                            onChange={(e)=>fileUploadEventListener(e, "urlWin2")}
                        />
                        <div className="output">
                            { uploadErrorWin2!=="" && <div className="error">{ uploadErrorWin2 }</div>}
                            { fileTypeErrorWin2!=="" && <div className="error">{ fileTypeErrorWin2 }</div> }
                            {fileSuccessWin2&&<div>Image Win2 Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={urlWin2} alt=""/></div> }
                        </div>

                    </label>
                    {/*}*/}

                    <button
                        className="form-article__btn"
                        onClick={()=>editTournamentWithFBCallback()}
                    >
                        Submit
                    </button>
                    <button style={{marginTop: "1em"}}
                            className="form-article__btn"
                            onClick={()=>clearInput()}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </>
    );
}