import React, {useState, useContext} from "react";
// import {projectFirestore} from "../fireBase";
// import {useAuthContext} from "./AuthContext";

const articlesContext = React.createContext({
	articleContent: [],
	setArticleContent: () => {},
});

export function useArticlesContext(){
	return useContext(articlesContext);
}

// eslint-disable-next-line react/prop-types
export function ArticlesContextProvider({ children }) {
	//const {currentUser, setUserSurveyPassedStatus, createSurveyCheckInUserDoc} = useAuthContext();
	const [generalArticlesExtractArr, setGeneralArticlesExtractArr] = useState(null);
	const [addArticlesFormUserUploadedFile, setAddArticlesFormUserUploadedFile] = useState();
	const [addArticlesFormUserUploadedFileUrl, setAddArticlesFormUserUploadedFileUrl] = useState();
	const [chosenArticleNumber, setChosenArticleNumber] = useState();
	const [articleContent, setArticleContent] = useState();
	const [chosenModifyArticleNumber, setChosenModifyArticleNumber] = useState("");

	// const writeSurveyToFirestoreUF = (surveyAnswersObject) =>{
	//
	// 	projectFirestore.collection("filled-surveys").doc(currentUser.uid).set(surveyAnswersObject)
	// 		.then(() => {
	// 			window.alert("Survey results successfully written!");
	// 			createSurveyCheckInUserDoc();
	// 			setUserSurveyPassedStatus(true);
	// 		})
	// 		.catch((error) => {
	// 			window.alert("Error writing survey results: " + error);
	// 		});
	// };

	const value = {
		// writeSurveyToFirestoreUF,
		articleContent,
		setArticleContent,
		generalArticlesExtractArr,
		setGeneralArticlesExtractArr,
		addArticlesFormUserUploadedFile,
		setAddArticlesFormUserUploadedFile,
		addArticlesFormUserUploadedFileUrl,
		setAddArticlesFormUserUploadedFileUrl,
		chosenArticleNumber,
		setChosenArticleNumber,
		chosenModifyArticleNumber,
		setChosenModifyArticleNumber
	};

	return (
		<articlesContext.Provider value={value}>
			{children}
		</articlesContext.Provider>
	);
}