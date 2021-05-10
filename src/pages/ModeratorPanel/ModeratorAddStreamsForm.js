import React, {useState} from 'react';
//import {useArticlesContext} from "../../context/ArticlesContext";
import {projectFirestore, projectStorage, timestamp} from "../../fireBase";
import {useHistory} from 'react-router-dom';
import {useAuthContext} from "../../context/AuthContext";
import {Dropdown} from "react-bootstrap";
import Loader from "react-loader-spinner";

export default function ModeratorAddStreamsForm(){
  console.log("AddArticlesPage worked");

  const [error, setError] = useState(null);
  const fileTypesArray = ['image/png', 'image/jpeg'];
  const history = useHistory();
  const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
  const[streamCategory, setStreamCategory] = useState('');
  //const [imageURL, setImageURL] = useState('');
  const [videoURL, setVideoURL] = useState('');
  const [loading, setLoading] = useState(true);
  const {currentUser} = useAuthContext();
  const [url, setUrl] = useState('');

  const fileUploadEventListener = (e) => {
    let uploadedFile = e.target.files[0];
    //'image/png', 'image/jpeg' are also some default values we can see in the uploadedFilesArray object.
    if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
      //setUploadedPicFile(uploadedFile);
      //setAddArticlesFormUserUploadedFile(uploadedFilesArray);
      async function putFile(uploadedFile){
        e.preventDefault()
        try {
          setLoading(true);
          setError("");
          const storageRef = projectStorage.ref('streams_pictures/').child(JSON.stringify(timestamp)+uploadedFile.name);//file.name
          storageRef.put(uploadedFile).on('state_changed', (err) => {
          },  (err) => {
            window.alert(err);
          });
          let finalUrl;
          finalUrl = await storageRef.getDownloadURL();
          await setUrl(finalUrl);

          console.log(url);
        } catch {
          setError("Failed to upload file");
        }
        setLoading(false);
      }
      putFile(uploadedFile).then(()=>console.log(url));
    } else {
      //reset the value.
      //setUploadedPicFile('');
      //setAddArticlesFormUserUploadedFile(null);
      setError('Please select an image file (png or jpg)');
    }
  };

  const addStreamsWithFBCallback = () => {
    const collectionRef = projectFirestore.collection('TEMP-streams').doc();
    if(loading === false) {
      collectionRef.set(
          {
            authorID: currentUser ? currentUser.uid : CurrentUserFromLS.uid,
            category: streamCategory,
            videoURL: videoURL,
            imageURL: url,
            createdAt: timestamp,
          })
          .then(() => {
            window.alert("Stream added successfully!");
            history.push("/UserProfilePage", {from: "/ModeratorAddStreamsForm"});
            return console.log("To TEMP-streams collection added successfully!");
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
    }
  }

  return (
    <>
      <div className='form-update__body form-login__body'>
        <h1 className="title form-title">Add Stream</h1>
        <form className="form-update">
          <label className='form-update__label'>
            Video URL
            <input
                className='form-update__input'
                type="text"
                required
                onChange={
                  (e)=>setVideoURL(e.target.value)
                }
            />
          </label>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Stream category
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={()=>setStreamCategory("entertainment")}>Entertainment</Dropdown.Item>
              <Dropdown.Item onClick={()=>setStreamCategory("tournaments")}>Tournaments</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div className="form-article__box-btn">
            <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Upload thumbnail
              <input
                  className='form-article__btn visually-hidden'
                  type="file"
                  placeholder='file'
                  onChange={fileUploadEventListener}
              />
            </label>
            {loading&&<Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} //3 secs
          />}
            <div className="output">
              { error && <div className="error">{ error }</div>}
            </div>
            <button
                className="form-article__btn"
                onClick={addStreamsWithFBCallback}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}