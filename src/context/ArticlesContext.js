import React, {useState, useContext} from "react";
import {projectFirestore} from "../fireBase";
import {useAuthContext} from "./AuthContext";

const articlesContext = React.createContext({
    articleContent: [],
    setArticleContent: () => {},
});

export function useArticlesContext(){
    return useContext(articlesContext);
}

/*########################## Articles Context Provider ##########################*/
export function ArticlesContextProvider({ children }) {
    console.log("ArticlesContextProvider() worked!");
    const {currentUser, setUserSurveyPassedStatus, createSurveyCheckInUserDoc} = useAuthContext();
    const [generalArticlesExtractArr, setGeneralArticlesExtractArr] = useState(null);
    const [addArticlesFormUserUploadedFile, setAddArticlesFormUserUploadedFile] = useState();
    const [addArticlesFormUserUploadedFileUrl, setAddArticlesFormUserUploadedFileUrl] = useState();
    const [chosenArticleNumber, setChosenArticleNumber] = useState();
    const [articleContent, setArticleContent] = useState();

    const writeSurveyToFirestoreUF = (surveyAnswersObject) =>{

        projectFirestore.collection("filled-surveys").doc(currentUser.uid).set(surveyAnswersObject)
            .then(() => {
                console.log("Survey results successfully written!");
                createSurveyCheckInUserDoc();
                setUserSurveyPassedStatus(true);
            })
            .catch((error) => {
                console.error("Error writing survey results: ", error);
            });
    }

    const value = {
        writeSurveyToFirestoreUF,
        articleContent,
        setArticleContent,
        generalArticlesExtractArr,
        setGeneralArticlesExtractArr,
        addArticlesFormUserUploadedFile,
        setAddArticlesFormUserUploadedFile,
        addArticlesFormUserUploadedFileUrl,
        setAddArticlesFormUserUploadedFileUrl,
        chosenArticleNumber,
        setChosenArticleNumber
    }

    return (
        <articlesContext.Provider value={value}>
            {children}
        </articlesContext.Provider>
    );
}

//Useful syntax
// const addArticle = (article, userId) => {
//   projectFirestore.collection('users').doc(userId).collection('articles').add(article);
//   console.log("addArticle() worked!");
//   //Adds a new document to the articles collection.
// };

// const getAllArticles = () => {
//   //let articlesDB = projectFirestore.collection('articles')//.orderBy('createdAt', 'desc').limit(3);
//   console.log("getAllArticles() worked!");
//   return projectFirestore.collection('articles').get().then((querySnapshot)=>
//   {
//     querySnapshot.forEach((doc)=>{
//       console.log(doc.data().category);
//     });
//   });
//The query will retrieve up to 10 articles from the articles collection. After we declared this query, we pass it
// to the getDocumentsInQuery() method which is responsible for loading and rendering the data.

// };

// const getAnArticle = (id, userId) => {
//   projectFirestore.collection('users').doc(userId).collection('articles').doc(id).get().then(() => console.log('article retrieved'));
//   //After you've implemented this method, you'll be able to view pages for each restaurant. Just click on a restaurant in the list and you should see the restaurant's details page.
//   console.log("getAnArticle() worked!");
// };