import React from 'react';
import {useDataFromFirestore} from "../customHooks/useFirestore";

//NEWS PAGE bottom grid

function OtherNewsGrid() {
    const {docsFromHook} = useDataFromFirestore('articles');

    return (
        <ul className="tab__list" id="tab_2">
            <div className="news__inner">
                {docsFromHook && docsFromHook.slice(0, 4).map(doc=>
                    <article className="article">
                        <a className="article__link">
                            <img src="" alt="" className="article__image"/>
                            <div className="article__content">
                                <img className="article__logo" src="" alt=""/>
                                <div className="article__box-text">
                                    <p className="article__text">
                                        {doc.titile}
                                    </p>
                                </div>
                            </div>
                            <div className="article__footer">
                                <img src="" alt=""/>
                            </div>
                        </a>
                    </article>
                )};
            </div>
        </ul>
    );
}

export default OtherNewsGrid;