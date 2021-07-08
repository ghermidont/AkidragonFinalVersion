import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import ArticleSearchItem from "./ArticleSearchItem";
import TournamentSearchItem from "./TournamentSearchItem";

import {useDataFromFirestore, useDataFromFirestoreTournaments} from "../../customHooks/useFirestore";
import {useLanguageContext} from "../../context/LanguageContext";

function SearchBar() {
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const {appLanguage} = useLanguageContext();

	const [show, setShow] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [serverDataSearchResultArr, setServerDataSearchResultArr] = useState([]);

	//Getting data from DB
	const {docsFromHook} = useDataFromFirestore("articles");
	const {docsFromHookTournaments} = useDataFromFirestoreTournaments("tournaments");
	console.log(docsFromHook);

	useEffect(() => {
		if(docsFromHook||docsFromHookTournaments)setIsLoading(false);
	}, []);

	// Search And Highlight Function
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

		const tournamentsSearchResultsArr = docsFromHookTournaments
			.filter(item =>
				item.eventTitle!==undefined&&item.eventTitle.toLowerCase().includes(searchBarInputText.toLowerCase())
			)
			.map(item => {
				let newTitle = item.eventTitle.replace(
					new RegExp(searchBarInputText, "gi"),
					match =>
						`<mark style="background: #2769AA; color: blue;">${match}</mark>`
				);
				return {
					...item,
					title: newTitle,
				};
			});

		const searchResultArr = articlesSearchResultsArr.concat(tournamentsSearchResultsArr);

		setServerDataSearchResultArr(searchResultArr);
		console.log(serverDataSearchResultArr);
	};

	return (
		<>
			<span className="icon-search" onClick={handleShow}></span>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						<input placeholder="Search input here...." type="text" onInput={(e) => handleInput(e)}/>
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<ul>
						<li><h1>Search results:</h1></li>
						{isLoading ? (
							<p style={{color: "black"}}>Loading...</p>
						):
							search.length > 0 ? (
								serverDataSearchResultArr.map(post => (
									(post.approved!==undefined)?
										<ArticleSearchItem
											key = {post.id}
											slug = {post.slug}
											title = {post.content[appLanguage].title}
											text = {post.content[appLanguage].text}
											description = {post.content[appLanguage].description}
											image = {post.content[appLanguage].image}
											handleClose = {handleClose}
										/>:
										<TournamentSearchItem
											tournamentKey = {post.id}
											tournamentTitle = {post.eventTitle}
											tournamentBanner = {post.eventBanner}
											handleClose = {handleClose}
										/>
								))
							) : ""}
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