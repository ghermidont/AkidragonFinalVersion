/** Search bar used in the blog page. */
import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import {useDataFromFirestore} from "../../../customHooks/useFirestore";
import {useLanguageContext} from "../../../context/LanguageContext";
//Components
import BlogArticleSearchItem from "./BlogArticleSearchItem";

function BlogSearchBar() {
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const {appLanguage} = useLanguageContext();
	//States.
	const [show, setShow] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [serverDataSearchResultArr, setServerDataSearchResultArr] = useState([]);

	//Getting articles from the database
	const {docsFromHook} = useDataFromFirestore("articles");

	useEffect(() => {
		if(docsFromHook)setIsLoading(false);
	}, []);

	// Search and Highlight Function
	const handleInput = event => {
		let searchBarInputText = event.target.value;
		setSearch(searchBarInputText);

		const articlesSearchResultsArr = docsFromHook
			.filter(item =>
				item.content[appLanguage].title.toLowerCase().includes(searchBarInputText.toLowerCase()) ||
				item.content[appLanguage].text.toLowerCase().includes(searchBarInputText.toLowerCase())
			)
			.map(item => {
				let newTitle = item.content[appLanguage].title.replace(
					new RegExp(searchBarInputText, "gi"),
					match =>
						`<mark style="background: #2769AA; color: white;">${match}</mark>`
				);
				let newContent = item.content[appLanguage].text.replace(
					new RegExp(searchBarInputText, "gi"),
					match =>
						`<mark style="background: #2769AA; color: white;">${match}</mark>`
				);
				return {
					...item,
					title: newTitle,
					body: newContent,
				};
			});
		setServerDataSearchResultArr(articlesSearchResultsArr);
	};

	return (
		<>
			<span className="icon-search" onClick={handleShow}> </span>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						<input placeholder="Search input here...." type="text" onInput={(e) => handleInput(e)}/>
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<ul>
						<li><h1>Search results:</h1></li>
						{isLoading ? (<p style={{color: "black"}}>Loading...</p>) :
							(search.length > 0) ? (serverDataSearchResultArr.map(post => (
								(post.approved===true)&&
										<BlogArticleSearchItem
											key = {post.id}
											slug = {post.slug}
											title = {post.content[appLanguage].title}
											text = {post.content[appLanguage].text}
											description = {post.content[appLanguage].description}
											image = {post.content[appLanguage].image}
											handleClose = {handleClose}
										/>
							))
							) : ""
						}
					</ul>
				</Modal.Body>
				<Modal.Footer>
					<button className="form-article__btn" onClick={handleClose}>Close</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default BlogSearchBar;