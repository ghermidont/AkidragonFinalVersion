//Multi-step official page
//https://www.npmjs.com/package/react-multistep

import React from 'react';
import MultiStep from 'react-multistep';
import Step3RadioGameQtPage from "./Step3RadioGameQtPage";
import Step4InputGamesQtPage from "./Step4InputGamesQtPage";
import Step5CheckboxGameQtPage from "./Step5CheckboxGameQtPage";

const MainSurveyPage = () =>{
    const prevStyle = {'background': '#33c3f0', 'border-width': '2px'}
    const nextStyle = {'background': '#33c3f0',  'border-width': '2px'}
    let surveyResultObject = [
        {
            ans:[],
            question: "Quale genere preferisci?",
            type: ["Simulazione", "Strategia", "Picchiaduro"]
        },
        {
            ans: "",
            question: "Qud e il tuo videogame referito?"
        },
        {
            ans:[],
            question: "Quali siti segui di più?",
            type: ["multiplayer", "spaziogames", "everyeye", "gamestart"]
        }
    ]

    const steps = [
        {name: 'Step3', component: <Step3RadioGameQtPage surveyResultObject={surveyResultObject} /> },
        {name: 'Step4', component: <Step4InputGamesQtPage surveyResultObject={surveyResultObject} /> },
        {name: 'Step5', component: <Step5CheckboxGameQtPage surveyResultObject={surveyResultObject} /> }
    ];

    return (
        <div style={{paddingTop: "10em"}} className='container'>
            <MultiStep surveyResultObject={surveyResultObject} showNavigation={true} steps={steps} prevStyle={prevStyle} nextStyle={nextStyle}/>

        </div>
    );
}

export default MainSurveyPage;