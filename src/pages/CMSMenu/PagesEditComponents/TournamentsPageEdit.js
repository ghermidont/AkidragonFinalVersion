import React, {useRef, useState} from 'react';
import {useHistory} from "react-router-dom";
import {functions, projectFirestore, projectStorage} from "../../../fireBase";

export default function TournamentsPageEdit() {
    let publishBtnRef = useRef();
    let cancelBtnRef = useRef();
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
    const [setBannerText] = useState('');
    const [setFooterMessage] = useState('');

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

    const writeToFBCallback = (e) => {
        const collectionRef = projectFirestore.collection('streams').doc();

        if(loading === false) {
            collectionRef.set(
                {
                    "authorID": currentUser ? currentUser.uid : CurrentUserFromLS.uid,
                    "category": streamCategory,
                    "videoURL": videoURL,
                    "imageURL": url,
                    "createdAt": Date.now()
                })
                .then(() => {
                    window.alert("Stream added successfully!");
                    history.push("/UserProfilePage", {from: "/ModeratorAddStreamsForm"});
                    return console.log("To streams collection added successfully!");
                })
                .catch((error) => {
                    console.error(error.code + " " + error.message + "" + error.details);
                });
        }
        e.preventDefault();
    }

    //Clears all the in puts of the form and deletes the uploaded file:
    const clearInput = () => {
        setUploadedPicFile('');
        setUrl('');
        setBannerText("");
        setFooterMessage("");
        setFileSuccess(false);

        const desertRef = projectStorage.ref('articles_pictures/').child(uploadedPicFile.name);

        if(desertRef){
            desertRef.delete().then(() => {
                console.log("uploaded image removed successfully");
            }).catch((error) => {
                console.log("could not delete the file because:" + error);
            });
        }
        history.push("/UserProfilePage", {from: "/AddArticlesForm"});
    }

    return (
        <style>
            <center><h1>Edit <strong>Tournaments Page</strong> static content:</h1></center>
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
                                        required
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
                                        required
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
                    <div className="form-article__box-btn">
                        <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Upload
                            <input
                                className='form-article__btn visually-hidden'
                                type="file"
                                required
                                placeholder='file'
                                onChange={fileUploadEventListener}
                            />
                        </label>
                        <div className="output">
                            { error && <div className="error">{ error }</div>}
                            {fileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url} alt=""/></div> }
                        </div>
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
        </style>
    );
}

