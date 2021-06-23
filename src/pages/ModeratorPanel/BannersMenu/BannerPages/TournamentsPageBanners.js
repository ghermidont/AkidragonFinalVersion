/* eslint-disable no-mixed-spaces-and-tabs */
import React, {useEffect, useRef, useState} from "react";
//import {useHistory} from "react-router-dom";
import {projectFirestore} from "../../../../fireBase";
import {useDataFromFirestoreCMS} from "../../../../customHooks/useFirestore";

/* Desktop:
* Vertical 160X600
* Square 250X250
* Square 320X100
* Square 320X50
* */

function TournamentsPageBanners() {
	let publishBtnRef = useRef();
	const [ITMainText, setITMainText] = useState("");
	const [ENMainText, setENMainText] = useState("");
	const [ENFooterText, setENFooterText] = useState("");
	const [ITFooterText, setITFooterText] = useState("");
	const {docsFromHookCMS} = useDataFromFirestoreCMS("web-app-cms");

	let selectedDoc = "";

	useEffect(() => {
		if (docsFromHookCMS) {
			selectedDoc = docsFromHookCMS.filter(function (doc) {
				return doc.id === "blogPage";
			});
		}
	});

	useEffect(() => {
		if (selectedDoc !== "") {
			selectedDoc.map(doc => {
				setITMainText(doc.mainText.it);
				setENMainText(doc.mainText.en);
				setENFooterText(doc.footerText.en);
				setITFooterText(doc.footerText.it);
			});
		}
	}, [docsFromHookCMS]);

	const writeToFBCallback = () => {
		const collectionRef = projectFirestore.collection("web-app-cms").doc("blogPage");
		collectionRef.set(
			{
				"footerText": {
					"en": ENFooterText,
					"it": ITFooterText
				},
				"mainText": {
					"en": ENMainText,
					"it": ITMainText
				}
			})
			.then(() => {
				window.alert("Content edited successfully!");
			})
			.catch((error) => {
				window.aler("Error: " + error.code + " " + error.message + " " + error.details);
			});
	};

	return (
		<>
			<div style={{paddingTop: "5em important"}}>
				<center><h1>Edit <strong>Blog</strong> Page banners:</h1></center>
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
										<textarea
											className='form-article__input'
											rows='2'
											name="countent"
											value={ITMainText}
											onChange={
												(e)=>setITMainText(e.target.value)
											}
										></textarea>
									</label>
									<label className='form-article__label'>
										Footer text:
										<textarea
											className='form-article__input'
											rows='2'
											name="countent"
											value={ITFooterText}
											onChange={
												(e)=>setITFooterText(e.target.value)
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
										Banner text:
										<textarea
											className='form-article__input'
											rows='2'
											name="countent"
											value={ENMainText}
											onChange={
												(e)=>setENMainText(e.target.value)
											}
										></textarea>
									</label>
									<label className='form-article__label'>
										Footer text:
										<textarea
											className='form-article__input'
											rows='2'
											name="countent"
											value={ENFooterText}
											onChange={
												(e)=>setENFooterText(e.target.value)
											}
										></textarea>
									</label>
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

export default TournamentsPageBanners;