/* eslint-disable no-mixed-spaces-and-tabs */
import React, {useEffect, useRef, useState} from "react";
import {projectFirestore} from "../../../../fireBase";
import {useDataFromFirestoreBanners} from "../../../../customHooks/useFirestore";

function IndividualArticlePageBanners() {
	let publishBtnRef = useRef();

	const [vertical, setVertical] = useState("");
	const [_250x250320x100320x50,  set250x250320x100320x50] = useState("");
	const [Top, setTop] = useState("");
	const [bottom, setBottom] = useState("");

	const {docsFromHookBanners} = useDataFromFirestoreBanners("banners");

	let selectedDoc = "";

	useEffect(() => {
		if (docsFromHookBanners) {
			selectedDoc = docsFromHookBanners.filter(function (doc) {
				return doc.id === "individualArticlePage";
			});
		}
	});

	useEffect(() => {
		if (selectedDoc !== "") {
			selectedDoc.map(doc => {
				 setVertical(doc.desktop.vertical);
				 set250x250320x100320x50(doc.desktop._250x250320x100320x50);
				 setTop(doc.mobile.top);
				 setBottom(doc.mobile.bottom);
			});
		}
	}, [docsFromHookBanners]);

	const writeToFBCallback = () => {
		const collectionRef = projectFirestore.collection("banners").doc("individualArticlePage");
		collectionRef.set(
			{
				"desktop": {
					"vertical": vertical,
					"_250x250320x100320x50": _250x250320x100320x50
				},
				"mobile": {
					"top": Top,
					"bottom": bottom
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
				<center><h1>Edit <strong>Individual Article</strong> Page banners:</h1></center>
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
							>Desktop</a>
						</li>
						<li className="nav-item">
							<a className="nav-link"
							   id="profile-tab"
							   data-toggle="tab"
							   href="#tab2"
							   role="tab"
							   aria-controls="profile"
							   aria-selected="false"
							>Mobile</a>
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
										Vertical 160x600 (left and right of the body):
										<textarea
											className='form-article__input'
											rows='2'
											name="script"
											value={vertical}
											onChange={
												(e)=>setVertical(e.target.value)
											}
										></textarea>
									</label>
									<label className='form-article__label'>
										250x250, 320x100, 320x50:
										<textarea
											className='form-article__input'
											rows='2'
											name="script"
											value={_250x250320x100320x50}
											onChange={
												(e)=>set250x250320x100320x50(e.target.value)
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
										Top (320x50, 234x60)::
										<textarea
											className='form-article__input'
											rows='2'
											name="script"
											value={Top}
											onChange={
												(e)=>setTop(e.target.value)
											}
										></textarea>
									</label>

									<label className='form-article__label'>
										Bottom (320x50, 234x60)::
										<textarea
											className='form-article__input'
											rows='2'
											name="script"
											value={bottom}
											onChange={
												(e)=>setBottom(e.target.value)
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

export default IndividualArticlePageBanners;