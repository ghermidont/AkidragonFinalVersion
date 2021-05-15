import React, {useState} from 'react';
//import {useArticlesContext} from "../../../context/ArticlesContext";
import {projectStorage, functions} from "../../../fireBase";
import {useHistory} from 'react-router-dom';
//import {useAuthContext} from "../../../context/AuthContext";
//import {Dropdown} from "react-bootstrap";

export default function AddArticlesForm() {
  console.log("AddArticlesPage worked");

  // const {currentUser} = useAuthContext();
  // const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
  const [error, setError] = useState("");
  const fileTypesArray = ['image/png', 'image/jpeg'];
  const history = useHistory();
  const [ENTitle, setENTitle] = useState('');
  const [ENDescription, setENDescription] = useState('');
  const [ENText, setENText] = useState('');
  const [ITTitle, setITTitle] = useState('');
  const [ITDescription, setITDescription] = useState('');
  const [ITText, setITText] = useState('');
  const [loading, setLoading] = useState(true);
  const [fileSuccess, setFileSuccess] = useState(false);
  const [uploadedPicFile, setUploadedPicFile] = useState('');
  const [url, setUrl] = useState('');
  const [videoGamesSwitch, setVideoGamesSwitch] = useState(0);
  const [musicSwitch, setMusicSwitch] = useState(0);
  const [moviesSwitch, setMoviesSwitch] = useState(0);
  const categoryArr = [videoGamesSwitch===1?"videogames":"", moviesSwitch===1?"movies":"", musicSwitch===1?"music":""];

  const fileUploadEventListener = (e) => {
        //setCategoriesArr(inputArr);
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
                    const storageRef = projectStorage.ref('articles_pictures/').child(uploadedFile.name);
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

  const publishArticleCFTrigger = (e) => {
    const addData = functions.httpsCallable('publishArticle');

    if(loading === false) {
        addData({
            "content": {
                "en": {
                    "description": ENDescription,
                    "text": ENText,
                    "title": ENTitle
                },
                "it": {
                    "description": ITDescription,
                    "text": ITText,
                    "title": ITTitle
                },
                "image": url,
            },
            "categories": categoryArr.filter(value=>value!=="")

        })
            .then((result) => {
                    window.alert("Article added successfully!");
                    history.push("/UserProfilePage", {from: "/AddArticlesForm"});
                    return console.log("TEMP-article collection added successfully.");
                }
            ).catch((error) => {
            console.log(error.code + " " + error.message + "" + error.details);
        });
      }
      e.preventDefault();
    }

    //Clears all the in puts of the form and deletes the uploaded file:
  const clearInput = () => {
      //setArticleCategory("");
      setENDescription("");
      setENText("");
      setENTitle("");
      setITDescription("");
      setITText("");
      setITTitle("");
      setUploadedPicFile('');
      setUrl('');
      setFileSuccess(false);
      setVideoGames("");
      setMovies("");
      setMusic("");
      // setCategoriesArr([]);
      // inputArr=[];

      const desertRef = projectStorage.ref('articles_pictures/').child(uploadedPicFile.name);
      if(desertRef) {
          desertRef.delete().then(() => {
              console.log("uploaded image removed successfully");
          }).catch((error) => {
              console.log("could not delete the file because:" + error);
          });
      }
  }

  //Checkboxes switch variables:
  //   let i = 0;
  //   let n = 0;
  //   let y = 0;

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
                      }
                  />
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

            <div className="form-article__checkbox-title form-article__label">
                Article category:
            </div>

            <label className="form-article__label-check">
                <input
                    type="checkbox"
                    onChange={()=>videoGamesSwitch===0?setVideoGamesSwitch(1):setVideoGamesSwitch(0)}
                /> Video game
            </label>

            <label className="form-article__label-check">
                <input
                    type="checkbox"
                    onChange={()=>musicSwitch===0?setMusicSwitch(1):setMusicSwitch(0)}
                /> Music
            </label>

            <label className="form-article__label-check">
                <input
                    type="checkbox"
                    onChange={()=>moviesSwitch===0?setMoviesSwitch(1):setMoviesSwitch(0)}
                /> Movie
           </label>

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
                  onClick={publishArticleCFTrigger}
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

//RESERVE CODE:

//   const addArticlesWithFBcallback = () => {
//    const collectionRef = projectFirestore.collection('TEMP-articles').doc();
//    if(loading === false) {
//        collectionRef.set(
//            {
//                authorID: currentUser ? currentUser.uid : CurrentUserFromLS.uid,
//                category: articleCategory,
//                en: {
//                    description: ENDescription,
//                    text: ENText,
//                    title: ENTitle,
//                },
//                it: {
//                    description: ITDescription,
//                    text: ITText,
//                    title: ITTitle,
//                },
//                createdAt: timestamp,
//                imageURL: url
//            })
//            .then(() => {
//                window.alert("Article added successfully!");
//                history.push("/UserProfilePage", {from: "/AddArticlesForm"});
//                return console.log("TEMP-article collection added successfully.");
//            })
//            .catch((error) => {
//                console.error("Error updating document: ", error);
//            });
//    }
// }

{/*  <Dropdown>*/}
{/*      <Dropdown.Toggle variant="success" id="dropdown-basic">*/}
{/*          Article category*/}
{/*      </Dropdown.Toggle>*/}
{/*      <Dropdown.Menu>*/}
{/*          <Dropdown.Item onClick={()=>setArticleCategory("videogames")}>Videogames</Dropdown.Item>*/}
{/*          <Dropdown.Item onClick={()=>setArticleCategory("music")}>Music</Dropdown.Item>*/}
{/*          <Dropdown.Item onClick={()=>setArticleCategory("movies")}>Movies</Dropdown.Item>*/}
{/*      </Dropdown.Menu>*/}
{/*  </Dropdown>*/}

// Removing dublicate values
// [...new Set(inputArrUpd)]