import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import SearchItem from "./SearchItem";
//import {useArticlesContext} from "../../context/ArticlesContext";
import {useDataFromFirestore} from "../../customHooks/useFirestore";
import {useLanguageContext} from "../../context/LanguageContext";

function SearchBar(props) {
    console.log("SearchBarDiv worked.");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {appLanguage} = useLanguageContext();
   //const [dataFromServer, setDataFromServer] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [serverDataSearchResultArr, setServerDataSearchResultArr] = useState([]);
    const {docsFromHook} = useDataFromFirestore('articles');

    useEffect(() => {
        //setDataFromServer(articleContent);
        if(docsFromHook)setIsLoading(false);
    }, []);

    // Search And Highlight Function
    const handleInput = event => {
        let searchBarInputText = event.target.value;
        setSearch(searchBarInputText);

        const searchResultArr = docsFromHook
            .filter(item =>
                    item.content[appLanguage].title.toLowerCase().includes(searchBarInputText.toLowerCase()) ||
                    item.content[appLanguage].text.toLowerCase().includes(searchBarInputText.toLowerCase())
            )
            .map(item => {
                let newTitle = item.content[appLanguage].title.replace(
                    new RegExp(searchBarInputText, 'gi'),
                    match =>
                        `<mark style="background: #2769AA; color: white;">${match}</mark>`
                )
                let newContent = item.content[appLanguage].text.replace(
                    new RegExp(searchBarInputText, 'gi'),
                    match =>
                        `<mark style="background: #2769AA; color: white;">${match}</mark>`
                )
                return {
                    ...item,
                    title: newTitle,
                    body: newContent,
                }
            });
        setServerDataSearchResultArr(searchResultArr);
    }

    return (
        <>
            <span className="icon-search" onClick={handleShow}></span>
            <Modal className='modal-body' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <input placeholder="Search input here...." type="text" onInput={(e) => handleInput(e)}/>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <ul>
                        <li><h1>Search results:</h1></li>
                        {isLoading ? (
                            <p style={{color: 'black'}}>Loading...</p>
                        ):
                            search.length > 0 ? (
                            serverDataSearchResultArr.map(post => (
                                <SearchItem
                                    key = {post.id}
                                    slug = {post.slug}
                                    title = {post.content[appLanguage].title}
                                    text = {post.content[appLanguage].text}
                                    description = {post.content[appLanguage].description}
                                    image = {post.content[appLanguage].image}
                                    handleClose = {handleClose}
                                />
                            ))
                        ) : ''}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <button className="form-article__btn" onClick={handleClose}>Close</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SearchBar;