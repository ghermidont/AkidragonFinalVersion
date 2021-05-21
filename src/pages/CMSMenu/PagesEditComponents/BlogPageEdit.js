import React, {useRef, useState} from 'react';
import {useHistory} from "react-router-dom";
import {projectFirestore} from "../../../fireBase";

function TournamentsPageEdit() {
    let publishBtnRef = useRef();
    let cancelBtnRef = useRef();
    // const {currentUser} = useAuthContext();
    // const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
    const history = useHistory();
    const [ITMainText, setITMainText] = useState('');
    const [ENMainText, setENMainText] = useState('');

    const writeToFBCallback = () => {
        const collectionRef = projectFirestore.collection('web-app-cms').doc("blogPage");
            collectionRef.set(
                {
                    "mainText": {
                        "en": ENMainText,
                        "it": ITMainText
                    }
                })
                .then(() => {
                    window.alert("Doc edited successfully!");
                    return console.log("Doc edited successfully!");
                })
                .catch((error) => {
                    console.error(error.code + " " + error.message + "" + error.details);
                });

    }

    const clearInput = () => {
        setENMainText("");
        setITMainText("");
        history.push("/UserProfilePage");
    }

    return (
        <>
            <div style={{paddingTop: "5em important"}}>
                <center><h1>Edit <strong>Home</strong> Page static content:</h1></center>
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
                                        Footer message:
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ITMainText}
                                            required
                                            onChange={
                                                (e)=>setITMainText(e.target.value)
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
                                        Content
                                        <textarea
                                            className='form-article__input'
                                            rows='2'
                                            name="countent"
                                            value={ENMainText}
                                            required
                                            onChange={
                                                (e)=>setENMainText(e.target.value)
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
                                onClick={writeToFBCallback}
                            >
                                Publish
                            </button>

                            <button
                                ref={cancelBtnRef}
                                className="form-article__btn"
                                onClick={clearInput}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default TournamentsPageEdit;