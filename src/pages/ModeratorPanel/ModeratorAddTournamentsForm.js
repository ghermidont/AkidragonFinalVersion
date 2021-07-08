/* eslint-disable no-mixed-spaces-and-tabs */
//In future consider the implementing the DRY principle similar to the CMSAboutUsPage, depending on the number of file entries.
import React, {useState} from "react";
import {projectFirestore, projectStorage} from "../../fireBase";
import {useHistory} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext";
import {Dropdown} from "react-bootstrap";
import ReactPlayer from "react-player/lazy";
import classes from "./styles/ModeratorAddTournament.module.scss";

export default function ModeratorAddTournamentsForm() {
	const {currentUser} = useAuthContext();
	const fileTypesArray = ["image/png", "image/jpeg"];
	const history = useHistory();
	const CurrentUserFromLS = JSON.parse(localStorage.getItem("LSCurrentUser"));

	//Texts
	const [eventCategory, setEventCategory] = useState("");
	const [eventTitle, setEventTitle] = useState("");
	const [eventStatus, setEventStatus] = useState("");
	const [eventVideoLink, setEventVideoLink] = useState("");
	const [eventDate, setEventDate] = useState("");
	const [eventInfoPageLink, setEventInfoPageLink] = useState("");

	//Errors
	const [error1, setError1] = useState("");
	const [error2, setError2] = useState("");
	const [error3, setError3] = useState("");
	const [error4, setError4] = useState("");
	const [errorWin1, setErrorWin1] = useState("");
	const [errorWin2, setErrorWin2] = useState("");
	const [errorBanner, setErrorBanner] = useState("");

	//success
	const [fileSuccess1, setFileSuccess1] = useState(false);
	const [fileSuccess2, setFileSuccess2] = useState(false);
	const [fileSuccess3, setFileSuccess3] = useState(false);
	const [fileSuccess4, setFileSuccess4] = useState(false);
	const [fileSuccessWin1, setFileSuccessWin1] = useState(false);
	const [fileSuccessWin2, setFileSuccessWin2] = useState(false);
	const [fileSuccessBanner, setFileSuccessBanner] = useState(false);

	//loadings
	const [loading1, setLoading1] = useState(true);
	const [loading2, setLoading2] = useState(true);
	const [loading3, setLoading3] = useState(true);
	const [loading4, setLoading4] = useState(true);
	const [loadingWin1, setLoadingWin1] = useState(true);
	const [loadingWin2, setLoadingWin2] = useState(true);

	//urls
	const [url1, setUrl1] = useState("");
	const [url2, setUrl2] = useState("");
	const [url3, setUrl3] = useState("");
	const [url4, setUrl4] = useState("");
	const [urlWin1, setUrlWin1] = useState("");
	const [urlWin2, setUrlWin2] = useState("");
	const [urlBanner, setUrlBanner] = useState("");
	const [validation, setValidation] = useState();

	const infoPageUrlValidation = (input) => {
		const reg = new RegExp("((http|https)://)(www.)?");
		if(reg.test(input)){
			setValidation(true);
			setEventInfoPageLink(input);
		} else {
			setValidation(false);
		}
	};

	//Event listeners
	const file1UploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile) {
				e.preventDefault();
				try {
					setLoading1(true);
					setError1("");
					const storageRef = projectStorage.ref(`tournaments_pictures/${currentUser.uid || CurrentUserFromLS.uid}`).child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed",
						async () => {
							const finalUrl = await storageRef.getDownloadURL();
							finalUrl !== undefined ? setFileSuccess1(true) : setFileSuccess1(false);
							setUrl1(finalUrl);
						});
				} catch {
					setError1("Failed to upload file");
				}
				setLoading1(false);
			}
			putFile(uploadedFile).then();
		} else {
			setError1("Please select an image file (png or jpg)");
		}
	};

	const file2UploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile) {
				e.preventDefault();
				try {
					setLoading2(true);
					setError2("");
					const storageRef = projectStorage.ref(`tournaments_pictures/${currentUser.uid || CurrentUserFromLS.uid}`).child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed",
						async () => {
							const finalUrl = await storageRef.getDownloadURL();
							finalUrl !== undefined ? setFileSuccess2(true) : setFileSuccess2(false);
							setUrl2(finalUrl);
						});
				} catch {
					setError2("Failed to upload file");
				}
				setLoading2(false);
			}
			putFile(uploadedFile).then();
		} else {
			setError2("Please select an image file (png or jpg)");
		}
	};

	const file3UploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile) {
				e.preventDefault();
				try {
					setLoading3(true);
					setError3("");
					const storageRef = projectStorage.ref(`tournaments_pictures/${currentUser.uid || CurrentUserFromLS.uid}`).child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed",
						async () => {
							const finalUrl = await storageRef.getDownloadURL();
							finalUrl !== undefined ? setFileSuccess3(true) : setFileSuccess3(false);
							setUrl3(finalUrl);
						});
				} catch {
					setError3("Failed to upload file");
				}
				setLoading3(false);
			}
			putFile(uploadedFile).then();
		} else {
			setError3("Please select an image file (png or jpg)");
		}
	};

	const file4UploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile) {
				e.preventDefault();
				try {
					setLoading4(true);
					setError4("");
					const storageRef = projectStorage.ref(`tournaments_pictures/${currentUser.uid || CurrentUserFromLS.uid}`).child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed",
						async () => {
							const finalUrl = await storageRef.getDownloadURL();
							finalUrl !== undefined ? setFileSuccess4(true) : setFileSuccess4(false);
							setUrl4(finalUrl);
						});
				} catch {
					setError4("Failed to upload file");
				}
				setLoading4(false);
			}
			putFile(uploadedFile).then();
		} else {
			setError4("Please select an image file (png or jpg)");
		}
	};

	const fileWin1UploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile) {
				e.preventDefault();
				try {
					setLoadingWin1(true);
					setErrorWin1("");
					const storageRef = projectStorage.ref(`tournaments_pictures/${currentUser.uid || CurrentUserFromLS.uid}`).child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed",
						async () => {
							const finalUrl = await storageRef.getDownloadURL();
							finalUrl !== undefined ? setFileSuccessWin1(true) : setFileSuccessWin1(false);
							setUrlWin1(finalUrl);
						});
				} catch {
					setErrorWin1("Failed to upload file");
				}
				setLoadingWin1(false);
			}
			putFile(uploadedFile).then();
		} else {
			setErrorWin1("Please select an image file (png or jpg)");
		}
	};

	const fileWin2UploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile) {
				e.preventDefault();
				try {
					setLoadingWin2(true);
					setErrorWin2("");
					const storageRef = projectStorage.ref(`tournaments_pictures/${currentUser.uid || CurrentUserFromLS.uid}`).child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed",
						async () => {
							const finalUrl = await storageRef.getDownloadURL();
							finalUrl !== undefined ? setFileSuccessWin2(true) : setFileSuccessWin2(false);
							setUrlWin2(finalUrl);
						});
				} catch {
					setErrorWin2("Failed to upload file");
				}
				setLoadingWin2(false);
			}
			putFile(uploadedFile).then();
		} else {
			setErrorWin2("Please select an image file (png or jpg)");
		}
	};

	const bannerLoadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile) {
				e.preventDefault();
				try {
					setErrorBanner("");
					const storageRef = projectStorage.ref(`tournaments_pictures/${currentUser.uid || CurrentUserFromLS.uid}`).child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed",
						async () => {
							const finalUrl = await storageRef.getDownloadURL();
							finalUrl !== undefined ? setFileSuccessBanner(true) : setFileSuccessBanner(false);
							setUrlBanner(finalUrl);
						});
				} catch {
					setErrorBanner("Failed to upload file");
				}
			}
			putFile(uploadedFile).then();
		} else {
			setErrorBanner("Please select an image file (png or jpg)");
		}
	};

	//Write to FB:
	const addTournamentWithFBCallback = () => {
		const collectionRef = projectFirestore.collection("tournaments").doc();
		if ((loading1 === false &&
			loading2 === false &&
			loading3 === false &&
			loading4 === false) ||
			(loading1 === false &&
				loading2 === false) ||
			(loading3 === false &&
				loading4 === false) ||
			loadingWin1 === false ||
			(loadingWin1 === false &&
				loadingWin2 === false))
		{
			collectionRef.set(
				{
					"authorID": currentUser ? currentUser.uid : CurrentUserFromLS.uid,
					"eventCategory": eventCategory,
					"eventStatus": eventStatus,
					"eventBanner": urlBanner,
					"eventTitle": eventTitle,
					"eventWinner1": urlWin1,
					"eventWinner2": urlWin2,
					"eventInfoPage": eventInfoPageLink,
					"eventDate": Date.parse(eventDate),
					"eventVideoLink": eventVideoLink,
					"pictureURL1": url1,
					"pictureURL2": url2,
					"pictureURL3": url3,
					"pictureURL4": url4,
					"createdAt": Date.now()
				})
				.then(() => {
					window.alert("Tournament added successfully!");
					history.push("/TournamentsPage", {from: "/ModeratorAddTournamentsForm"});
				})
				.catch((error) => {
					window.alert("Error: " + error.code + " " + error.message + "" + error.details);
				});
		}
	};

	return (
		<>
			<div className={classes.container}>

				<h1 className={classes.title}>Add Tournaments</h1>

				<form className='form'>

					<div className="form-dropdown">
						<Dropdown>
							<Dropdown.Toggle variant="success" id="dropdown-basic">
								{eventCategory !== "" ? eventCategory : "Event category"}
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
								{eventStatus !== "" ? eventStatus : "Event status"}
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item onClick={() => setEventStatus("future")}>Future</Dropdown.Item>
								<Dropdown.Item onClick={() => setEventStatus("passed")}>Passed</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>

					<input
						className={classes.input}
						type="text"
						placeholder='Event title'
						required
						onChange={
							(e) => setEventTitle(e.target.value)
						}
					/>

					<label
						className={classes.label}>
						<span
							className='icon-upload2'>
               &ensp;
						</span>
						Event banner
						<input
							className='visually-hidden'
							type="file"
							required
							onChange={bannerLoadEventListener}
						/>

					</label>
					<div className="output">
						{errorBanner && <div className="error">{errorBanner}</div>}
						{fileSuccessBanner&&<div>Banner image uploaded successfully: <img style={{width: "25%", height: "auto"}} src={urlBanner} alt=""/></div>}
					</div>

					{eventStatus === "future" &&
					<>
						<label className='form-update__label btn-upload btn-upload--tournament'>
							<span className='icon-upload2'></span> Picture team 1
							<input
								className='form-update__btn visually-hidden'
								type="file"
								placeholder='file'
								onChange={file1UploadEventListener}
							/>

						</label>
						<div className="output">
							{error1 && <div className="error">{error1}</div>}
							{fileSuccess1 &&
							<div>Image 1 Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url1} alt=""/></div>}
						</div>
						<br/>
						<label className='form-update__label btn-upload btn-upload--tournament'>
							<span className='icon-upload2'></span> Picture team 2
							<input
								className='form-update__btn visually-hidden'
								type="file"
								placeholder='file'
								onChange={file2UploadEventListener}
							/>

						</label>
						<div className="output">
							{error2 && <div className="error">{error2}</div>}
							{fileSuccess2 &&
							<div>Image 2 Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url2} alt=""/></div>}
						</div>
						<br/>
					</>
					}
					{(eventCategory === "tournament" && eventStatus === "future") &&
					<>
						<label className='form-update__label btn-upload btn-upload--tournament'><span
							className='icon-upload2'></span> Picture team 3
						<input
							className='form-update__btn visually-hidden'
							type="file"
							placeholder='file'
							onChange={file3UploadEventListener}
						/>
						</label>
						<div className="output">
							{error3 && <div className="error">{error3}</div>}
							{fileSuccess3 &&
							<div>Image 3 Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url3} alt=""/></div>}
						</div>
						<br/>
						<label className='form-update__label btn-upload btn-upload--tournament'> <span
							className='icon-upload2'></span> Picture team 4
						<input
							className='form-update__btn visually-hidden'
							type="file"
							placeholder='file'
							onChange={file4UploadEventListener}
						/>
						</label>
						<div className="output">
							{error4 && <div className="error">{error4}</div>}
							{fileSuccess4 &&
							<div>Image 4 Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={url4} alt=""/></div>}
						</div>
						<br/>
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

					<input
						className={classes.input}
						type="text"
						placeholder='Video Link'
						required
						onChange={
							(e) => setEventVideoLink(e.target.value)
						}
					/>

					<input
						className={classes.input}
						type="text"
						placeholder="Info Page"
						required
						onChange={
							(e) => infoPageUrlValidation(e.target.value)
						}
					/>
					{validation===false&&<strong><div style={{color: "red"}}>Please include the full Url with protocol and domain. Otherwise the link will not work</div></strong>}

					<input
						className={classes.input}
						type="date"
						min="2021-05-03"
						max="2022-12-31"
						onChange={
							(e) => setEventDate(e.target.value)
						}
					/>

					{eventStatus === "passed" &&
					<label
						className='form-update__label btn-upload btn-upload--tournament'>
          	<span
							className='icon-upload2'>
          	</span>
						Event winner 1
						<input
							className='visually-hidden'
							type="file"
							onChange={fileWin1UploadEventListener}
						/>
						<div className="output">
							{errorWin1 && <div className="error">{errorWin1}</div>}
							{fileSuccessWin1 &&
							<div>Image Win1 Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={urlWin1} alt=""/>
							</div>}
						</div>
					</label>
					}
					{(eventStatus === "passed" && eventCategory === "match") &&
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
							{errorWin2 && <div className="error">{errorWin2}</div>}
							{fileSuccessWin2 &&
							<div>Image Win2 Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={urlWin2} alt=""/>
							</div>}
						</div>
					</label>
					}

					<button
						className="btn-upload"
						onClick={() => addTournamentWithFBCallback()}
					>
						Submit
					</button>

				</form>
			</div>
		</>
	);
}