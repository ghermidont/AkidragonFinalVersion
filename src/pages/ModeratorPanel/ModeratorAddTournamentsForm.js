import React, {useState} from 'react';
import {projectFirestore, projectStorage, timestamp} from "../../fireBase";
import {useHistory} from 'react-router-dom';
import {useAuthContext} from "../../context/AuthContext";
import {Dropdown} from "react-bootstrap";

export default function ModeratorAddTournamentsForm() {
  console.log("AddTournamentsPage worked");

  const {currentUser} = useAuthContext();
  //const {setAddArticlesFormUserUploadedFile} = useArticlesContext();
  const [error1, setError1] = useState(null);
  const [error2, setError2] = useState(null);
  const [error3, setError3] = useState(null);
  const [error4, setError4] = useState(null);
  const [errorImage, setErrorImage] = useState(null);
  const [errorWinner1, setErrorWinner1] = useState(null);
  const [errorWinner2, setErrorWinner2] = useState(null);
  const fileTypesArray = ['image/png', 'image/jpeg'];
  const history = useHistory();
  const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));

  const [eventCategory, setEventCategory] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventStatus, setEventStatus] = useState('');
  const [eventVideoLink, setEventVideoLink] =useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventInfoPage, setEventInfoPage] = useState('');
  const [pictureURLWinner1, setPictureURLWinner1] = useState([]);
  const [pictureURLWinner2, setPictureURLWinner2] = useState([]);
  const [pictureURL1, setPictureURL1] = useState([]);
  const [pictureURL2, setPictureURL2] = useState([]);
  const [pictureURL3, setPictureURL3] = useState([]);
  const [pictureURL4, setPictureURL4] = useState([]);
  const [loadingFile1, setLoadingFile1] = useState(true);
  const [loadingFile2, setLoadingFile2] = useState(true);
  const [loadingFile3, setLoadingFile3] = useState(true);
  const [loadingFile4, setLoadingFile4] = useState(true);
  const [loadingFileWinner1, setloadingFileWinner1] = useState(true);
  const [loadingFileWinner2, setloadingFileWinner2] = useState(true);

  //use the event object. 'target' is the imported object. [0] is because we want the first element of the array and the only one in our case.
  //'e' stands for the event Object that we get automatically.
  const file1UploadEventListener = (e) => {
    let uploadedFile = e.target.files[0];
    //'image/png', 'image/jpeg' are also some default values we can see in the uploadedFilesArray object.
    if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
      //setUploadedPicFile(uploadedFile);
      //setAddArticlesFormUserUploadedFile(uploadedFilesArray);
      async function putFile(uploadedFile){
        e.preventDefault()
        try {
          setLoadingFile1(true);
          setError1("");
          const storageRef = projectStorage.ref('tournaments_pictures/').child(JSON.stringify(timestamp)+uploadedFile.name);//file.name
          storageRef.put(uploadedFile).on('state_changed', (err) => {
          },  (err) => {
            window.alert(err);
          });
          let finalUrl;
          finalUrl = await storageRef.getDownloadURL();
          await setPictureURL1(finalUrl);

          console.log(pictureURL1);
        } catch {
          setError1("Failed to upload file");
        }
        setLoadingFile1(false);
      }
      putFile(uploadedFile).then(()=>console.log("picture 1 loaded"));
    } else {
       setErrorImage('Please select an image file (png or jpg)');
    }
  };

  const file2UploadEventListener = (e) => {
    let uploadedFile = e.target.files[0];
    //'image/png', 'image/jpeg' are also some default values we can see in the uploadedFilesArray object.
    if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
      //setUploadedPicFile(uploadedFile);
      //setAddArticlesFormUserUploadedFile(uploadedFilesArray);
      async function putFile(uploadedFile){
        e.preventDefault()
        try {
          setLoadingFile2(true);
          setError2("");
          const storageRef = projectStorage.ref('tournaments_pictures/').child(JSON.stringify(timestamp)+uploadedFile.name);//file.name
          storageRef.put(uploadedFile).on('state_changed', (err) => {
          },  (err) => {
            window.alert(err);
          });
          let finalUrl;
          finalUrl = await storageRef.getDownloadURL();
          await setPictureURL2(finalUrl);
          console.log(pictureURL2);
        } catch {
          setError2("Failed to upload file");
        }
        setLoadingFile2(false);
      }
      putFile(uploadedFile).then(()=>console.log("picture 2 loaded"));
    } else {
      //reset the value.
      //setUploadedPicFile('');
      //setAddArticlesFormUserUploadedFile(null);
      setErrorImage('Please select an image file (png or jpg)');
    }
  };

  const file3UploadEventListener = (e) => {
    let uploadedFile = e.target.files[0];
    //'image/png', 'image/jpeg' are also some default values we can see in the uploadedFilesArray object.
    if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
      //setUploadedPicFile(uploadedFile);
      //setAddArticlesFormUserUploadedFile(uploadedFilesArray);
      async function putFile(uploadedFile){
        e.preventDefault()
        try {
          setLoadingFile3(true);
          setError3("");
          const storageRef = projectStorage.ref('tournaments_pictures/').child(JSON.stringify(timestamp)+uploadedFile.name);//file.name
          storageRef.put(uploadedFile).on('state_changed', (err) => {
          },  (err) => {
            window.alert(err);
          });
          let finalUrl;
          finalUrl = await storageRef.getDownloadURL();
          await setPictureURL3(finalUrl);
          console.log(pictureURL3);
        } catch {
          setError3("Failed to upload file");
        }
        setLoadingFile3(false);
      }
      putFile(uploadedFile).then(()=>console.log("picture 3 loaded"));
    } else {
      setErrorImage('Please select an image file (png or jpg)');
    }
  };

  const file4UploadEventListener = (e) => {
    let uploadedFile = e.target.files[0];
    if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
       async function putFile(uploadedFile){
        e.preventDefault()
        try {
          setLoadingFile4(true);
          setError4("Failed to upload file");
          const storageRef = projectStorage.ref('tournaments_pictures/').child(JSON.stringify(timestamp)+uploadedFile.name);//file.name
          storageRef.put(uploadedFile).on('state_changed', (err) => {
          },  (err) => {
            window.alert(err);
          });
          let finalUrl;
          finalUrl = await storageRef.getDownloadURL();
          await setPictureURL4(finalUrl);
          console.log(pictureURL4);
        } catch {
          setError3("Failed to upload file");
        }
        setLoadingFile4(false);
      }
      putFile(uploadedFile).then(()=>console.log("picture 4 loaded"));
    } else {
       setErrorImage('Please select an image file (png or jpg)');
    }
  };

  const fileWinner1UploadEventListener = (e) => {
    let uploadedFile = e.target.files[0];
    if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
      async function putFile(UploadedFile){
        e.preventDefault()
        try {
          setloadingFileWinner1(true);
          setErrorWinner1("Failed to upload file");
          const storageRef = projectStorage.ref('tournaments_pictures/').child(JSON.stringify(timestamp)+UploadedFile.name);//file.name
          storageRef.put(UploadedFile).on('state_changed', (err) => {
          },  (err) => {
            window.alert(err);
          });
          let finalUrl;
          finalUrl = await storageRef.getDownloadURL();
          await setPictureURLWinner1(finalUrl);
          console.log(pictureURLWinner1);
        } catch {
          setErrorWinner1("Failed to upload file");
        }
        setloadingFileWinner1(false);
      }
      putFile(uploadedFile).then(()=>console.log("picture Winner1 loaded"));
    } else {
      setErrorImage('Please select an image file (png or jpg)');
    }
  };

  const fileWinner2UploadEventListener = (e) => {
    let uploadedFile = e.target.files[0];
    if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
      async function putFile(UploadedFile){
        e.preventDefault()
        try {
          setloadingFileWinner2(true);
          setErrorWinner2('');
          const storageRef = projectStorage.ref('tournaments_pictures/').child(JSON.stringify(timestamp)+UploadedFile.name);//file.name
          storageRef.put(UploadedFile).on('state_changed', (err) => {
          },  (err) => {
            window.alert(err);
          });
          let finalUrl;
          finalUrl = await storageRef.getDownloadURL();
          await setPictureURLWinner2(finalUrl);
          console.log(pictureURLWinner2);
        } catch {
          setErrorWinner2("Failed to upload file");
        }
        setloadingFileWinner2(false);
      }
      putFile(uploadedFile).then(()=>console.log("picture Winner2 loaded"));
    } else {
      setErrorImage('Please select an image file (png or jpg)');
    }
  };

  const addTournamentWithFBCallback = () => {
    const collectionRef = projectFirestore.collection('TEMP-tournaments').doc();
    if( (loadingFile1=== false &&
        loadingFile2=== false &&
        loadingFile3=== false &&
        loadingFile4=== false) ||
       (loadingFile1=== false &&
        loadingFile2=== false) ||
        (loadingFile3=== false &&
        loadingFile4=== false) ||
        loadingFileWinner1 === false ||
        ( loadingFileWinner1 === false &&
          loadingFileWinner2 === false)
    ) {
      collectionRef.set(
          {
            authorID: currentUser ? currentUser.uid : CurrentUserFromLS.uid,
            eventCategory: eventCategory,
            eventStatus: eventStatus,
            eventTitle: eventTitle,
            eventWinner1: pictureURLWinner1,
            eventWinner2: pictureURLWinner2,
            eventInfoPage: eventInfoPage,
            eventDate: eventDate,
            eventVideoLink: eventVideoLink,
            pictureURL1: pictureURL1,
            pictureURL2: pictureURL2,
            pictureURL3: pictureURL3,
            pictureURL4: pictureURL4,
            createdAt: timestamp
          })
          .then(() => {
            window.alert("Tournament added successfully!");
            console.log(eventDate);
            history.push("/UserProfilePage", {from: "/ModeratorAddTournamentsForm"});
            return console.log("TEMP-tournaments document added successfully.");
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
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
                Event category
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
                Event status
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
                required
                onChange={
                  (e)=>setEventTitle(e.target.value)
                }
            />
          </label>

          {eventStatus==="future"&&
          <>
          <label className='form-update__label btn-upload btn-upload--tournament'> <span className='icon-upload2'></span> Picture team 1
            <input
                className='form-update__btn visually-hidden'
                type="file"
                placeholder='file'
                onChange={file1UploadEventListener}
            />
            <div className="output">
              { error1 && <div className="error">{ error1 }</div>}
              { errorImage && <div className="error">{ errorImage }</div>}
            </div>
          </label>
          <label className='form-update__label btn-upload btn-upload--tournament'> <span className='icon-upload2'></span> Picture team 2
            <input
                className='form-update__btn visually-hidden'
                type="file"
                placeholder='file'
                onChange={file2UploadEventListener}
            />
            <div className="output">
              { error2 && <div className="error">{ error2 }</div>}
              { errorImage && <div className="error">{ errorImage }</div>}
            </div>
          </label>
          </>
          }

          {(eventCategory==="tournament"&&eventStatus==="future")&&
              <>
            <label className='form-update__label btn-upload btn-upload--tournament'><span className='icon-upload2'></span> Picture team 3
              <input
                  className='form-update__btn visually-hidden'
                  type="file"
                  placeholder='file'
                  onChange={file3UploadEventListener}
              />
              <div className="output">
                { error3 && <div className="error">{ error3 }</div>}
                { errorImage && <div className="error">{ errorImage }</div>}
              </div>
            </label>

            <label className='form-update__label btn-upload btn-upload--tournament'> <span className='icon-upload2'></span> Picture team 4
              <input
                  className='form-update__btn visually-hidden'
                  type="file"
                  placeholder='file'
                  onChange={file4UploadEventListener}
              />
              <div className="output">
                { error4 && <div className="error">{ error4 }</div>}
                { errorImage && <div className="error">{ errorImage }</div>}
              </div>
            </label>

            </>
          }

          <label className='form-update__label'>
            Video Link
            <input
                className='form-update__input'
                type="text"
                required
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
                required
                onChange={
                  (e)=>setEventInfoPage(e.target.value)
                }
            />
          </label>

          <label className='form-update__label'>
            Date/Hour
            <input
                className='form-update__input date'
                type="text"
                // min="2021-05-03"
                // max="2022-12-31"
                onChange={
                  (e)=>setEventDate(e.target.value)
                }
            />
          </label>

          {eventStatus === "passed" &&
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
                onChange={fileWinner1UploadEventListener}
            />
            <div className="output">
              { errorWinner1 && <div className="error">{ errorWinner1 }</div>}
              { errorImage && <div className="error">{ errorImage }</div>}
            </div>
          </label>
          }
          {(eventStatus === "passed" && eventCategory === "match")&&
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
                onChange={fileWinner2UploadEventListener}
            />
            <div className="output">
              { errorWinner2 && <div className="error">{ errorWinner2 }</div>}
              { errorImage && <div className="error">{ errorImage }</div>}
            </div>

          </label>
          }

          <button
              className="form-article__btn"
              onClick={addTournamentWithFBCallback}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}