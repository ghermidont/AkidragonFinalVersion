import React, {useState} from 'react';
//import {useArticlesContext} from "../../../context/ArticlesContext";
import {projectFirestore, projectStorage, timestamp} from "../../../fireBase";
import {useHistory} from 'react-router-dom';
import {useAuthContext} from "../../../context/AuthContext";
import {Dropdown} from "react-bootstrap";

export default function AddArticlesForm() {
  console.log("AddArticlesPage worked");

  const {currentUser} = useAuthContext();
  const [error, setError] = useState("");
  const fileTypesArray = ['image/png', 'image/jpeg'];
  const history = useHistory();
  const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
  const [ENTitle, setENTitle] = useState('');
  const [ENDescription, setENDescription] = useState('');
  const [ENText, setENText] = useState('');
  const [ITTitle, setITTitle] = useState('');
  const [ITDescription, setITDescription] = useState('');
  const [ITText, setITText] = useState('');
  // const [videoGames, setVideoGames] = useState('');
  // const [movies, setMovies] = useState('');
  // const [music, setMusic] = useState('');
  const [loading, setLoading] = useState(true);
  const [articleCategory, setArticleCategory] = useState('');
  const [fileSuccess, setFileSuccess] = useState(false);
  // const categoryArr = [videoGames==="on"?"Video games":"", movies==="on"?"Movies":"", music==="on"?"Music":""];
  const [uploadedPicFile, setUploadedPicFile] = useState('');
  //const [fileUploadError, setFileUploadError] = useState('');
  const [url, setUrl] = useState('');

    //const {setUserPictureUrl} = useAuthContext();
  //use the event object. 'target' is the imported object. [0] is because we want the first element of the array and the only one in our case.
  //'e' stands for the event Object that we get automatically.

    const fileUploadEventListener = (e) => {
        let uploadedFile = e.target.files[0];
        //'image/png', 'image/jpeg' are also some default values we can see in the uploadedFilesArray object.
        if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
            setUploadedPicFile(uploadedFile);
            //setAddArticlesFormUserUploadedFile(uploadedFilesArray);
            async function putFile(uploadedFile){
                e.preventDefault();
                try {
                    setLoading(true);
                    setError("");
                    const storageRef = projectStorage.ref('articles_pictures/').child(uploadedFile.name);//file.name
                    storageRef.put(uploadedFile).on('state_changed', (err) => {
                    },  (err) => {
                        window.alert(err);
                    }, async()=>{
                    const finalUrl = await storageRef.getDownloadURL();
                    finalUrl!==undefined?setFileSuccess(true):setFileSuccess(false);
                    setUrl(finalUrl);
                    });
                } catch {
                    setError("Failed to upload file");
                }
                setLoading(false);
            }
            putFile(uploadedFile).then(()=>console.log(url));
        } else {

            setUploadedPicFile('');
            //setAddArticlesFormUserUploadedFile(null);
            setError('Please select an image file (png or jpg)');
        }
    };

  const addArticlesWithFBcallback = () => {
     const collectionRef = projectFirestore.collection('TEMP-articles').doc();
     if(loading === false) {
         collectionRef.set(
             {
                 authorID: currentUser ? currentUser.uid : CurrentUserFromLS.uid,
                 category: articleCategory,
                 en: {
                     description: ENDescription,
                     text: ENText,
                     title: ENTitle,
                 },
                 it: {
                     description: ITDescription,
                     text: ITText,
                     title: ITTitle,
                 },
                 createdAt: timestamp,
                 imageURL: url
             })
             .then(() => {
                 window.alert("Article added successfully!");
                 history.push("/UserProfilePage", {from: "/AddArticlesForm"});
                 return console.log("TEMP-article collection added successfully.");
             })
             .catch((error) => {
                 console.error("Error updating document: ", error);
             });
     }
  }

  const clearInput = () => {
      setArticleCategory("");
      setENDescription("");
      setENText("");
      setENTitle("");
      setITDescription("");
      setITText("");
      setITTitle("");
      setUploadedPicFile('');
      setUrl('');
      setFileSuccess(false);
      const desertRef = projectStorage.ref('articles_pictures/').child(uploadedPicFile.name);
      if(desertRef) {
          desertRef.delete().then(() => {
              console.log("uploaded image removed successfully")
          }).catch((error) => {
              console.log("could not delete the file because:" + error);
          });
      }
  }

  return (
    <>
      <section style={{paddingTop: "20em"}}>
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
                  Title
                  <input
                      className='form-article__input'
                      type="text"
                      required
                      value={ITTitle}
                      onChange={
                        (e)=>setITTitle(e.target.value)
                      }/>
                </label>
                <label className='form-article__label'>
                  Description
                  <textarea
                      className='form-article__input'
                      rows='1'
                      name="text"
                      value={ITDescription}
                      onChange={
                        (e)=>setITDescription(e.target.value)
                      }
                  ></textarea>
                </label>

                <div className="form-article__checkbox-title form-article__label">
                  Category
                </div>

                {/*<label className="form-article__label-check">*/}
                {/*  <input*/}
                {/*      type="checkbox"*/}
                {/*      onChange={*/}
                {/*    (e)=>setVideoGames(e.target.value)*/}
                {/*  }/> Video game*/}
                {/*</label>*/}

                {/*<label className="form-article__label-check">*/}
                {/*  <input*/}
                {/*      type="checkbox"*/}
                {/*      onChange={*/}
                {/*    (e)=>setMusic(e.target.value)*/}
                {/*  }*/}
                {/*  />*/}
                {/*    Music*/}
                {/*</label>*/}

                {/*<label className="form-article__label-check">*/}
                {/*  <input*/}
                {/*      type="checkbox"*/}
                {/*      onChange={*/}
                {/*        (e)=>setMovies(e.target.value)*/}
                {/*      }*/}
                {/*  />*/}
                {/*  Movie*/}
                {/*</label>*/}
                  <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Article category
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                          <Dropdown.Item onClick={()=>setArticleCategory("videogames")}>Videogames</Dropdown.Item>
                          <Dropdown.Item onClick={()=>setArticleCategory("music")}>Music</Dropdown.Item>
                          <Dropdown.Item onClick={()=>setArticleCategory("movies")}>Movies</Dropdown.Item>
                      </Dropdown.Menu>
                  </Dropdown>
                <label className='form-article__label'>
                  Content
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
                  Title
                  <input
                      className='form-article__input'
                      type="text"
                      required
                      value={ENTitle}
                      onChange={
                        (e)=>setENTitle(e.target.value)
                      }/>
                </label>
                <label className='form-article__label'>
                  Description
                  <textarea
                      className='form-article__input'
                      rows='1'
                      name="text"
                      value={ENDescription}
                      required
                      onChange={
                        (e)=>setENDescription(e.target.value)
                      }
                  ></textarea>
                </label>

                <div className="form-article__checkbox-title form-article__label">
                  Category
                </div>

                {/*<label className="form-article__label-check">*/}
                {/*  <input*/}
                {/*      type="checkbox"*/}
                {/*      onChange={*/}
                {/*        (e)=>setVideoGames(e.target.value)*/}
                {/*      }*/}
                {/*  /> Video game*/}
                {/*</label>*/}
                {/*<label className="form-article__label-check">*/}
                {/*  <input*/}
                {/*      type="checkbox"*/}
                {/*      onChange={*/}
                {/*        (e)=>setMusic(e.target.value)*/}
                {/*      }*/}
                {/*  /> Music*/}
                {/*</label>*/}
                {/*<label className="form-article__label-check">*/}
                {/*  <input*/}
                {/*      type="checkbox"*/}
                {/*      onChange={*/}
                {/*        (e)=>setMovies(e.target.value)*/}
                {/*      }*/}
                {/*  /> Movie*/}
                {/*</label>*/}
                  <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Article category
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                          <Dropdown.Item onClick={()=>setArticleCategory("videogames")}>Videogames</Dropdown.Item>
                          <Dropdown.Item onClick={()=>setArticleCategory("music")}>Music</Dropdown.Item>
                          <Dropdown.Item onClick={()=>setArticleCategory("movies")}>Movies</Dropdown.Item>
                      </Dropdown.Menu>
                  </Dropdown>
                <label className='form-article__label'>
                  Content
                  <textarea
                      className='form-article__input'
                      rows='2'
                      name="countent"
                      value={ENText}
                      required
                      onChange={
                        (e)=>setENText(e.target.value)
                      }
                  ></textarea>
                </label>
              </form>
            </div>
          </div>

            <div className="form-article__box-btn">
              <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Upload
                <input
                    className='form-article__btn visually-hidden'
                    type="file"
                    placeholder='file'
                    onChange={fileUploadEventListener}
                />
              </label>
              <div className="output">
                { error && <div className="error">{ error }</div>}
                  {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url} alt=""/></div> }
              </div>
              <button
                  className="form-article__btn"
                  onClick={addArticlesWithFBcallback}
              >
                Publish
              </button>
                <button
                    className="form-article__btn"
                    onClick={clearInput}
                >
                    Cancel
                </button>
            </div>
        </div>
      </section>
    </>
  );
}