import React, {useState, useRef} from "react";
//import {useArticlesContext} from "../../../context/ArticlesContext";
import {projectStorage, functions} from "../../../fireBase";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import classes from "./styles/AddArticlesForm.module.scss";

export default function AddArticlesForm() {
	const {t} = useTranslation();
	let publishBtnRef = useRef();
	const fileTypesArray = ["image/png", "image/jpeg"];
	const history = useHistory();
	const [ENTitle, setENTitle] = useState("");
	const [ENDescription, setENDescription] = useState("");
	const [ENText, setENText] = useState("");
	const [ITTitle, setITTitle] = useState("");
	const [ITDescription, setITDescription] = useState("");
	const [ITText, setITText] = useState("");

	const [ITFileUploadError, setITFileUploadError] = useState("");
	const [ENFileUploadError, setENFileUploadError] = useState("");

	const [ITFileTypeError, setITFileTypeError] = useState("");
	const [ENFileTypeError, setENFileTypeError] = useState("");

	const [ITFileSuccess, setITFileSuccess] = useState(false);
	const [ENFileSuccess, setENFileSuccess] = useState(false);

	const [ITUrl, setITUrl] = useState("");
	const [ENUrl, setENUrl] = useState("");

	const [videoGamesSwitch, setVideoGamesSwitch] = useState(0);
	const [musicSwitch, setMusicSwitch] = useState(0);
	const [moviesSwitch, setMoviesSwitch] = useState(0);
	const categoryArr = [videoGamesSwitch === 1 ? "videogames" : "", moviesSwitch === 1 ? "movies" : "", musicSwitch === 1 ? "music" : ""];

	const ENFileUploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(File) {
				e.preventDefault();
				try {
					//setLoading1(true);
					setENFileUploadError("");
					setENFileTypeError("");
					const storageRef = projectStorage.ref("articles_pictures/").child(Date.now() + File.name);
					storageRef.put(File).on("state_changed", () => {
					}, (err) => {
						window.alert(err);
					}, async () => {
						const finalUrl = await storageRef.getDownloadURL();
						finalUrl !== undefined ? setENFileSuccess(true) : setENFileSuccess(false);
						setENUrl(finalUrl);
					});
				} catch {
					setENFileUploadError("Failed to upload file");
				}
			}

			putFile(uploadedFile).then();
		} else {
			setENFileTypeError("Please select an image file (png or jpg)");
		}
	};

	const ITFileUploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			// eslint-disable-next-line no-inner-declarations
			async function putFile(uploadedFile) {
				e.preventDefault();
				try {
					setITFileUploadError("");
					setITFileTypeError("");
					const storageRef = projectStorage.ref("articles_pictures/").child(Date.now() + uploadedFile.name);
					storageRef.put(uploadedFile).on("state_changed", () => {
					}, (err) => {
						window.alert(err);
					}, async () => {
						const finalUrl = await storageRef.getDownloadURL();
						finalUrl !== undefined ? setITFileSuccess(true) : setITFileSuccess(false);
						setITUrl(finalUrl);
					});
				} catch {
					setITFileUploadError("Impossibile caricare il file");
				}
			}

			putFile(uploadedFile).then();
		} else {
			setITFileTypeError("Seleziona un file immagine (png o jpg)");
		}
	};

	const publishArticleCFTrigger = () => {
		const addData = functions.httpsCallable("publishArticle");
		publishBtnRef.current&&publishBtnRef.current.setAttribute("disabled", "disabled");

		addData({
			"content": {
				"en": {
					"description": ENDescription,
					"text": ENText,
					"title": ENTitle,
					"image": ENUrl,
				},
				"it": {
					"description": ITDescription,
					"text": ITText,
					"title": ITTitle,
					"image": ITUrl,
				},

			},
			"categories": categoryArr.filter(value => value !== "")

		})
			.then(() => {
				publishBtnRef.current&&publishBtnRef.current.removeAttribute("disabled");
				// cancelBtnRef.current.removeAttribute("disabled");
				window.alert("Article added successfully!");
				history.push("/UserProfilePage", {from: "/AddArticlesForm"});
			})
			.catch((error) => {
				window.alert(error.code + " " + error.message + "" + error.details);
			});
	};

	return (
		<>
			<section className='form form__addArticle' style={{paddingTop: "20em"}}>
				<ul className="nav nav-tabs" id="myTab" role="tablist">
					<li className="nav-item">
						<a
							className="nav-link tab__btn active"
							id="home-tab"
							data-toggle="tab"
							href="#tab1"
							role="tab"
							aria-controls="home"
							aria-selected="true"
						>Italiana</a>
					</li>
					<li className="nav-item">
						<a className="nav-link tab__btn"
							id="profile-tab"
							data-toggle="tab"
							href="#tab2"
							role="tab"
							aria-controls="profile"
							aria-selected="false"
						>English</a>
					</li>
				</ul>
				<div className="tab-content addArticle" id="myTabContent">

					{/*Tab1*/}
					<div
						className="tab-pane fade show active"
						id="tab1"
						role="tabpanel"
						aria-labelledby="home-tab">
						<div className='form__body'>
							<h2 className="title form__title">Aggiungi articolo</h2>
							<form className="form">

								<input
									className='input'
									type="text"
									placeholder='Titolo'
									required
									value={ITTitle}
									onChange={
										(e) => setITTitle(e.target.value)
									}
								/>
								<textarea
									className='input'
									rows='1'
									name="text"
									placeholder='Descrizione'
									required
									value={ITDescription}
									onChange={
										(e) => setITDescription(e.target.value)
									}
								></textarea>
								<textarea
									className='input'
									rows='3'
									placeholder='Contenuti'
									required
									name="countent"
									value={ITText}
									onChange={
										(e) => setITText(e.target.value)
									}
								></textarea>
								<label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Caricare
									<input
										className='form-article__btn visually-hidden'
										type="file"
										required
										placeholder='file'
										onChange={ITFileUploadEventListener}
									/>
								</label>
								<div className="output">
									{ITFileUploadError && <div className="error">{ITFileUploadError}</div>}
									{ITFileTypeError && <div className="error">{ITFileTypeError}</div>}
									{ITFileSuccess &&
                    <div>Immagine caricata con successo: <img style={{width: "25%", height: "auto"}} src={ITUrl} alt=""/>
                    </div>}
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
						<div className='form__body'>
							<h2 className="title form__title">Add Article</h2>
							<form className="form">

								<input
									className='input'
									type="text"
									placeholder='Title'
									required
									value={ENTitle}
									onChange={
										(e) => setENTitle(e.target.value)
									}/>
								<textarea
									className='input'
									rows='1'
									placeholder='Description'
									name="text"
									value={ENDescription}
									required
									onChange={
										(e) => setENDescription(e.target.value)
									}
								></textarea>


								<textarea
									className='input'
									placeholder='Content'
									rows='3'
									name="countent"
									value={ENText}
									required
									onChange={
										(e) => setENText(e.target.value)
									}
								></textarea>
								<label className='btn-upload'> <span className='icon-upload2'></span>  Upload
									<input
										className='form-article__btn visually-hidden'
										type="file"
										required
										placeholder='file'
										onChange={ENFileUploadEventListener}
									/>
								</label>
								<div className="output">
									{ENFileUploadError && <div className="error">{ENFileUploadError}</div>}
									{ENFileTypeError && <div className="error">{ENFileTypeError}</div>}
									{ENFileSuccess &&
                    <div>Image Uploaded successfully: <img style={{width: "25%", height: "auto"}} src={ENUrl} alt=""/>
                    </div>}
								</div>
							</form>
						</div>
					</div>

					<div className={classes.title}>
						{t("AddArticlesForm.ArticleCategory")}:
					</div>

					<ul className={classes.list}>
						<li className={classes.item}>
							<label className="label__small">
								<input className={classes.checkbox}
									type="checkbox"
									onChange={() => videoGamesSwitch === 0 ? setVideoGamesSwitch(1) : setVideoGamesSwitch(0)}
								/> {t("AddArticlesForm.VideoGameCategory")}
							</label>
						</li>
						<li className={classes.item}>
							<label className="label__small">
								<input className={classes.checkbox}
									type="checkbox"
									onChange={() => musicSwitch === 0 ? setMusicSwitch(1) : setMusicSwitch(0)}
								/> {t("AddArticlesForm.MusicCategory")}
							</label>

						</li>
						<li className={classes.item}>
							<label className="label__small">
								<input className={classes.checkbox}
									type="checkbox"
									onChange={() => moviesSwitch === 0 ? setMoviesSwitch(1) : setMoviesSwitch(0)}
								/> {t("AddArticlesForm.MoviesCategory")}
							</label>
						</li>
					</ul>

					<div className={classes.btnInner}>

						<button
							ref={publishBtnRef}
							className="btn-upload"
							onClick={() => publishArticleCFTrigger()}
						>
							{t("AddArticlesForm.PublishButton")}
						</button>
					</div>
				</div>
			</section>
		</>
	);
}