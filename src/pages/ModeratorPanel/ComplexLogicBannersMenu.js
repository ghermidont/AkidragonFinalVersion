/* eslint-disable no-mixed-spaces-and-tabs */
import React, {useEffect, useRef, useState} from "react";
import {projectFirestore} from "../../fireBase";
import {useDataFromFirestoreCMS} from "../../customHooks/useFirestore";
import { BsDashCircleFill,  BsPlusCircleFill} from "react-icons/bs";
import classes from "../UserAccount/AddArticlesPage/styles/AddArticlesForm.module.scss";
import {Dropdown} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

function ComplexLogicBannersMenu() {
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

	let publishBtnRef = useRef();

	const {docsFromHookCMS} = useDataFromFirestoreCMS("banners");

	// Banners array
	const [generalBannersArray, setGeneralBannersArray] = useState([]);

	// Pages arr
	//const [pagesArray, setPagesArray] = useState([]);

	const handleAddFields = () => {
		setGeneralBannersArray([...generalBannersArray, { device: "",  script: "", position: []}]);
	};

	const handleRemoveFields = id => {
		const values  = [...generalBannersArray];
		values.splice(values.findIndex(value => value.id === id), 1);
		setGeneralBannersArray(values);
	};

	const handleInputChange = (id, event) => {
		const newInputFields = generalBannersArray.map(doc => {
			if(id === doc.id) {
				doc[event.target.name] = event.target.value;
			}
			return doc;
		});
		setGeneralBannersArray(newInputFields);
	};

	const handleInputChangePageArr = (id, event, location) => {
		const newInputFields = generalBannersArray.map(doc => {
			if(id === doc.id) {
				console.log(event.target.value);
				console.log(location);
				//doc.pages = pagesArray;
			}
			return doc;
		});
		setGeneralBannersArray(newInputFields);
	};

	let bannersArr = [];

	useEffect(() => {
		if (docsFromHookCMS) {
			docsFromHookCMS.map(banner => {
				bannersArr.push({...banner, id: uuidv4()});
				setGeneralBannersArray(bannersArr);
			});
		}
	}, [docsFromHookCMS]);

	const writeToFBCallback = () => {
		const collectionRef = projectFirestore.collection("banners").doc("banners");

		collectionRef.set(
			{
				"banners": generalBannersArray
			})
			.then(() => {
				window.alert("Banners edited successfully!");
			})
			.catch((error) => {
				window.alert("Error: " + error.code + " " + error.message + " " + error.details);
			});
	};

	return (
		<>
			<div style={{paddingTop: "5em important"}}>
				<center><h1>Edit <strong>Banners</strong></h1></center>
				<section>
					<div>
						{ generalBannersArray.map(banner => (
							<>
								<div key={banner.id}>
									<Dropdown>
										<Dropdown.Toggle variant="success" id="dropdown-basic">
											{banner.device !== "" ? banner.device : "Device type"}
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Dropdown.Item value="desktop" name="device" onClick={event => handleInputChange(banner.id, event)}>Desktop</Dropdown.Item>
											<Dropdown.Item value="mobile" name="device" onClick={event => handleInputChange(banner.id, event)}>Mobile</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>

									<label className='form-article__label'>
                                        Script:
										<input
											name="title"
											className='form-article__input'
											type="text"
											placeholder={banner.script}
											onChange={event => handleInputChange(banner.id, event)}
										/>
									</label>

									    <label className='form-article__label'>
										Pages:
										<ul className={classes.list}>
											<li className={classes.item}>
												<label className="label__small">
													<input className={classes.checkbox}
														name = "position"
														type="checkbox"
														onChange={event => handleInputChangePageArr(banner.id, event, "HomeTop")}
													/> Home page top
												</label>
											</li>
											<li className={classes.item}>
												<label className="label__small">
													<input className={classes.checkbox}
														   name = "position"
														   type="checkbox"
														   onChange={event => handleInputChangePageArr(banner.id, event, "HomeMiddle")}
													/> Home page middle
												</label>

											</li>
											<li className={classes.item}>
												<label className="label__small">
													<input className={classes.checkbox}
														   name = "position"
															   type="checkbox"
														   onChange={event => handleInputChangePageArr(banner.id, event, "HomeBottom")}
													/> Home page bottom
												</label>
											</li>
											<li className={classes.item}>
												<label className="label__small">
													<input className={classes.checkbox}
														   name = "position"
														   type="checkbox"
														   onChange={event => handleInputChangePageArr(banner.id, event,"Tournaments")}
													/> Tournaments page
												</label>
											</li>
											<li className={classes.item}>
												<label className="label__small">
													<input className={classes.checkbox}
														   name = "position"
														   type="checkbox"
														   onChange={event => handleInputChangePageArr(banner.id, event, "BlogTop")}
													/> Blog page top
												</label>
											</li>
											<li className={classes.item}>
												<label className="label__small">
													<input className={classes.checkbox}
														   name = "position"
														   type="checkbox"
														   onChange={event => handleInputChangePageArr(banner.id, event, "BlogBottom")}
													/> Blog page bottom
												</label>
											</li>
											<li className={classes.item}>
												<label className="label__small">
													<input className={classes.checkbox}
														   name = "position"
														   type="checkbox"
														   onChange={event => handleInputChangePageArr(banner.id, event, "ArticleTop")}
													/> Article page top
												</label>
											</li>
											<li className={classes.item}>
												<label className="label__small">
													<input className={classes.checkbox}
														   name = "position"
														   type="checkbox"
														   onChange={event => handleInputChangePageArr(banner.id, event, "ArticleBottom")}
													/> Article page bottom
												</label>
											</li>
											<li className={classes.item}>
												<label className="label__small">
													<input className={classes.checkbox}
														   name = "position"
														   type="checkbox"
														   onChange={event => handleInputChangePageArr(banner.id, event, "Blog")}
													/> Blog page
												</label>
											</li>
											<li className={classes.item}>
												<label className="label__small">
													<input className={classes.checkbox}
														   name = "position"
														   type="checkbox"
														   onChange={event => handleInputChangePageArr(banner.id, event, "Content")}
													/> Content (stream) page
												</label>
											</li>
										</ul>
									</label>
									<ul>Current positions:
										{banner.position.map(position=><li key={banner.id}>{position}</li>
										)}
									</ul>
									
									<BsPlusCircleFill style={{marginRight: "2em"}} onClick={()=>handleAddFields()}/>
									<BsDashCircleFill disabled={generalBannersArray.length === 1} onClick={() => handleRemoveFields(banner.id)}/>
									<ColoredLine color="red" />
								</div>
								<br />
							</>
						)) }

						{/*Team members: END*/}

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
					{docsFromHookCMS.length===0&&<BsPlusCircleFill style={{marginRight: "2em"}} onClick={()=>handleAddFields()}/>}
        		</section>
			</div>
		</>
	);
}

export default ComplexLogicBannersMenu;