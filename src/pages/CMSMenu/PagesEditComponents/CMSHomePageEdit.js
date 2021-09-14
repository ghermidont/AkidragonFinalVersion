/** Consider implementing the DRY principle. */
import React, {useEffect, useRef, useState} from "react";
import {projectFirestore, projectStorage} from "../../../fireBase";
import {useDataFromFirestoreCMS} from "../../../customHooks/useFirestore";

function CMSHomePageEdit() {
	let publishBtnRef = useRef();
	const fileTypesArray = ["image/png", "image/jpeg"];

	//Url states
	const [ENBannerUrl, setENBannerUrl] = useState("");
	const [ENContactsBannerUrl, setENContactsBannerUrl] = useState("");
	const [ENGameTeamsBannerUrl, setENGameTeamsBannerUrl] = useState("");
	const [ENSalesBannerUrl, setENSalesBannerUrl] = useState("");
	const [ENSponsorshipBannerUrl, setENSponsorshipBannerUrl] = useState("");
	const [ENTournamentsBannerUrl, setENTournamentsBannerUrl] = useState("");
	const [ITBannerUrl, setITBannerUrl] = useState("");
	const [ITContactsBannerUrl, setITContactsBannerUrl] = useState("");
	const [ITGameTeamsBannerUrl, setITGameTeamsBannerUrl] = useState("");
	const [ITSalesBannerUrl, setITSalesBannerUrl] = useState("");
	const [ITSponsorshipBannerUrl, setITSponsorshipBannerUrl] = useState("");
	const [ITTournamentsBannerUrl, setITTournamentsBannerUrl] = useState("");

	const [oldENBannerUrl,setOldENBannerUrl] = useState("");
	const [oldENContactsBannerUrl, setOldENContactsBannerUrl] = useState("");
	const [oldENGameTeamsBannerUrl, setOldENGameTeamsBannerUrl] = useState("");
	const [oldENSalesBannerUrl, setOldENSalesBannerUrl] = useState("");
	const [oldENSponsorshipBannerUrl, setOldENSponsorshipBannerUrl] = useState("");
	const [oldENTournamentsBannerUrl, setOldENTournamentsBannerUrl] = useState("");
	const [oldITBannerUrl, setOldITBannerUrl] = useState("");
	const [oldITContactsBannerUrl, setOldITContactsBannerUrl] = useState("");
	const [oldITGameTeamsBannerUrl, setOldITGameTeamsBannerUrl] = useState("");
	const [oldITSalesBannerUrl, setOldITSalesBannerUrl] = useState("");
	const [oldITSponsorshipBannerUrl, setOldITSponsorshipBannerUrl] = useState("");
	const [oldITTournamentsBannerUrl, setOldITTournamentsBannerUrl] = useState("");

	//Errors
	const [ENBannerUploadError, setENBannerUploadError] = useState("");
	const [ENContactsBannerUploadError, setENContactsBannerUploadError] = useState("");
	const [ENGameTeamsBannerUploadError, setENGameTeamsBannerUploadError] = useState("");
	const [ENSalesBannerUploadError, setENSalesBannerUploadError] = useState("");
	const [ENSponsorshipBannerUploadError, setENSponsorshipBannerUploadError] = useState("");
	const [ENTournamentsBannerUploadError, setENTournamentsBannerUploadError] = useState("");
	const [ITBannerUploadError, setITBannerUploadError] = useState("");
	const [ITContactsBannerUploadError, setITContactsBannerUploadError] = useState("");
	const [ITGameTeamsBannerUploadError, setITGameTeamsBannerUploadError] = useState("");
	const [ITSalesBannerUploadError, setITSalesBannerUploadError] = useState("");
	const [ITSponsorshipBannerUploadError, setITSponsorshipBannerUploadError] = useState("");
	const [ITTournamentsBannerUploadError, setITTournamentsBannerUploadError] = useState("");

	const [ENBannerFileTypeError, setENBannerFileTypeError] = useState("");
	const [ENContactsBannerFileTypeError, setENContactsBannerFileTypeError] = useState("");
	const [ENGameTeamsBannerFileTypeError, setENGameTeamsBannerFileTypeError] = useState("");
	const [ENSalesBannerFileTypeError, setENSalesBannerFileTypeError] = useState("");
	const [ENSponsorshipBannerFileTypeError, setENSponsorshipBannerFileTypeError] = useState("");
	const [ENTournamentsBannerUrlFileTypeError, setENTournamentsBannerUrlFileTypeError] = useState("");
	const [ITBannerFileTypeError, setITBannerFileTypeError] = useState("");
	const [ITContactsBannerFileTypeError, setITContactsBannerFileTypeError] = useState("");
	const [ITGameTeamsBannerFileTypeError, setITGameTeamsBannerFileTypeError] = useState("");
	const [ITSalesBannerFileTypeError, setITSalesBannerFileTypeError] = useState("");
	const [ITSponsorshipBannerFileTypeError, setITSponsorshipBannerFileTypeError] = useState("");
	const [ITTournamentsBannerUrlFileTypeError, setITTournamentsBannerUrlFileTypeError] = useState("");

	//Success
	const [ENBannerFileSuccess, setENBannerFileSuccess] = useState(false);
	const [ENContactsBannerFileSuccess, setENContactsBannerFileSuccess] = useState(false);
	const [ENGameTeamsBannerFileSuccess, setENGameTeamsBannerFileSuccess] = useState(false);
	const [ENSalesBannerFileSuccess, setENSalesBannerFileSuccess] = useState(false);
	const [ENSponsorshipBannerFileSuccess, setENSponsorshipBannerFileSuccess] = useState(false);
	const [ENTournamentsBannerUrlFileSuccess, setENTournamentsBannerFileSuccess] = useState(false);
	const [ITBannerFileSuccess, setITBannerFileSuccess] = useState(false);
	const [ITContactsBannerFileSuccess, setITContactsBannerFileSuccess] = useState(false);
	const [ITGameTeamsBannerFileSuccess, setITGameTeamsBannerFileSuccess] = useState(false);
	const [ITSalesBannerFileSuccess, setITSalesBannerFileSuccess] = useState(false);
	const [ITSponsorshipBannerFileSuccess, setITSponsorshipBannerFileSuccess] = useState(false);
	const [ITTournamentsBannerFileSuccess, setITTournamentsBannerUrlFileSuccess] = useState(false);

	const [ITBannerText, setITBannerText] = useState("");
	const [ENBannerText, setENBannerText] = useState("");

	//Getting data from the database.
	const {docsFromHookCMS} = useDataFromFirestoreCMS("web-app-cms");

	let selectedDoc = "";

	//Filtering data from the database.
	useEffect(() => {
		if (docsFromHookCMS) {
			selectedDoc = docsFromHookCMS.filter(function (doc) {
				return doc.id === "homePage";
			});
		}
	});
	//Updating states on each call from the database.
	useEffect(() => {
		if (selectedDoc !== "") {
			selectedDoc.map(doc => {
				setENBannerText(doc.bannerText.it);
				setITBannerText(doc.bannerText.en);
				setENBannerUrl(doc.banner.en);
				setENContactsBannerUrl(doc.contactsBanner.en);
				setENGameTeamsBannerUrl(doc.gameTeamsBanner.en);
				setENSalesBannerUrl(doc.salesBanner.en);
				setENSponsorshipBannerUrl(doc.sponsorship.en);
				setENTournamentsBannerUrl(doc.tournamentsBanner.en);
				setITBannerUrl(doc.banner.it);
				setITContactsBannerUrl(doc.contactsBanner.it);
				setITGameTeamsBannerUrl(doc.gameTeamsBanner.it);
				setITSalesBannerUrl(doc.salesBanner.it);
				setITSponsorshipBannerUrl(doc.sponsorship.it);
				setITTournamentsBannerUrl(doc.tournamentsBanner.it);

				setOldENBannerUrl(doc.banner.en);
				setOldENContactsBannerUrl(doc.contactsBanner.en);
				setOldENGameTeamsBannerUrl(doc.gameTeamsBanner.en);
				setOldENSalesBannerUrl(doc.salesBanner.en);
				setOldENSponsorshipBannerUrl(doc.sponsorship.en);
				setOldENTournamentsBannerUrl(doc.tournamentsBanner.en);
				setOldITBannerUrl(doc.banner.it);
				setOldITContactsBannerUrl(doc.contactsBanner.it);
				setOldITGameTeamsBannerUrl(doc.gameTeamsBanner.it);
				setOldITSalesBannerUrl(doc.salesBanner.it);
				setOldITSponsorshipBannerUrl(doc.sponsorship.it);
				setOldITTournamentsBannerUrl(doc.tournamentsBanner.it);
			});
		}
	}, [docsFromHookCMS]);

	// File upload event listeners. START
	const ENBannerFileUploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {

			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile){
				e.preventDefault();
				try {
					setENBannerUploadError("");
					setENBannerFileTypeError("");
					const storageRef = projectStorage.ref("CMS-pictures/homePage").child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed", () => {
					},  (err) => {
						window.alert(err);
					}, async()=>{
						const finalUrl = await storageRef.getDownloadURL();
						finalUrl!==undefined?setENBannerFileSuccess(true):setENBannerFileSuccess(false);
						setENBannerUrl(finalUrl);
					});
				} catch {
					setENBannerUploadError("Failed to upload file");
				}
			}
			putFile(uploadedFile).then();
		} else {
			setENBannerFileTypeError("Please select an image file (png or jpg)");
		}
	};

	const ENContactsBannerFileUploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {

			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile){
				e.preventDefault();
				try {
					setENContactsBannerUploadError("");
					setENContactsBannerFileTypeError("");
					const storageRef = projectStorage.ref("CMS-pictures/homePage").child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed", () => {
					},  (err) => {
						window.alert(err);
					}, async()=>{
						const finalUrl = await storageRef.getDownloadURL();
						finalUrl!==undefined?setENContactsBannerFileSuccess(true):setENContactsBannerFileSuccess(false);
						setENContactsBannerUrl(finalUrl);
					});
				} catch {
					setENContactsBannerUploadError("Failed to upload file");
				}
			}
			putFile(uploadedFile).then();
		} else {
			setENContactsBannerFileTypeError("Please select an image file (png or jpg)");
		}
	};

	const ENGameTeamsBannerUrlFileUploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile){
				e.preventDefault();
				try {
					setENGameTeamsBannerUploadError("");
					setENGameTeamsBannerFileTypeError("");
					const storageRef = projectStorage.ref("CMS-pictures/homePage").child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed", () => {
					},  (err) => {
						window.alert(err);
					}, async()=>{
						const finalUrl = await storageRef.getDownloadURL();
						finalUrl!==undefined?setENGameTeamsBannerFileSuccess(true):setENGameTeamsBannerFileSuccess(false);
						setENGameTeamsBannerUrl(finalUrl);
					});
				} catch {
					setENGameTeamsBannerUploadError("Failed to upload file");
				}
			}
			putFile(uploadedFile).then();
		} else {
			setENGameTeamsBannerFileTypeError("Please select an image file (png or jpg)");
		}
	};

	const ENSalesBannerFileUploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile){
				e.preventDefault();
				try {
					setENSalesBannerUploadError("");
					setENSalesBannerFileTypeError("");
					const storageRef = projectStorage.ref("CMS-pictures/homePage").child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed", () => {
					},  (err) => {
						window.alert(err);
					}, async()=>{
						const finalUrl = await storageRef.getDownloadURL();
						finalUrl!==undefined?setENSalesBannerFileSuccess(true):setENSalesBannerFileSuccess(false);
						setENSalesBannerUrl(finalUrl);
					});
				} catch {
					setENSalesBannerUploadError("Failed to upload file");
				}
			}
			putFile(uploadedFile).then();
		} else {
			setENSalesBannerFileTypeError("Please select an image file (png or jpg)");
		}
	};

	const ENSponsorshipBannerFileUploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile){
				e.preventDefault();
				try {
					setENSponsorshipBannerUploadError("");
					setENSponsorshipBannerFileTypeError("");
					const storageRef = projectStorage.ref("CMS-pictures/homePage").child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed", () => {
					},  (err) => {
						window.alert(err);
					}, async()=>{
						const finalUrl = await storageRef.getDownloadURL();
						finalUrl!==undefined?setENSponsorshipBannerFileSuccess(true):setENSponsorshipBannerFileSuccess(false);
						setENSponsorshipBannerUrl(finalUrl);
					});
				} catch {
					setENSponsorshipBannerUploadError("Failed to upload file");
				}
			}
			putFile(uploadedFile).then();
		} else {
			setENSponsorshipBannerFileTypeError("Please select an image file (png or jpg)");
		}
	};

	const ENTournamentsBannerFileUploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile){
				e.preventDefault();
				try {
					setENTournamentsBannerUploadError("");
					setENTournamentsBannerUrlFileTypeError("");
					const storageRef = projectStorage.ref("CMS-pictures/homePage").child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed", () => {
					},  (err) => {
						window.alert(err);
					}, async()=>{
						const finalUrl = await storageRef.getDownloadURL();
						finalUrl!==undefined?setENTournamentsBannerFileSuccess(true):setENTournamentsBannerFileSuccess(false);
						setENTournamentsBannerUrl(finalUrl);

					});
				} catch {
					setENTournamentsBannerUploadError("Failed to upload file");
				}
			}
			putFile(uploadedFile).then();
		} else {
			setENTournamentsBannerUrlFileTypeError("Please select an image file (png or jpg)");
		}
	};

	const ITBannerUrlFileUploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile){
				e.preventDefault();
				try {
					setITBannerUploadError("");
					setITBannerFileTypeError("");
					const storageRef = projectStorage.ref("CMS-pictures/homePage").child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed", () => {
					},  (err) => {
						window.alert(err);
					}, async()=>{
						const finalUrl = await storageRef.getDownloadURL();
						finalUrl!==undefined?setITBannerFileSuccess(true):setITBannerFileSuccess(false);
						setITBannerUrl(finalUrl);
					});
				} catch {
					setITBannerUploadError("Failed to upload file");
				}
			}
			putFile(uploadedFile).then();
		} else {
			setITBannerFileTypeError("Please select an image file (png or jpg)");
		}
	};

	const ITContactsBannerUrlFileUploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile){
				e.preventDefault();
				try {
					setITContactsBannerUploadError("");
					setITContactsBannerFileTypeError("");
					const storageRef = projectStorage.ref("CMS-pictures/homePage").child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed", () => {
					},  (err) => {
						window.alert(err);
					}, async()=>{
						const finalUrl = await storageRef.getDownloadURL();
						finalUrl!==undefined?setITContactsBannerFileSuccess(true):setITContactsBannerFileSuccess(false);
						setITContactsBannerUrl(finalUrl);
					});
				} catch {
					setITContactsBannerUploadError("Failed to upload file");
				}
			}
			putFile(uploadedFile).then();
		} else {
			setITContactsBannerFileTypeError("Please select an image file (png or jpg)");
		}
	};

	const ITGameTeamsBannerFileUploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile){
				e.preventDefault();
				try {
					setITGameTeamsBannerUploadError("");
					setITGameTeamsBannerFileTypeError("");
					const storageRef = projectStorage.ref("CMS-pictures/homePage").child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed", () => {
					},  (err) => {
						window.alert(err);
					}, async()=>{
						const finalUrl = await storageRef.getDownloadURL();
						finalUrl!==undefined?setITGameTeamsBannerFileSuccess(true):setITGameTeamsBannerFileSuccess(false);
						setITGameTeamsBannerUrl(finalUrl);
					});
				} catch {
					setITGameTeamsBannerUploadError("Failed to upload file");
				}
			}
			putFile(uploadedFile).then();
		} else {
			setITGameTeamsBannerFileTypeError("Please select an image file (png or jpg)");
		}
	};

	const ITSalesBannerFileUploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile){
				e.preventDefault();
				try {
					setITSalesBannerFileTypeError("");
					setITSalesBannerUploadError("");
					const storageRef = projectStorage.ref("CMS-pictures/homePage").child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed", () => {
					},  (err) => {
						window.alert(err);
					}, async()=>{
						const finalUrl = await storageRef.getDownloadURL();
						finalUrl!==undefined?setITSalesBannerFileSuccess(true):setITSalesBannerFileSuccess(false);
						setITSalesBannerUrl(finalUrl);
					});
				} catch {
					setITSalesBannerUploadError("Failed to upload file");
				}
			}
			putFile(uploadedFile).then();
		} else {
			setITSalesBannerFileTypeError("Please select an image file (png or jpg)");
		}
	};

	const ITSponsorshipBannerFileUploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile){
				e.preventDefault();
				try {
					setITSponsorshipBannerFileTypeError("");
					setITSponsorshipBannerUploadError("");
					const storageRef = projectStorage.ref("CMS-pictures/homePage").child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed", () => {
					},  (err) => {
						window.alert(err);
					}, async()=>{
						const finalUrl = await storageRef.getDownloadURL();
						finalUrl!==undefined?setITSponsorshipBannerFileSuccess(true):setITSponsorshipBannerFileSuccess(false);
						setITSponsorshipBannerUrl(finalUrl);
					});
				} catch {
					setITSponsorshipBannerUploadError("Failed to upload file");
				}
			}
			putFile(uploadedFile).then();
		} else {
			setITSponsorshipBannerFileTypeError("Please select an image file (png or jpg)");
		}
	};

	const ITTournamentsBannerFileUploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile){
				e.preventDefault();
				try {
					setITTournamentsBannerUploadError("");
					setITTournamentsBannerUrlFileTypeError("");
					const storageRef = projectStorage.ref("CMS-pictures/homePage").child(uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed", () => {
					},  (err) => {
						window.alert(err);
					}, async()=>{
						const finalUrl = await storageRef.getDownloadURL();
						finalUrl!==undefined?setITTournamentsBannerUrlFileSuccess(true):setITTournamentsBannerUrlFileSuccess(false);
						setITTournamentsBannerUrl(finalUrl);
					});
				} catch {
					setITTournamentsBannerUploadError("Failed to upload file");
				}
			}
			putFile(uploadedFile).then();
		} else {
			setITTournamentsBannerUrlFileTypeError("Please select an image file (png or jpg)");
		}
	};
	// File upload event listeners. END

	//Writing data to the database.
	const writeToFBCallback = () => {
		const collectionRef = projectFirestore.collection("web-app-cms").doc("homePage");

		collectionRef.set(
			{
				"banner": {
					"en": ENBannerUrl,
					"it": ITBannerUrl
				},
				"bannerText": {
					"en": ENBannerText,
					"it": ITBannerText
				},
				"contactsBanner": {
					"en": ENContactsBannerUrl,
					"it": ITContactsBannerUrl
				},
				"gameTeamsBanner": {
					"en": ENGameTeamsBannerUrl,
					"it": ITGameTeamsBannerUrl
				},
				"salesBanner": {
					"en": ENSalesBannerUrl,
					"it": ITSalesBannerUrl
				},
				"sponsorship": {
					"en": ENSponsorshipBannerUrl,
					"it": ITSponsorshipBannerUrl
				},
				"tournamentsBanner": {
					"en": ENTournamentsBannerUrl,
					"it": ITTournamentsBannerUrl
				}
			})
			.then(() => {
				window.alert("Stream added successfully!");
			})
			.catch((error) => {
				window.alert(error.code + " " + error.message + "" + error.details);
			});
	};

	return (
		<>
			<div style={{paddingTop: "5em important"}}>
				<center><h1>Edit <strong>Home</strong> Page static content:</h1></center>
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
                                    Banner text:
										<input
											className='form-article__input'
											type="text"
											value={ITBannerText}
											onChange={
												(e)=>setITBannerText(e.target.value)
											}
										/>
									</label>
									{/*1*/}
									<label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Main banner
										<input
											className='form-article__btn visually-hidden'
											type="file"
											required
											placeholder='file'
											onChange={ITBannerUrlFileUploadEventListener}
										/>
									</label>
									<div className="output">
										{ ITBannerUploadError!=="" && <div className="error">{ ITBannerUploadError }</div>}
										{ ITBannerFileTypeError!=="" && <div className="error">{ ITBannerFileTypeError }</div> }
										{ITBannerFileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ITBannerUrl} alt=""/></div> }
									</div>
									<div>Current main banner: <img style={{width: "25%", height: "auto"}} src={oldITBannerUrl} alt=""/></div>
									<br/>

									{/*2*/}
									<label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Tournaments banner
										<input
											className='form-article__btn visually-hidden'
											type="file"
											required
											placeholder='file'
											onChange={ITTournamentsBannerFileUploadEventListener}
										/>
									</label>
									<div className="output">
										{ ITTournamentsBannerUploadError!=="" && <div className="error">{ ITTournamentsBannerUploadError }</div>}
										{ ITTournamentsBannerUrlFileTypeError!=="" && <div className="error">{ ITTournamentsBannerUrlFileTypeError }</div> }
										{ITTournamentsBannerFileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ITTournamentsBannerUrl} alt=""/></div> }
									</div>
									<div>Current main banner: <img style={{width: "25%", height: "auto"}} src={oldITTournamentsBannerUrl} alt=""/></div>
									<br/>

									{/*3*/}
									<label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Game teams banner
										<input
											className='form-article__btn visually-hidden'
											type="file"
											required
											placeholder='file'
											onChange={ITGameTeamsBannerFileUploadEventListener}
										/>
									</label>
									<div className="output">
										{ ITGameTeamsBannerUploadError!=="" && <div className="error">{ ITGameTeamsBannerUploadError }</div>}
										{ ITGameTeamsBannerFileTypeError!=="" && <div className="error">{ ITGameTeamsBannerFileTypeError }</div> }
										{ITGameTeamsBannerFileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ITGameTeamsBannerUrl} alt=""/></div> }
									</div>
									<div>Current main banner: <img style={{width: "25%", height: "auto"}} src={oldITGameTeamsBannerUrl} alt=""/></div>
									<br/>

									{/*4*/}
									<label className='form-article__label btn-upload'> <span className='icon-upload2'></span> SalesBanner
										<input
											className='form-article__btn visually-hidden'
											type="file"
											required
											placeholder='file'
											onChange={ITSalesBannerFileUploadEventListener}
										/>
									</label>
									<div className="output">
										{ ITSalesBannerUploadError!=="" && <div className="error">{ ITSalesBannerUploadError }</div>}
										{ ITSalesBannerFileTypeError!=="" && <div className="error">{ ITSalesBannerFileTypeError}</div> }
										{ ITSalesBannerFileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ITSalesBannerUrl} alt=""/></div> }
									</div>
									<div>Current sales banner: <img style={{width: "25%", height: "auto"}} src={oldITSalesBannerUrl} alt=""/></div>
									<br/>

									{/*5*/}
									<label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Sponsorship banner
										<input
											className='form-article__btn visually-hidden'
											type="file"
											required
											placeholder='file'
											onChange={ITSponsorshipBannerFileUploadEventListener}
										/>
									</label>
									<div className="output">
										{ ITSponsorshipBannerUploadError!=="" && <div className="error">{ ITSponsorshipBannerUploadError }</div>}
										{ ITSponsorshipBannerFileTypeError!=="" && <div className="error">{ ITSponsorshipBannerFileTypeError }</div> }
										{ ITSponsorshipBannerFileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ITSponsorshipBannerUrl} alt=""/></div> }
									</div>
									<div>Current sponsorship banner: <img style={{width: "25%", height: "auto"}} src={oldITSponsorshipBannerUrl} alt=""/></div>
									<br/>

									{/*6*/}
									<label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Contacts banner
										<input
											className='form-article__btn visually-hidden'
											type="file"
											required
											placeholder='file'
											onChange={ITContactsBannerUrlFileUploadEventListener}
										/>
									</label>
									<div className="output">
										{ ITContactsBannerUploadError!=="" && <div className="error">{ ITContactsBannerUploadError }</div>}
										{ ITContactsBannerFileTypeError!=="" && <div className="error">{ ITContactsBannerFileTypeError}</div> }
										{ITContactsBannerFileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ITContactsBannerUrl} alt=""/></div> }
									</div>
									<div>Current contacts banner: <img style={{width: "25%", height: "auto"}} src={oldITContactsBannerUrl} alt=""/></div>
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
                                    Banner text:
										<input
											className='form-article__input'
											type="text"
											value={ENBannerText}
											onChange={
												(e)=>setENBannerText(e.target.value)
											}
										/>
									</label>
									{/*1*/}
									<label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Main banner
										<input
											className='form-article__btn visually-hidden'
											type="file"
											required
											placeholder='file'
											onChange={ENBannerFileUploadEventListener}
										/>
									</label>
									<div className="output">
										{ ENBannerUploadError!=="" && <div className="error">{ ENBannerUploadError}</div>}
										{ ENBannerFileTypeError!=="" && <div className="error">{ ENBannerFileTypeError }</div> }
										{ENBannerFileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ENBannerUrl} alt=""/></div> }
									</div>
									<div>Current main banner: <img style={{width: "25%", height: "auto"}} src={oldENBannerUrl} alt=""/></div>
									<br/>

									{/*2*/}
									<label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Tournaments banner
										<input
											className='form-article__btn visually-hidden'
											type="file"
											required
											placeholder='file'
											onChange={ENTournamentsBannerFileUploadEventListener}
										/>
									</label>
									<div className="output">
										{ ENTournamentsBannerUploadError!=="" && <div className="error">{ ENTournamentsBannerUploadError }</div>}
										{ ENTournamentsBannerUrlFileTypeError!=="" && <div className="error">{ ENTournamentsBannerUrlFileTypeError }</div> }
										{ENTournamentsBannerUrlFileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ENTournamentsBannerUrl} alt=""/></div> }
									</div>
									<div>Current tournaments banner: <img style={{width: "25%", height: "auto"}} src={oldENTournamentsBannerUrl} alt=""/></div>
									<br/>

									{/*3*/}
									<label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Game teams banner
										<input
											className='form-article__btn visually-hidden'
											type="file"
											required
											placeholder='file'
											onChange={ENGameTeamsBannerUrlFileUploadEventListener}
										/>
									</label>3
									<div className="output">
										{ ENGameTeamsBannerUploadError!=="" && <div className="error">{ ENGameTeamsBannerUploadError }</div>}
										{ ENGameTeamsBannerFileTypeError!=="" && <div className="error">{ ENGameTeamsBannerFileTypeError }</div> }
										{ ENGameTeamsBannerFileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ENGameTeamsBannerUrl} alt=""/></div> }
									</div>
									<div>Current game teams banner: <img style={{width: "25%", height: "auto"}} src={oldENGameTeamsBannerUrl} alt=""/></div>
									<br/>

									{/*4*/}
									<label className='form-article__label btn-upload'> <span className='icon-upload2'></span> SalesBanner
										<input
											className='form-article__btn visually-hidden'
											type="file"
											required
											placeholder='file'
											onChange={ENSalesBannerFileUploadEventListener}
										/>
									</label>
									<div className="output">
										{ ENSalesBannerUploadError!=="" && <div className="error">{ENSalesBannerUploadError}</div>}
										{ ENSalesBannerFileTypeError!=="" && <div className="error">{ ENSalesBannerFileTypeError }</div> }
										{ENSalesBannerFileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ENSalesBannerUrl} alt=""/></div> }
									</div>
									<div>Current sales banner: <img style={{width: "25%", height: "auto"}} src={oldENSalesBannerUrl} alt=""/></div>
									<br/>

									{/*5*/}
									<label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Sponsorship banner
										<input
											className='form-article__btn visually-hidden'
											type="file"
											required
											placeholder='file'
											onChange={ENSponsorshipBannerFileUploadEventListener}
										/>
									</label>
									<div className="output">
										{ ENSponsorshipBannerUploadError!=="" && <div className="error">{ ENSponsorshipBannerUploadError }</div>}
										{ ENSponsorshipBannerFileTypeError!=="" && <div className="error">{ ENSponsorshipBannerFileTypeError }</div> }
										{ENSponsorshipBannerFileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ENSponsorshipBannerUrl} alt=""/></div> }
									</div>
									<div>Current sponsorship banner: <img style={{width: "25%", height: "auto"}} src={oldENSponsorshipBannerUrl} alt=""/></div>
									<br/>

									{/*6*/}
									<label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Contacts banner
										<input
											className='form-article__btn visually-hidden'
											type="file"
											required
											placeholder='file'
											onChange={ENContactsBannerFileUploadEventListener}
										/>
									</label>
									<div className="output">
										{ ENContactsBannerUploadError!=="" && <div className="error">{ ENContactsBannerUploadError }</div>}
										{ ENContactsBannerFileTypeError!=="" && <div className="error">{ ENContactsBannerFileTypeError }</div> }
										{ ENContactsBannerFileSuccess&&<div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ENContactsBannerUrl} alt=""/></div> }
									</div>
									<div>Current contacts banner: <img style={{width: "25%", height: "auto"}} src={oldENContactsBannerUrl} alt=""/></div>
									<br/>

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

export default CMSHomePageEdit;