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

  const [eventCategory, setEventCategory] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventStatus, setEventStatus] = useState("");
  const [eventVideoLink, setEventVideoLink] = useState("");
  const [eventDate, setEventDate] = useState();
  const [eventInfoPageLink, setEventInfoPageLink] = useState("");
  const [createdAt, setCreatedAt] = useState(0);
  const [uploadError1, setUploadError1] = useState("");
  const [uploadError2, setUploadError2] = useState("");
  const [uploadError3, setUploadError3] = useState("");
  const [uploadError4, setUploadError4] = useState("");
  const [uploadErrorWin1, setUploadErrorWin1] = useState("");
  const [uploadErrorWin2, setUploadErrorWin2] = useState("");
  const [uploadErrorBanner, setUploadErrorBanner] = useState("");
  const [eventBanner, setEventBanner] = useState("");
  const [authorID, setAuthorID] = useState("");

  const [fileSuccess1, setFileSuccess1] = useState(false);
  const [fileSuccess2, setFileSuccess2] = useState(false);
  const [fileSuccess3, setFileSuccess3] = useState(false);
  const [fileSuccess4, setFileSuccess4] = useState(false);
  const [fileSuccessWin1, setFileSuccessWin1] = useState(false);
  const [fileSuccessWin2, setFileSuccessWin2] = useState(false);
  const [fileSuccessBanner, setFileSuccessBanner] = useState(false);

  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [url4, setUrl4] = useState("");
  const [urlWin1, setUrlWin1] = useState("");
  const [urlWin2, setUrlWin2] = useState("");
  const [urlBanner, setUrlBanner] = useState("");

  const [oldUrl1, setOldUrl1] = useState("");
  const [oldUrl2, setOldUrl2] = useState("");
  const [oldUrl3, setOldUrl3] = useState("");
  const [oldUrl4, setOldUrl4] = useState("");
  const [oldUrlWin1, setOldUrlWin1] = useState("");
  const [oldUrlWin2, setOldUrlWin2] = useState("");
  const [oldUrlBanner, setOldUrlBanner] = useState("");

  const [fileTypeError1, setFileTypeError1] = useState("");
  const [fileTypeError2, setFileTypeError2] = useState("");
  const [fileTypeError3, setFileTypeError3] = useState("");
  const [fileTypeError4, setFileTypeError4] = useState("");
  const [fileTypeErrorWin1, setFileTypeErrorWin1] = useState("");
  const [fileTypeErrorWin2, setFileTypeErrorWin2] = useState("");
  const [fileTypeErrorBanner, setFileTypeErrorBanner] = useState("");

  const [uploadedPicFile1, setUploadedPicFile1] = useState();
  const [uploadedPicFile2, setUploadedPicFile2] = useState();
  const [uploadedPicFile3, setUploadedPicFile3] = useState();
  const [uploadedPicFile4, setUploadedPicFile4] = useState();
  const [uploadedPicFileWin1, setUploadedPicFileWin1] = useState();
  const [uploadedPicFileWin2, setUploadedPicFileWin2] = useState();
  const [uploadedPicFileBanner, setUploadedPicFileBanner] = useState();

  const [currentDate, setCurrentDate] = useState("");

  let parsedWindowLocation = queryString.parse(window.location.hash);
  const stringifiedSlug = queryString.stringify(parsedWindowLocation).substr(21);

  console.log("This is the stringified:");
  console.log(stringifiedSlug);

  let selectedTournament = "";

  useEffect(() => {
    console.log("filter useEffect");
    if (docsFromHook) {
      selectedTournament = docsFromHook.filter(function (tournament) {
        return tournament.id === stringifiedSlug;
      });
      console.log(selectedTournament);
    }
  });

  useEffect(() => {
    console.log("setter useEffect()")
    if (selectedTournament !== "") {
      selectedTournament && selectedTournament.map(doc => {
        let date = new Date(doc.eventDate);
        let parsedDate = date.toString();
        console.log(doc.eventDate);
        console.log(parsedDate);
        setAuthorID(doc.authorID);
        setCreatedAt(doc.createdAt);
        setEventBanner(doc.eventBanner);
        setEventCategory(doc.eventCategory);
        setEventStatus(doc.eventStatus);
        setEventTitle(doc.eventTitle);
        setUrlWin1(doc.eventWinner1 ? doc.eventWinner1 : "");
        setOldUrlWin1(doc.eventWinner1 ? doc.eventWinner1 : "");
        setUrlWin2(doc.eventWinner2 ? doc.eventWinner2 : "");
        setOldUrlWin2(doc.eventWinner2 ? doc.eventWinner2 : "");
        setEventInfoPageLink(doc.eventInfoPage);
        setEventDate(doc.eventDate);
        setCurrentDate(parsedDate);
        setEventVideoLink(doc.eventVideoLink);
        setUrl1(doc.pictureURL1 ? doc.pictureURL1 : "");
        setOldUrl1(doc.pictureURL1 ? doc.pictureURL1 : "");
        setUrl2(doc.pictureURL2 ? doc.pictureURL2 : "");
        setOldUrl2(doc.pictureURL2 ? doc.pictureURL2 : "");
        setUrl3(doc.pictureURL3 ? doc.pictureURL3 : "");
        setOldUrl3(doc.pictureURL3 ? doc.pictureURL3 : "");
        setUrl4(doc.pictureURL4 ? doc.pictureURL4 : "");
        setOldUrl4(doc.pictureURL4 ? doc.pictureURL4 : "");
        setUrlBanner(doc.eventBanner ? doc.eventBanner : "");
        setOldUrlBanner(doc.eventBanner ? doc.eventBanner : "");
      })
    }
  }, [docsFromHook]);

  const file1UploadEventListener = (e) => {
    let uploadedFile = e.target.files[0];
    if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
      setUploadedPicFile1(uploadedFile);

      async function putFile(uploadedFile) {
        e.preventDefault();
        try {

          setUploadError1("");
          const storageRef = projectStorage.ref(`tournaments_pictures/${currentUser.uid || CurrentUserFromLS.uid}`).child(uploadedFile.name);
          storageRef.put(uploadedFile).on('state_changed', (err) => {
          }, (err) => {
            window.alert(err);
          }, async () => {
            const finalUrl = await storageRef.getDownloadURL();
            finalUrl !== undefined ? setFileSuccess1(true) : setFileSuccess1(false);
            setUrl1(finalUrl);
          });
        } catch {
          setUploadError1("Failed to upload file");
        }

      }

      putFile(uploadedFile).then(() => console.log(url1));
    } else {
      setUploadedPicFile1('');
      setFileTypeError1('Please select an image file (png or jpg)');
    }
  };

  const file2UploadEventListener = (e) => {
    let uploadedFile = e.target.files[0];
    if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
      setUploadedPicFile2(uploadedFile);

      async function putFile(uploadedFile) {
        e.preventDefault();
        try {
          setUploadError2("");
          const storageRef = projectStorage.ref(`tournaments_pictures/${currentUser.uid || CurrentUserFromLS.uid}`).child(uploadedFile.name);
          storageRef.put(uploadedFile).on('state_changed', (err) => {
          }, (err) => {
            window.alert(err);
          }, async () => {
            const finalUrl = await storageRef.getDownloadURL();
            finalUrl !== undefined ? setFileSuccess2(true) : setFileSuccess2(false);
            setUrl2(finalUrl);
          });
        } catch {
          setUploadError2("Failed to upload file");
        }

      }

      putFile(uploadedFile).then(() => console.log(url2));
    } else {
      setUploadedPicFile2('');
      setFileTypeError2('Please select an image file (png or jpg)');
    }
  };

  const file3UploadEventListener = (e) => {
    let uploadedFile = e.target.files[0];
    if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
      setUploadedPicFile3(uploadedFile);

      async function putFile(uploadedFile) {
        e.preventDefault();
        try {
          setUploadError3("");
          const storageRef = projectStorage.ref(`tournaments_pictures/${currentUser.uid || CurrentUserFromLS.uid}`).child(uploadedFile.name);
          storageRef.put(uploadedFile).on('state_changed', (err) => {
          }, (err) => {
            window.alert(err);
          }, async () => {
            const finalUrl = await storageRef.getDownloadURL();
            finalUrl !== undefined ? setFileSuccess3(true) : setFileSuccess3(false);
            setUrl3(finalUrl);
          });
        } catch {
          setUploadError3("Failed to upload file");
        }

      }

      putFile(uploadedFile).then(() => console.log(url3));
    } else {
      setUploadedPicFile3('');
      setFileTypeError3('Please select an image file (png or jpg)');
    }
  };

  const file4UploadEventListener = (e) => {
    let uploadedFile = e.target.files[0];
    if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
      setUploadedPicFile4(uploadedFile);

      async function putFile(uploadedFile) {
        e.preventDefault();
        try {

          setUploadError4("");
          const storageRef = projectStorage.ref(`tournaments_pictures/${currentUser.uid || CurrentUserFromLS.uid}`).child(uploadedFile.name);
          storageRef.put(uploadedFile).on('state_changed', (err) => {
          }, (err) => {
            window.alert(err);
          }, async () => {
            const finalUrl = await storageRef.getDownloadURL();
            finalUrl !== undefined ? setFileSuccess4(true) : setFileSuccess4(false);
            setUrl4(finalUrl);
          });
        } catch {
          setUploadError4("Failed to upload file");
        }

      }

      putFile(uploadedFile).then(() => console.log(url4));
    } else {
      setUploadedPicFile4('');
      setFileTypeError4('Please select an image file (png or jpg)');
    }
  };

  const fileWin1UploadEventListener = (e) => {
    let uploadedFile = e.target.files[0];
    if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
      setUploadedPicFileWin1(uploadedFile);

      async function putFile(uploadedFile) {
        e.preventDefault();
        try {

          setUploadedPicFileWin1("");
          const storageRef = projectStorage.ref(`tournaments_pictures/${currentUser.uid || CurrentUserFromLS.uid}`).child(uploadedFile.name);
          storageRef.put(uploadedFile).on('state_changed',
            async () => {
              const finalUrl = await storageRef.getDownloadURL();
              finalUrl !== undefined ? setFileSuccessWin1(true) : setFileSuccessWin1(false);
              setUrlWin1(finalUrl);
            });
        } catch {
          setUploadErrorWin1("Failed to upload file");
        }

      }

      putFile(uploadedFile).then(() => console.log(urlWin1));
    } else {
      setUploadedPicFileWin1("");
      setFileTypeErrorWin1("Please select an image file (png or jpg)");
    }
  };

  const fileWin2UploadEventListener = (e) => {
    let uploadedFile = e.target.files[0];
    if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
      setUploadedPicFileWin2(uploadedFile);

      async function putFile(uploadedFile) {
        e.preventDefault();
        try {
          setUploadErrorWin2("");
          const storageRef = projectStorage.ref(`tournaments_pictures/${currentUser.uid || CurrentUserFromLS.uid}`).child(uploadedFile.name);
          storageRef.put(uploadedFile).on('state_changed',
            async () => {
              const finalUrl = await storageRef.getDownloadURL();
              finalUrl !== undefined ? setFileSuccessWin2(true) : setFileSuccessWin2(false);
              setUrlWin2(finalUrl);
            });
        } catch {
          setUploadErrorWin2("Failed to upload file");
        }
      }

      putFile(uploadedFile).then(() => console.log(urlWin2));
    } else {
      setUploadedPicFileWin2('');
      setFileTypeErrorWin2('Please select an image file (png or jpg)');
    }
  };

  const fileBannerUploadEventListener = (e) => {
    let uploadedFile = e.target.files[0];
    if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
      setUploadedPicFileWin2(uploadedFile);

      async function putFile(uploadedFile) {
        e.preventDefault();
        try {
          setUploadErrorBanner("");
          const storageRef = projectStorage.ref(`tournaments_pictures/${currentUser.uid || CurrentUserFromLS.uid}`).child(uploadedFile.name);
          storageRef.put(uploadedFile).on('state_changed',
            async () => {
              const finalUrl = await storageRef.getDownloadURL();
              finalUrl !== undefined ? setFileSuccessBanner(true) : setFileSuccessBanner(false);
              setUrlBanner(finalUrl);
            });
        } catch {
          setUploadErrorBanner("Failed to upload file");
        }
      }

      putFile(uploadedFile).then(() => console.log(urlWin2));
    } else {
      setUploadedPicFileBanner('');
      setFileTypeErrorBanner('Please select an image file (png or jpg)');
    }
  };

  const clearInput = () => {
    const storageRef1 = uploadedPicFile1 ? projectStorage.ref(`tournaments_pictures/${currentUser.uid || CurrentUserFromLS.uid}`).child(uploadedPicFile1.name) : "";
    const storageRef2 = uploadedPicFile2 ? projectStorage.ref(`tournaments_pictures/${currentUser.uid || CurrentUserFromLS.uid}`).child(uploadedPicFile2.name) : "";
    const storageRef3 = uploadedPicFile3 ? projectStorage.ref(`tournaments_pictures/${currentUser.uid || CurrentUserFromLS.uid}`).child(uploadedPicFile3.name) : "";
    const storageRef4 = uploadedPicFile4 ? projectStorage.ref(`tournaments_pictures/${currentUser.uid || CurrentUserFromLS.uid}`).child(uploadedPicFile4.name) : "";
    const storageRefWin1 = uploadedPicFileWin1 ? projectStorage.ref(`tournaments_pictures/${currentUser.uid || CurrentUserFromLS.uid}`).child(uploadedPicFileWin1.name) : "";
    const storageRefWin2 = uploadedPicFileWin2 ? projectStorage.ref(`tournaments_pictures/${currentUser.uid || CurrentUserFromLS.uid}`).child(uploadedPicFileWin2.name) : "";
    const storageRefBanner = uploadedPicFileBanner ? projectStorage.ref(`tournaments_pictures/${currentUser.uid || CurrentUserFromLS.uid}`).child(uploadedPicFileBanner.name) : "";

    if (storageRefBanner) {
      storageRefBanner.delete().then(() => {
        console.log("uploaded image removed successfully");
      }).catch((error) => {
        console.log("could not delete the file because:" + error);
      });
    }

    if (storageRef1) {
      storageRef1.delete().then(() => {
        console.log("uploaded image removed successfully");
      }).catch((error) => {
        console.log("could not delete the file because:" + error);
      });
    }

    if (storageRef2) {
      storageRef1.delete().then(() => {
        console.log("uploaded image removed successfully");
      }).catch((error) => {
        console.log("could not delete the file because:" + error);
      });
    }

    if (storageRef3) {
      storageRef1.delete().then(() => {
        console.log("uploaded image removed successfully");
      }).catch((error) => {
        console.log("could not delete the file because:" + error);
      });
    }

    if (storageRef4) {
      storageRef1.delete().then(() => {
        console.log("uploaded image removed successfully");
      }).catch((error) => {
        console.log("could not delete the file because:" + error);
      });
    }

    if (storageRefWin1) {
      storageRef1.delete().then(() => {
        console.log("uploaded image removed successfully");
      }).catch((error) => {
        console.log("could not delete the file because:" + error);
      });
    }

    if (storageRefWin2) {
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
          "authorID": authorID,
          "eventBanner": eventBanner,
          "eventCategory": eventCategory,
          "eventStatus": eventStatus,
          "eventTitle": eventTitle,
          "eventWinner1": urlWin1,
          "eventWinner2": urlWin2,
          "eventInfoPage": eventInfoPageLink,
          "eventDate": eventDate,
          "eventVideoLink": eventVideoLink,
          "updatedAt": Date.now(),
          "createdAt": createdAt
        })
        .then(() => {
          window.alert("Event edited successfully!");
          history.push("/TournamentsPage", {from: "/ModeratorAddTournamentsForm"});
          return console.log("Event edited successfully.");
        })
        .catch((error) => {
          console.error(error.code + " " + error.message + "" + error.details);
        });
    }

    if (eventStatus === "passed" && eventCategory === "tournament") {
      collectionRef.set(
        {
          "authorID": authorID,
          "eventBanner": eventBanner,
          "eventCategory": eventCategory,
          "eventStatus": eventStatus,
          "eventTitle": eventTitle,
          "eventWinner1": urlWin1,
          "eventInfoPage": eventInfoPageLink,
          "eventDate": eventDate,
          "eventVideoLink": eventVideoLink,
          "updatedAt": Date.now(),
          "createdAt": createdAt
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
          "authorID": authorID,
          "eventBanner": eventBanner,
          "eventCategory": eventCategory,
          "eventStatus": eventStatus,
          "eventTitle": eventTitle,
          "eventInfoPage": eventInfoPageLink,
          "eventDate": eventDate,
          "eventVideoLink": eventVideoLink,
          "pictureURL1": url1,
          "pictureURL2": url2,
          "updatedAt": Date.now(),
          "createdAt": createdAt
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
          "authorID": authorID,
          "eventBanner": eventBanner,
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
          "updatedAt": Date.now(),
          "createdAt": createdAt
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
                {eventCategory !== '' ? eventCategory : "Event category"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setEventCategory("match")}>Match</Dropdown.Item>
                <Dropdown.Item onClick={() => setEventCategory("tournament")}>Tournament</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="form-dropdown">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {eventStatus !== '' ? eventStatus : "Event status"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setEventStatus("future")}>Future</Dropdown.Item>
                <Dropdown.Item onClick={() => setEventStatus("passed")}>Passed</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div>
            <div>
              Current banner:
              <img style={{width: "25%", height: "auto"}} src={oldUrlBanner} alt=""/>
            </div>
            <label className='form-update__label btn-upload btn-upload--tournament'> <span
              className='icon-upload2'></span> Event banner
              <input
                className='form-update__btn visually-hidden'
                type="file"
                placeholder='file'
                onChange={fileBannerUploadEventListener}
              />
              <div className="output">
                {uploadErrorBanner !== "" && <div className="error">{uploadErrorBanner}</div>}
                {fileTypeErrorBanner !== "" && <div className="error">{fileTypeErrorBanner}</div>}
                {fileSuccessBanner &&
                <div>Banner image uploaded successfully: <img style={{width: "25%", height: "auto"}} src={urlBanner}
                                                              alt=""/></div>}
              </div>
            </label>
          </div>

          <label className='form-update__label'>
            Event title
            <input
              className='form-update__input'
              type="text"
              value={eventTitle}
              onChange={
                (e) => setEventTitle(e.target.value)
              }
            />
          </label>

          {eventStatus === "future" &&
          <>
            <div>
              Current Picture1:
              <img style={{width: "25%", height: "auto"}} src={oldUrl1} alt=""/>
            </div>
            <label className='form-update__label btn-upload btn-upload--tournament'> <span
              className='icon-upload2'></span> Picture team 1
              <input
                className='form-update__btn visually-hidden'
                type="file"
                placeholder='file'
                onChange={file1UploadEventListener}
              />
              <div className="output">
                {uploadError1 !== "" && <div className="error">{uploadError1}</div>}
                {fileTypeError1 !== "" && <div className="error">{fileTypeError1}</div>}
                {fileSuccess1 &&
                <div>Image 1 Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url1} alt=""/>
                </div>}
              </div>
            </label>
            <div>
              Current Picture2:
              <img style={{width: "25%", height: "auto"}} src={oldUrl2} alt=""/>
            </div>
            <label className='form-update__label btn-upload btn-upload--tournament'> <span
              className='icon-upload2'></span> Picture team 2
              <input
                className='form-update__btn visually-hidden'
                type="file"
                placeholder='file'
                onChange={file2UploadEventListener}
              />
              <div className="output">
                {uploadError2 !== "" && <div className="error">{uploadError2}</div>}
                {fileTypeError2 !== "" && <div className="error">{fileTypeError2}</div>}
                {fileSuccess2 &&
                <div>Image 2 Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url2} alt=""/>
                </div>}
              </div>
            </label>
          </>
          }

          {(eventCategory === "tournament" && eventStatus === "future") &&
          <>
            <div>
              Current Picture3:
              <img style={{width: "25%", height: "auto"}} src={oldUrl3} alt=""/>
            </div>
            <label className='form-update__label btn-upload btn-upload--tournament'><span
              className='icon-upload2'></span> Picture team 3
              <input
                className='form-update__btn visually-hidden'
                type="file"
                placeholder='file'
                onChange={file3UploadEventListener}
              />
              <div className="output">
                {uploadError3 !== "" && <div className="error">{uploadError3}</div>}
                {fileTypeError3 !== "" && <div className="error">{fileTypeError3}</div>}
                {fileSuccess3 &&
                <div>Image 3 Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url3} alt=""/>
                </div>}
              </div>
            </label>

            <div>
              Current Picture4:
              <img style={{width: "25%", height: "auto"}} src={oldUrl4} alt=""/>
            </div>
            <label className='form-update__label btn-upload btn-upload--tournament'> <span
              className='icon-upload2'></span> Picture team 4
              <input
                className='form-update__btn visually-hidden'
                type="file"
                placeholder='file'
                onChange={file4UploadEventListener}
              />
              <div className="output">
                {uploadError4 !== "" && <div className="error">{uploadError4}</div>}
                {fileTypeError4 !== "" && <div className="error">{fileTypeError4}</div>}
                {fileSuccess4 &&
                <div>Image 4 Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url4} alt=""/>
                </div>}
              </div>
            </label>
          </>
          }
          {eventVideoLink &&
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
                (e) => setEventVideoLink(e.target.value)
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
                (e) => setEventInfoPageLink(e.target.value)
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
                (e) => setEventDate(Date.parse(e.target.value))
              }
            />
          </label>

          {eventStatus === "passed" &&
          <>
            <div>
              Current Winner 1:
              <img style={{width: "25%", height: "auto"}} src={oldUrlWin1} alt=""/>
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
                onChange={fileWin1UploadEventListener}
              />
              <div className="output">
                {uploadErrorWin1 !== "" && <div className="error">{uploadErrorWin1}</div>}
                {fileTypeErrorWin1 !== "" && <div className="error">{fileTypeErrorWin1}</div>}
                {fileSuccessWin1 &&
                <div>Image Win1 Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={urlWin1}
                                                            alt=""/></div>}
              </div>
            </label>
          </>
          }
          {(eventStatus === "passed" && eventCategory === "match") &&
          <>
            <div>
              Current Winner 2:
              <img style={{width: "25%", height: "auto"}} src={oldUrlWin2} alt=""/>
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
                onChange={fileWin2UploadEventListener}
              />
              <div className="output">
                {uploadErrorWin2 !== "" && <div className="error">{uploadErrorWin2}</div>}
                {fileTypeErrorWin2 !== "" && <div className="error">{fileTypeErrorWin2}</div>}
                {fileSuccessWin2 &&
                <div>Image Win2 Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={urlWin2}
                                                            alt=""/></div>}
              </div>

            </label>
          </>
          }

          <button
            className="form-article__btn"
            onClick={() => editTournamentWithFBCallback()}
          >
            Submit
          </button>
          {/*<button style={{marginTop: "1em"}}*/}
          {/*        className="form-article__btn"*/}
          {/*        onClick={()=>clearInput()}*/}
          {/*>*/}
          {/*    Cancel*/}
          {/*</button>*/}
        </form>
      </div>
    </>
  );
}