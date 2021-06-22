import React, {useEffect, useState} from "react";
import classes from "./styles/EditStreamForm.module.scss";
import {projectFirestore} from "../../fireBase";
import {useHistory} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext";
import {Dropdown} from "react-bootstrap";
import ReactPlayer from "react-player/lazy";
import {useDataFromFirestore} from "../../customHooks/useFirestore";
import youtubeThumbnail from "youtube-thumbnail";
// eslint-disable-next-line no-undef
const queryString = require("query-string");

export default function EditStreamForm(){
	const {docsFromHook} = useDataFromFirestore("streams");
	const history = useHistory();
	const CurrentUserFromLS = JSON.parse(localStorage.getItem("LSCurrentUser"));
	const {currentUser} = useAuthContext();

	const [streamCategory, setStreamCategory] = useState("");
	const [videoURL, setVideoURL] = useState("");
	const [createdAt, setCreatedAt] = useState("");
	const [thumbnail, setThumbnail] = useState("");

	let parsedWindowLocation = queryString.parse(window.location.hash);
	const stringifiedSlug = queryString.stringify(parsedWindowLocation).substr(17);

	let selectedStream = "";

	useEffect(() => {
		if (docsFromHook) {
			selectedStream = docsFromHook.filter(function (stream) {
				return stream.id === stringifiedSlug;
			});
		}
	});

	useEffect(() => {
		const getThumbnail = async () => setThumbnail(await youtubeThumbnail(videoURL));
		getThumbnail().then().catch(err=>window.alert(err));
	},[videoURL]);

	useEffect(() => {
		if (selectedStream !== "") {
			selectedStream && selectedStream.map(doc => {
				setCreatedAt(doc.createdAt);
				setStreamCategory(doc.category);
				setVideoURL(doc.videoURL);
			});
		}
	}, [docsFromHook]);

	const addStreamsWithFBCallback = () => {
		const collectionRef = projectFirestore.collection("streams").doc(stringifiedSlug);

		collectionRef.set(
			{
				"authorID": currentUser ? currentUser.uid : CurrentUserFromLS.uid,
				"category": streamCategory,
				"createdAt": createdAt,
				"imageURL": thumbnail.medium.url,
				"updatedAt": Date.now(),
				"videoURL": videoURL,
			})
			.then(() => {
				window.alert("Stream edited successfully!");
				history.push("/UserProfilePage", {from: "/ModeratorAddStreamsForm"});
			})
			.catch((error) => {
				window.alert("Could not edit stream due to: " + error.code + " " + error.message + "" + error.details);
			});
	};

	return (
		<>
			<div className='form-update__body form-login__body'>
				<h1 className={classes.title}>Edit Stream</h1>
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
                        Thumbnail:
						{thumbnail&&<img style={{width: "25%", height: "auto"}} src={thumbnail&&thumbnail.medium.url} alt=""/>}
					</div>
					<div className="form-article__box-btn">

						<button
							className="form-article__btn"
							onClick={()=>addStreamsWithFBCallback()}
						>Submit
						</button>

					</div>
				</form>
			</div>
		</>
	);
}