import React, {useEffect, useRef, useState} from "react";
import {projectFirestore, projectStorage} from "../../../fireBase";
import {useDataFromFirestoreCMS} from "../../../customHooks/useFirestore";

function CMSGamesSalesPageEdit() {
	// eslint-disable-next-line react/prop-types
	const {docsFromHookCMS} = useDataFromFirestoreCMS("web-app-cms");

	let selectedDoc = "";

	useEffect(() => {
		if (docsFromHookCMS) {
			selectedDoc = docsFromHookCMS.filter(function (doc) {
				return doc.id === "gameSalesPage";
			});
		}
	});

	//text
	const [ITSaleGamingText ,setITSaleGamingText] = useState("");
	const [ENSaleGamingText ,setENSaleGamingText] = useState("");

	//url
	const [ITSaleGamingBannerUrl ,setITSaleGamingBannerUrl] = useState("");
	const [ENSaleGamingBannerUrl ,setENSaleGamingBannerUrl] = useState("");
	const [ITOurRoomsBannerUrl ,setITOurRoomsBannerUrl] = useState("");
	const [ENOurRoomsBannerUrl ,setENOurRoomsBannerUrl] = useState("");

	const [ITSaleGamingBannerFileSuccess ,setITSaleGamingBannerFileSuccess] = useState(false);
	const [ENSaleGamingBannerFileSuccess ,setENSaleGamingBannerFileSuccess] = useState(false);
	const [ITOurRoomsBannerFileSuccess ,setITOurRoomsBannerFileSuccess] = useState(false);
	const [ENOurRoomsBannerFileSuccess ,setENOurRoomsBannerFileSuccess] = useState(false);

	//old
	const [oldITSaleGamingBannerUrl ,setOldITSaleGamingBannerUrl] = useState("");
	const [oldENSaleGamingBannerUrl ,setOldENSaleGamingBannerUrl] = useState("");
	const [oldITOurRoomsBannerUrl ,setOldITOurRoomsBannerUrl] = useState("");
	const [oldENOurRoomsBannerUrl ,setOldENOurRoomsBannerUrl] = useState("");

	let publishBtnRef = useRef();

	const fileTypesArray = ["image/png", "image/jpeg"];

	useEffect(() => {
		if (selectedDoc !== "") {
			selectedDoc.map(doc => {
				setITSaleGamingBannerUrl(doc.saleGamingBanner.it);
				setENSaleGamingBannerUrl(doc.saleGamingBanner.en);
				setITOurRoomsBannerUrl(doc.roomsBanner.it);
				setENOurRoomsBannerUrl(doc.roomsBanner.en);

				setOldITSaleGamingBannerUrl(doc.saleGamingBanner.it);
				setOldENSaleGamingBannerUrl(doc.saleGamingBanner.en);
				setOldITOurRoomsBannerUrl(doc.roomsBanner.it);
				setOldENOurRoomsBannerUrl(doc.roomsBanner.en);

				setITSaleGamingText(doc.saleGamingText.it);
				setENSaleGamingText(doc.saleGamingText.en);
			});
		}
	}, [docsFromHookCMS]);

	const ITSaleGamingBannerFileUploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile){
				e.preventDefault();
				try {
					const storageRef = projectStorage.ref("CMS-pictures/gameSalesPage").child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed", () => {
					},  (err) => {
						window.alert(err);
					}, async()=>{
						const finalUrl = await storageRef.getDownloadURL();
						finalUrl!==undefined?setITSaleGamingBannerFileSuccess(true):setITSaleGamingBannerFileSuccess(false);
						setITSaleGamingBannerUrl(finalUrl);
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

	const ENSaleGamingBannerFileUploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile){
				e.preventDefault();
				try {
					const storageRef = projectStorage.ref("CMS-pictures/gameSalesPage").child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed", () => {
					},  (err) => {
						window.alert(err);
					}, async()=>{
						const finalUrl = await storageRef.getDownloadURL();
						finalUrl!==undefined?setENSaleGamingBannerFileSuccess(true):setENSaleGamingBannerFileSuccess(false);
						setENSaleGamingBannerUrl(finalUrl);
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

	const ITOurRoomsBannerFileUploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile){
				e.preventDefault();
				try {
					const storageRef = projectStorage.ref("CMS-pictures/gameSalesPage").child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed", () => {
					},  (err) => {
						window.alert(err);
					}, async()=>{
						const finalUrl = await storageRef.getDownloadURL();
						finalUrl!==undefined?setITOurRoomsBannerFileSuccess(true):setITOurRoomsBannerFileSuccess(false);
						setITOurRoomsBannerUrl(finalUrl);
					});
				} catch {
					return window.alert("Failed to upload file. Try loading again.");
				}
			}
			putFile(uploadedFile).then();
		} else {
			return window.alert("Please select an image file (png or jpg)");
		}
	};

	const ENOurRoomsBannerFileUploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile){
				e.preventDefault();
				try {
					const storageRef = projectStorage.ref("CMS-pictures/gameSalesPage").child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed", () => {
					},  (err) => {
						window.alert(err);
					}, async()=>{
						const finalUrl = await storageRef.getDownloadURL();
						finalUrl!==undefined?setENOurRoomsBannerFileSuccess(true):setENOurRoomsBannerFileSuccess(false);
						setENOurRoomsBannerUrl(finalUrl);
					});
				} catch {
					window.alert("Failed to upload file. Try uploading again");
				}
			}
			putFile(uploadedFile).then();
		} else {
			window.alert("Please select an image file (png or jpg)");
		}
	};

	const writeToFBCallback = () => {
		const collectionRef = projectFirestore.collection("web-app-cms").doc("gameSalesPage");
		publishBtnRef.current&&publishBtnRef.current.setAttribute("disabled", "disabled");

		collectionRef.set(
			{
				"roomsBanner": {
					"en": ENOurRoomsBannerUrl,
					"it": ITOurRoomsBannerUrl
				},
				"saleGamingBanner": {
					"en": ENSaleGamingBannerUrl,
					"it": ITSaleGamingBannerUrl
				},
				"saleGamingText": {
					"en": ENSaleGamingText,
					"it": ITSaleGamingText
				}
			})
			.then(() => {
				publishBtnRef.current&&publishBtnRef.current.removeAttribute("disabled");
				window.alert("Content edited successfully!");
			})
			.catch((error) => {
				window.alert("Error: " + error.code + " " + error.message + " " + error.details);
			});
	};

	return (
		<>
			<div style={{paddingTop: "5em important"}}>
				<center><h1>Edit <strong>Game Sales</strong> Page static content:</h1></center>
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

									<div>
                                        Current game sales banner IT vr:
										<img style={{width: "25%", height: "auto"}} src={oldITSaleGamingBannerUrl} alt=""/>
									</div>
									<label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Sales banner:
										<input
											className='form-article__btn visually-hidden'
											type="file"
											placeholder='file'
											onChange={ITSaleGamingBannerFileUploadEventListener}
										/>
									</label>
									<div className="output">
										{ITSaleGamingBannerFileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ITSaleGamingBannerUrl} alt=""/></div> }
									</div>

									<label className='form-article__label'>
                                        Game sales text:
										<textarea
											className='form-article__input'
											rows='2'
											name="content"
											value={ITSaleGamingText}
											onChange={
												(e)=>setITSaleGamingText(e.target.value)
											}
										> </textarea>
									</label>

									<div>
                                        Current our rooms banner IT vr:
										<img style={{width: "25%", height: "auto"}} src={oldITOurRoomsBannerUrl} alt=""/>
									</div>
									<label className='form-article__label btn-upload'> <span className='icon-upload2'> </span> Rooms banner:
										<input
											className='form-article__btn visually-hidden'
											type="file"
											placeholder='file'
											onChange={ITOurRoomsBannerFileUploadEventListener}
										/>
									</label>
									<div className="output">
										{ ITOurRoomsBannerFileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ITOurRoomsBannerUrl} alt=""/></div> }
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

									<div>
										Current game sales banner EN vr:
										<img style={{width: "25%", height: "auto"}} src={oldENSaleGamingBannerUrl} alt=""/>
									</div>
									<label className='form-article__label btn-upload'> <span className='icon-upload2'> </span> Game sales banner:
										<input
											className='form-article__btn visually-hidden'
											type="file"
											placeholder='file'
											onChange={ENSaleGamingBannerFileUploadEventListener}
										/>
									</label>
									<div className="output">
										{ENSaleGamingBannerFileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ENSaleGamingBannerUrl} alt=""/></div> }
									</div>

									<label className='form-article__label'>
										Game sales text:
										<textarea
											className='form-article__input'
											rows='2'
											name="content"
											value={ENSaleGamingText}
											onChange={
												(e)=>setENSaleGamingText(e.target.value)
											}
										> </textarea>
									</label>

									<div>
										Current our rooms banner EN vr:
										<img style={{width: "25%", height: "auto"}} src={oldENOurRoomsBannerUrl} alt=""/>
									</div>
									<label className='form-article__label btn-upload'> <span className='icon-upload2'> </span> Our rooms banner EN vr
										<input
											className='form-article__btn visually-hidden'
											type="file"
											placeholder='file'
											onChange={ENOurRoomsBannerFileUploadEventListener}
										/>
									</label>
									<div className="output">
										{ ENOurRoomsBannerFileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ENOurRoomsBannerUrl} alt=""/></div> }
									</div>

								</form>

							</div>

						</div>
						<div className="form-article__box-btn">
							<button
								ref={publishBtnRef}
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

export default CMSGamesSalesPageEdit;