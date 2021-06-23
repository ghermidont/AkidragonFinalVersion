/* eslint-disable no-mixed-spaces-and-tabs */
import React, {useEffect, useRef, useState} from "react";
import {projectFirestore} from "../../fireBase";
import {useDataFromFirestoreCMS} from "../../customHooks/useFirestore";
import { BsDashCircleFill,  BsPlusCircleFill} from "react-icons/bs";
import classes from "../UserAccount/AddArticlesPage/styles/AddArticlesForm.module.scss";
//import { v4 as uuidv4 } from "uuid";

function BannersMenu() {
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
	console.log(docsFromHookCMS);
	// Banners array
	const [generalBannersArray, setGeneralBannersArray] = useState([]);

	const handleAddFields = () => {
		setGeneralBannersArray([...generalBannersArray, { logo: "",  avatar: "", title: {en: "", it: "" }}]);
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

	//let bannersArr = [];

	useEffect(() => {
		console.log(docsFromHookCMS);
		// if (docsFromHookCMS !== undefined) {
		// 	docsFromHookCMS.banners.map(banner => {
		// 		bannersArr.push({...banner, id: uuidv4()});
		// 		setGeneralBannersArray(bannersArr);
		// 	});
		// }
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
					<div>Team members list:
						{ generalBannersArray.map(banner => (
							<>
								<div key={banner.id}>									
									<label className='form-article__label'>
                                                        Device:
										<input
											name="device"
											className='form-article__input'
											type="text"
											placeholder={banner.device}
											onChange={event => handleInputChange(banner.id, event)}
										/>
									</label>			

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
											
										<input
											name="pages"
											className='form-article__input'
											type="text"
											placeholder={banner.script}
											onChange={event => handleInputChange(banner.id, event)}
										/>
									</label>
									<ul>
										{banner.map(page=>
											<li key={banner.id}>{page}</li>
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
        		</section>
			</div>
		</>
	);
}

export default BannersMenu;