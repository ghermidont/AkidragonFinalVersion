import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import SearchItem from "./SearchItem";
import {useArticlesContext} from "../../context/ArticlesContext";

function SearchForm(props) {
    console.log("SearchBarDiv worked.");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [dataFromServer, setDataFromServer] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearchBarInput] = useState('');
    const [serverDataSearchResultArr, setServerDataSearchResultArr] = useState([]);

    const {articleContent} = useArticlesContext();

    useEffect(() => {
        setDataFromServer(articleContent);
        if(articleContent)setIsLoading(false);
    }, []);

    // Search And Highlight Function
    const handleInput = event => {
        let searchBarInputText = event.target.value;
        setSearchBarInput(searchBarInputText);
        const newArr = dataFromServer
            .filter(
                item =>
                    item.title.toLowerCase().includes(searchBarInputText.toLowerCase()) ||
                    item.content.toLowerCase().includes(searchBarInputText.toLowerCase())
            )
            .map(item => {
                let newTitle = item.title.replace(
                    new RegExp(searchBarInputText, 'gi'),
                    match =>
                        `<mark style="background: #2769AA; color: white;">${match}</mark>`
                )
                let newContent = item.content.replace(
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
        setServerDataSearchResultArr(newArr);
    }

    return (
        <>
            <span className="icon-search" onClick={handleShow}></span>

            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>
                        <input placeholder="Search input here...." type="text"  onInput={(e) => handleInput(e)}/>
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
                                    title = {post.title}
                                    content = {post.content}
                                    description = {post.description}
                                    image = {post.imageURL}
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

export default SearchForm;