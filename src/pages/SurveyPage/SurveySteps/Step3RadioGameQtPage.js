import React from 'react';
import {Link} from "react-router-dom";

export default function Step3RadioGameQtPage({surveyResultObject}) {
    return(
        <div>
            <label>Some question about games</label>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"></input>
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    First category
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked></input>
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Second category
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked></input>
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Third category
                </label>
            </div>

        </div>
    );
}