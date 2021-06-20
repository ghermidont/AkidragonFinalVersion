import React from "react";
import {useArticlesContext} from "../../../context/ArticlesContext";
import {useHistory} from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Step5CheckboxGameQtPage({surveyResultObject}) {
	const {writeSurveyToFirestoreUF} = useArticlesContext();
	const history = useHistory();

	const writeSurveyToFireBase = () =>{
		writeSurveyToFirestoreUF(surveyResultObject);
		history.push("/UserProfilePage", {from: "/MainSurveyPage"});
	};

	return(
		<>
			<div>What category of games?</div>
			<div className="form-check">
				<input className="form-check-input" type="checkbox" value="Multiplayer"></input>
				<label className="form-check-label" htmlFor="flexCheckDefault">
                        Multiplayer
				</label>
			</div>
			<div className="form-check">
				<input className="form-check-input" type="checkbox" value="Sci-fi Games"></input>
				<label className="form-check-label" htmlFor="flexCheckChecked">
                        Sci-fi Games
				</label>
			</div>
			<div className="form-check">
				<input className="form-check-input" type="checkbox" value="Virtual reality"></input>
				<label className="form-check-label" htmlFor="flexCheckDefault">
                    Virtual reality
				</label>
			</div>
			<div className="form-check">
				<input className="form-check-input" type="Strategy" value="4"></input>
				<label className="form-check-label" htmlFor="flexCheckChecked">
                    Strategy
				</label>
			</div>
			<button
				type="button"
				className="btn btn-light"
				onClick={
					()=>writeSurveyToFireBase()
				}
			>Submit</button>
		</>
	);
}