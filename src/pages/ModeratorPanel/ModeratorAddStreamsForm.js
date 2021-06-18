import React, {useEffect, useState} from 'react';
import classes from "./styles/ModeratorAddStreamsForm.module.scss";
import {projectFirestore} from "../../fireBase";
import {useHistory} from 'react-router-dom';
import {useAuthContext} from "../../context/AuthContext";
import {Dropdown} from "react-bootstrap";
import ReactPlayer from "react-player/lazy";
import {sanitizeUrl} from "@braintree/sanitize-url";
import youtubeThumbnail from "youtube-thumbnail";

export default function ModeratorAddStreamsForm() {
  const history = useHistory();
  const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
  const {currentUser} = useAuthContext();
  const [streamCategory, setStreamCategory] = useState('');
  const [videoURL, setVideoURL] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    const getThumbnail = async () => setThumbnail(await youtubeThumbnail(videoURL));
    getThumbnail().then().catch(err=>console.log(err));
  },[videoURL]);

  const addStreamsWithFBCallback = (e) => {
    const collectionRef = projectFirestore.collection('streams').doc();
      collectionRef.set(
        {
          "authorID": currentUser ? currentUser.uid : CurrentUserFromLS.uid,
          "category": streamCategory,
          "videoURL": videoURL,
          "imageURL": thumbnail.medium.url,
          "createdAt": Date.now()
        })
        .then(() => {
          window.alert("Stream added successfully!");
          history.push("/UserProfilePage", {from: "/ModeratorAddStreamsForm"});
        })
        .catch((error) => {
          window.alert("Could not add stream due to:" + error.code + " " + error.message + "" + error.details);
        });
  }

  return (
    <>
      <div className={classes.container}>
        <h1 className={classes.title}>Add Stream</h1>
        <form className="form">
          {videoURL &&
          <ReactPlayer
            url={videoURL ? videoURL : ""}
            controls={true}
            light={true}
            playing={false}
          />
          }
          <input
            className='input'
            type="text"
            placeholder='URL Video'
            value={videoURL}
            required
            onChange={
              (e) => setVideoURL(sanitizeUrl(e.target.value))
            }
          />
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {streamCategory !== '' ? streamCategory : "Stream category"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setStreamCategory("entertainment")}>Entertainment</Dropdown.Item>
              <Dropdown.Item onClick={() => setStreamCategory("tournaments")}>Tournaments</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <br/>
          <div className={classes.btnInner}>
            <button
              className="btn-upload"
              onClick={()=>addStreamsWithFBCallback()}
            >Submit</button>
          </div>
          <div className="output">
            <div className='output__image'>
              {thumbnail&&thumbnail.default.url==="http://img.youtube.com/vi/null/default.jpg"?<div></div>:<img style={{width: "25%", height: "auto"}} src={thumbnail&&thumbnail.medium.url} alt=""/>}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}