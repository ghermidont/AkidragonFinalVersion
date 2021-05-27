import React, {useEffect, useState} from 'react';
//import {useArticlesContext} from "../../context/ArticlesContext";
import {projectFirestore, projectStorage} from "../../fireBase";
import {useHistory} from 'react-router-dom';
import {useAuthContext} from "../../context/AuthContext";
import {Dropdown} from "react-bootstrap";
//import Loader from "react-loader-spinner";
import ReactPlayer from "react-player/lazy";
import {useDataFromFirestore} from "../../customHooks/useFirestore";
const queryString = require('query-string');

export default function EditStreamForm(){

    console.log("EditStreamForm worked");

    const {docsFromHook} = useDataFromFirestore('streams');

    const fileTypesArray = ['image/png', 'image/jpeg'];
    const history = useHistory();
    const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
    const {currentUser} = useAuthContext();

    const [error, setError] = useState("");
    const [streamCategory, setStreamCategory] = useState("");
    const [videoURL, setVideoURL] = useState("");
    const [url, setUrl] = useState("");
    const [oldUrl, setOldUrl] = useState("");
    const [fileSuccess, setFileSuccess] = useState(false);
    const [uploadedPicFile, setUploadedPicFile] = useState("");
    const [createdAt, setCreatedAt] = useState("");

    let parsedWindowLocation = queryString.parse(window.location.hash);
    const stringifiedSlug = queryString.stringify(parsedWindowLocation).substr(17);

    console.log("This is the stringified:");
    console.log(stringifiedSlug);

    let selectedStream = "";

    useEffect(() => {
        if (docsFromHook) {
            selectedStream = docsFromHook.filter(function (stream) {
               return stream.id === stringifiedSlug;
            });
            console.log(selectedStream);
        }
   });

    useEffect(() => {
    if (selectedStream !== "") {
        selectedStream && selectedStream.map(doc => {
            setCreatedAt(doc.createdAt);
            setStreamCategory(doc.category);
            setVideoURL(doc.videoURL);
            setUrl(doc.imageURL);
            setOldUrl(doc.imageURL)
        })
    }
    }, [docsFromHook]);

    const fileUploadEventListener = (e) => {
        let uploadedFile = e.target.files[0];
        if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
            setUploadedPicFile(uploadedFile);
            async function putFile(uploadedFile){
                e.preventDefault();
                try {
                    setError("");
                    const storageRef = projectStorage.ref('streams_pictures/').child(uploadedFile.name);
                    storageRef.put(uploadedFile).on('state_changed', (err) => {
                    },  (err) => {
                        window.alert(err);
                    }, async () => {
                        const finalUrl = await storageRef.getDownloadURL();
                        finalUrl!==undefined?setFileSuccess(true):setFileSuccess(false);
                        setUrl(finalUrl);
                    });
                } catch {
                    setError("Failed to upload file");
                }
            }
            putFile(uploadedFile).then(()=>console.log(url));
        } else {
            setUploadedPicFile('');
            setError('Please select an image file (png or jpg)');
        }
    };

    const addStreamsWithFBCallback = (e) => {
        const collectionRef = projectFirestore.collection('streams').doc(stringifiedSlug);

            collectionRef.set(
                {
                    "authorID": currentUser ? currentUser.uid : CurrentUserFromLS.uid,
                    "category": streamCategory,
                    "createdAt": createdAt,
                    "imageURL": url,
                    "updatedAt": Date.now(),
                    "videoURL": videoURL,
                })
                .then(() => {
                    window.alert("Stream edited successfully!");
                    history.push("/UserProfilePage", {from: "/ModeratorAddStreamsForm"});
                    return console.log("To streams collection added successfully!");
                })
                .catch((error) => {
                    console.error(error.code + " " + error.message + "" + error.details);
                });

    }

    const clearInput = () => {
        //setArticleCategory("");
        setVideoURL("");
        setUrl("");
        setUploadedPicFile('');
        setUrl('');
        setFileSuccess(false);

        const desertRef = projectStorage.ref('streams_pictures/').child(uploadedPicFile.name);

        if(desertRef){
            desertRef.delete().then(() => {
                console.log("uploaded image removed successfully");
            }).catch((error) => {
                console.log("could not delete the file because:" + error);
            });
        }
    }

    return (
        <>
            <div className='form-update__body form-login__body'>
                <h1 className="title form-title">Add Stream</h1>
                <form className="form-update" style={{marginTop: "30em"}}>
                    <ReactPlayer
                        url = {videoURL?videoURL:""}
                        controls = {true}
                        light = {true}
                        playing = {false}
                    />
                    <label className='form-update__label'>
                        Video URL
                        <input
                            className='form-update__input'
                            type="text"
                            value={videoURL}
                            required
                            onChange={
                                (e)=>setVideoURL(e.target.value)
                            }
                        />

                    </label>
                    <div>Current category: {streamCategory}</div>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Stream category
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>setStreamCategory("entertainment")}>Entertainment</Dropdown.Item>
                            <Dropdown.Item onClick={()=>setStreamCategory("tournaments")}>Tournaments</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <div>
                        Current thumbnail:
                        <img src={oldUrl} alt=""/>
                    </div>
                    <div className="form-article__box-btn">
                        <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Upload thumbnail
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
                            onClick={()=>addStreamsWithFBCallback()}
                       >Submit
                       </button>

                       {/*<button*/}
                       {/*     className="form-article__btn"*/}
                       {/*     onClick={()=> {*/}
                       {/*         clearInput();*/}
                       {/*         history.push("/ManageStreamsPage", {from: "/ModifyStreamsForm"});*/}
                       {/*     }}*/}
                       {/*>Cancel*/}
                       {/*</button>*/}

                    </div>
                </form>
            </div>
        </>
    );
}