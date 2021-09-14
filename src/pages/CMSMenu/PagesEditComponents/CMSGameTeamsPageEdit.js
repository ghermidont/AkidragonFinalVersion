import React, {useEffect, useState} from "react";
import {projectFirestore, projectStorage} from "../../../fireBase";
import {useDataFromFirestoreCMS} from "../../../customHooks/useFirestore";
//The red line between team members
import { BsDashCircleFill,  BsPlusCircleFill} from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";

function CMSGameTeamsPageEdit() {

	// eslint-disable-next-line react/prop-types
	const ColoredLine = ({ color }) => (
		<hr
			style={{
				color: color,
				backgroundColor: color,
				height: 5
			}}
		/>
	);

	const fileTypesArray = ["image/png", "image/jpeg"];
	//Getting data from the database.
	const {docsFromHookCMS} = useDataFromFirestoreCMS("web-app-cms");
	//States.
	const [ITGamingTeamBannerUrl, setITGamingTeamBannerUrl] = useState("");
	const [ENGamingTeamBannerUrl, setENGamingTeamBannerUrl] = useState("");

	const [oldITGamingTeamBannerUrl, setOldITGamingTeamBannerUrl] = useState("");
	const [oldENGamingTeamBannerUrl, setOldENGamingTeamBannerUrl] = useState("");

	const [ITGamingTeamText, setITGamingTeamText] = useState("");
	const [ENGamingTeamText, setENGamingTeamText] = useState("");

	const [ITGamingTeamTitle, setITGamingTeamTitle] = useState("");
	const [ENGamingTeamTitle, setENGamingTeamTitle] = useState("");

	const [ITGamingTeamBannerUrlFileSuccess ,setITGamingTeamBannerUrlFileSuccess] = useState(false);
	const [ENGamingTeamBannerUrlFileSuccess ,setENGamingTeamBannerUrlFileSuccess] = useState(false);
	
	const [gameTeamMembersArr, setGameTeamMembersArr] = useState([]);

	// Function to add fields.
	const handleAddFields = () => {
		setGameTeamMembersArr([...gameTeamMembersArr,
			{
				slug: uuidv4(),
				avatar: {
					en: "",
					it: ""
				},
				teamTopTitle: {
					en: "",
					it: ""
				},
				teamTopText: {
					en: "",
					it: ""
				},
				lowTitle: {
					en: "",
					it: ""
				},
				lowText: {
					en: "",
					it: ""
				},
				social: {
					facebook: "",
					instagram: "",
					youtube: "",
					twitch: ""
				}
			}]);
	};

	// Function to remove fields.
	const handleRemoveFields = slug => {
		const teams  = [...gameTeamMembersArr];
		teams.splice(teams.findIndex(team => team.slug === slug), 1);
		setGameTeamMembersArr(teams);
	};

	const handleChangeInputLng = (slug, event, lng) => {
		const newInputField = gameTeamMembersArr.map(doc => {
			if(slug === doc.slug) {
				doc[event.target.name][lng] = event.target.value;
			}
			return doc;
		});
		setGameTeamMembersArr(newInputField);
	};

	//File uploads listener.
	const fileChangeInput = (slug, e, lng) =>{
		let uploadedFile = e.target.files[0];
		const newInputFields = gameTeamMembersArr.map(doc => {
			if(slug === doc.slug) {
				if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
					// eslint-disable-next-line no-inner-declarations
					async function putFile(uploadedFile){
						e.preventDefault();
						try {
							const storageRef = projectStorage.ref("CMS-pictures/gameTeams").child(uploadedFile.name);
							storageRef.put(uploadedFile).on("state_changed", () => {
							},  (err) => {
								window.alert(err);
							}, async()=>{
								const finalUrl = await storageRef.getDownloadURL();
								if(finalUrl!==undefined)doc[e.target.name][lng]=finalUrl;
							});
						} catch {
							return window.alert("Failed to upload file");
						}
					}
					putFile(uploadedFile).then(()=>window.alert("File uploaded successfully."));
				} else {
					return window.alert("Please select an image file (png or jpg)");
				}
			}
			return doc;
		});
		setGameTeamMembersArr(newInputFields);
	};

	let teamsArr = [];
	let selectedDoc = "";

	//Filtering data from the database.
	useEffect(() => {
		if (docsFromHookCMS) {
			selectedDoc = docsFromHookCMS.filter(function (doc) {
				return doc.id === "game-teams";
			});
		}
	});

	//Updating states on each data base data call.
	useEffect(() => {
		if (selectedDoc !== "") {
			selectedDoc.map(doc => {
				doc.gameTeams.map(member => teamsArr.push({...member}));
				setGameTeamMembersArr(teamsArr);

				setITGamingTeamBannerUrl(doc.topBanner.it);
				setENGamingTeamBannerUrl(doc.topBanner.en);

				setOldITGamingTeamBannerUrl(doc.topBanner.it);
				setOldENGamingTeamBannerUrl(doc.topBanner.en);

				setITGamingTeamText(doc.text.it);
				setENGamingTeamText(doc.text.en);

				setITGamingTeamTitle(doc.title.it);
				setENGamingTeamTitle(doc.title.en);
			});
		}
	}, [docsFromHookCMS]);

	//Files upload listeners. START
	const ENGamingTeamTopBannerFileUploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile){
				e.preventDefault();
				try {
					const storageRef = projectStorage.ref("CMS-pictures/gameTeams").child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed", () => {
					},  (err) => {
						window.alert(err);
					}, async()=>{
						const finalUrl = await storageRef.getDownloadURL();
						finalUrl!==undefined?setENGamingTeamBannerUrlFileSuccess(true):setENGamingTeamBannerUrlFileSuccess(false);
						setENGamingTeamBannerUrl(finalUrl);
					});
				} catch {
					window.alert("Failed to upload file. Try uploading again.");
				}
			}
			putFile(uploadedFile).then();
		} else {
			window.alert("Please select an image file (png or jpg)");
		}
	};

	const ITGamingTeamTopBannerFileUploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile){
				e.preventDefault();
				try {
					const storageRef = projectStorage.ref("CMS-pictures/gameTeams").child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed", () => {
					},  (err) => {
						window.alert(err);
					}, async()=>{
						const finalUrl = await storageRef.getDownloadURL();
						finalUrl!==undefined?setITGamingTeamBannerUrlFileSuccess(true):setITGamingTeamBannerUrlFileSuccess(false);
						setITGamingTeamBannerUrl(finalUrl);
					});
				} catch {
					window.alert("Failed to upload file. Try uploading again.");
				}
			}
			putFile(uploadedFile).then();
		} else {
			window.alert("Please select an image file (png or jpg)");
		}
	};
	//Files upload listeners. END

	//Write data to the database.
	const writeToFBCallback = () => {
		const collectionRef = projectFirestore.collection("web-app-cms").doc("game-teams");

		collectionRef.set(
			{
				"gameTeams": gameTeamMembersArr,
				"text": {
					"en": ENGamingTeamText,
					"it": ITGamingTeamText
				},
				"title": {
					"en": ENGamingTeamTitle,
					"it": ITGamingTeamTitle
				},
				"topBanner": {
					"en": ENGamingTeamBannerUrl,
					"it": ITGamingTeamBannerUrl
				}
			})
			.then(() => {
				window.alert("Content edited successfully!");
			})
			.catch((error) => {
				window.alert(`Error: ${error.message}`);
			});
	};

	return (
		<>
			<div style={{paddingTop: "5em important"}}>
				<center className='mt-5'><h1>Edit <strong>Game Teams</strong> Page static content:</h1></center>
				<section>
					<ul className="nav nav-tabs mt-5" id="myTab" role="tablist">
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
										Title:
										<textarea
											className='form-article__input'
											rows='2'
											name="mainTitle"
											value={ITGamingTeamTitle}
											onChange={
												(e)=>setITGamingTeamTitle(e.target.value)
											}
										> </textarea>
									</label>

									<label className='form-article__label'>
										Text:
										<textarea
											className='form-article__input'
											rows='2'
											name="mainText"
											value={ITGamingTeamText}
											onChange={
												(e)=>setITGamingTeamText(e.target.value)
											}
										> </textarea>
									</label>

									<div>
                                        Current top banner:
										<img style={{width: "25%", height: "auto"}} src={oldITGamingTeamBannerUrl} alt=""/>
									</div>
									<label className='form-article__label btn-upload'> <span className='icon-upload2'> </span> Main banner
										<input
											className='form-article__btn visually-hidden'
											type="file"
											placeholder='file'
											onChange={ITGamingTeamTopBannerFileUploadEventListener}
										/>
									</label>
									<div className="output">
										{ITGamingTeamBannerUrlFileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ITGamingTeamBannerUrl} alt=""/></div> }
									</div>

									{/*Game teams: START*/}
									<br/>
									<div><h1>Teams list:</h1>

										{ gameTeamMembersArr.map(team => (
											<>
												<div key={team.slug}>
													<div>
														Gaming team avatar:
														<img style={{width: "25%", height: "auto"}} src={team.avatar.it} alt=""/>
													</div>

													<label className='form-article__label btn-upload'> <span className='icon-upload2'> </span> Avatar
														<input
															name="avatar"
															className='form-article__btn visually-hidden'
															type="file"
															placeholder='file'
															onChange={event => fileChangeInput(team.slug, event, "it")}
														/>
													</label>

													<label className='form-article__label'>
                                                        Top title:
														<input
															name="teamTopTitle"
															className="form-article__input"
															type="text"
															placeholder={team.teamTopTitle.it}
															onChange={event => handleChangeInputLng(team.slug, event, "it")}
														/>
													</label>

													<label className='form-article__label'>
														Top text:
														<input
															name="teamTopText"
															className="form-article__input"
															type="text"
															placeholder={team.teamTopText.it}
															onChange={event => handleChangeInputLng(team.slug, event, "it")}
														/>
													</label>

													<label className='form-article__label'>
														Low title:
														<input
															name="lowTitle"
															className="form-article__input"
															type="text"
															placeholder={team.lowTitle.it}
															onChange={event => handleChangeInputLng(team.slug, event, "it")}
														/>
													</label>

													<label className='form-article__label'>
														Low text:
														<input
															name="lowText"
															className="form-article__input"
															type="text"
															placeholder={team.lowText.it}
															onChange={event => handleChangeInputLng(team.slug, event, "it")}
														/>
													</label>
													{/* social*/}
													<label className='form-article__label'>
														Facebook link:
														<input
															name="social"
															className="form-article__input"
															type="text"
															placeholder={team.social.facebook}
															onChange={event => handleChangeInputLng(team.slug, event, "facebook")}
														/>
													</label>
													<label className='form-article__label'>
														Instagram link:
														<input
															name="social"
															className="form-article__input"
															type="text"
															placeholder={team.social.instagram}
															onChange={event => handleChangeInputLng(team.slug, event, "instagram")}
														/>
													</label>
													<label className='form-article__label'>
														Twitch link:
														<input
															name="social"
															className="form-article__input"
															type="text"
															placeholder={team.social.twitch}
															onChange={event => handleChangeInputLng(team.slug, event, "twitch")}
														/>
													</label>
													<label className='form-article__label'>
														Youtube link:
														<input
															name="social"
															className="form-article__input"
															type="text"
															placeholder={team.social.youtube}
															onChange={event => handleChangeInputLng(team.slug, event, "youtube")}
														/>
													</label>

													<BsPlusCircleFill style={{marginRight: "2em"}} onClick={()=>handleAddFields()}/>
													<BsDashCircleFill disabled={gameTeamMembersArr.length === 1} onClick={() => handleRemoveFields(team.slug)}/>
													<ColoredLine color="red" />
												</div>
												<br />
											</>
										)) }
										{/*Team members: END*/}
									</div>
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
										Title:
										<textarea
											className='form-article__input'
											rows='2'
											name="title"
											value={ENGamingTeamTitle}
											onChange={
												(e)=>setENGamingTeamTitle(e.target.value)
											}
										> </textarea>
									</label>

									<label className='form-article__label'>
										Text:
										<textarea
											className='form-article__input'
											rows='2'
											name="text"
											value={ENGamingTeamText}
											onChange={
												(e)=>setENGamingTeamText(e.target.value)
											}
										> </textarea>
									</label>

									<div>
										Current top banner:
										<img style={{width: "25%", height: "auto"}} src={oldENGamingTeamBannerUrl} alt=""/>
									</div>
									<label className='form-article__label btn-upload'> <span className='icon-upload2'> </span> Main banner
										<input
											className='form-article__btn visually-hidden'
											type="file"
											placeholder='file'
											onChange={ENGamingTeamTopBannerFileUploadEventListener}
										/>
									</label>
									<div className="output">
										{ENGamingTeamBannerUrlFileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ENGamingTeamBannerUrl} alt=""/></div> }
									</div>

									{/*Game teams: START*/}

									<br/>
									<div><h1>Teams list:</h1>

										{ gameTeamMembersArr.map(team => (
											<>
												<div key={team.slug}>
													<div>
														Gaming team avatar:
														<img style={{width: "25%", height: "auto"}} src={team.avatar.en} alt=""/>
													</div>

													<label className='form-article__label btn-upload'> <span className='icon-upload2'> </span> Avatar
														<input
															name="avatar"
															className='form-article__btn visually-hidden'
															type="file"
															placeholder='file'
															onChange={event => fileChangeInput(team.slug, event, "en")}
														/>
													</label>

													<label className='form-article__label'>
														Top title:
														<input
															name="teamTopTitle"
															className="form-article__input"
															type="text"
															placeholder={team.teamTopTitle.en}
															onChange={event => handleChangeInputLng(team.slug, event, "en")}
														/>
													</label>

													<label className='form-article__label'>
														Top text:
														<input
															name="teamTopText"
															className="form-article__input"
															type="text"
															placeholder={team.teamTopText.en}
															onChange={event => handleChangeInputLng(team.slug, event, "en")}
														/>
													</label>

													<label className='form-article__label'>
														Low title:
														<input
															name="lowTitle"
															className="form-article__input"
															type="text"
															placeholder={team.lowTitle.en}
															onChange={event => handleChangeInputLng(team.slug, event, "en")}
														/>
													</label>

													<label className='form-article__label'>
														Low text:
														<input
															name="lowText"
															className="form-article__input"
															type="text"
															placeholder={team.lowText.en}
															onChange={event => handleChangeInputLng(team.slug, event, "en")}
														/>
													</label>

													{/* Social Links*/}
													<label className='form-article__label'>
														Facebook link:
														<input
															name="social"
															className="form-article__input"
															type="text"
															placeholder={team.social.facebook}
															onChange={event => handleChangeInputLng(team.slug, event, "facebook")}
														/>
													</label>
													<label className='form-article__label'>
														Instagram link:
														<input
															name="social"
															className="form-article__input"
															type="text"
															placeholder={team.social.instagram}
															onChange={event => handleChangeInputLng(team.slug, event, "instagram")}
														/>
													</label>
													<label className='form-article__label'>
														Twitch link:
														<input
															name="social"
															className="form-article__input"
															type="text"
															placeholder={team.social.twitch}
															onChange={event => handleChangeInputLng(team.slug, event, "twitch")}
														/>
													</label>
													<label className='form-article__label'>
														Youtube link:
														<input
															name="social"
															className="form-article__input"
															type="text"
															placeholder={team.social.youtube}
															onChange={event => handleChangeInputLng(team.slug, event, "youtube")}
														/>
													</label>

													<BsPlusCircleFill style={{marginRight: "2em"}} onClick={()=>handleAddFields()}/>
													<BsDashCircleFill disabled={gameTeamMembersArr.length === 1} onClick={() => handleRemoveFields(team.slug)}/>
													<ColoredLine color="red" />
												</div>
												<br />
											</>
										)) }
										{/*Team members: END*/}
									</div>

								</form>
							</div>
						</div>
						<div className="form-article__box-btn">
							<button
								className="form-article__btn"
								onClick={()=>writeToFBCallback()}
							>
								Publish
							</button>
						</div>
					</div>
				</section>
			</div>

		</>
	);
}

export default CMSGameTeamsPageEdit;