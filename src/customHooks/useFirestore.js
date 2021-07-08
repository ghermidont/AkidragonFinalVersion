import { useState, useEffect } from "react";
import { projectFirestore } from "../fireBase";

const useDataFromFirestore = (collection) => {
	const [docsFromHook, setDocsFromHook] = useState([]);
	//this useEffect interacts with the database every time the db changes (the collection).
	useEffect( () => {
		//this method unsubscribes from the collection every time we unmount an element.
		// Like in case when we are not showing an element anymore, like an images grid.
		const unsubFromCollection = projectFirestore.collection(collection).orderBy("createdAt", "desc")
		//onSnapshot rune every time a change in the db occurs. A real time monitor.
			.onSnapshot(snap => {
				//the array where all the data from the db will be stored.
				let documents = [];
				//let orderNumb = 1;
				//Now we circle through the documents of the database that are there at this specific moment.
				snap.forEach(doc => {
					documents.push({...doc.data(), id: doc.id,  slug: doc.id});
				});
				setDocsFromHook(documents);
			});

		return () => unsubFromCollection();
		// this is a cleanup function that react will run when
		// a component using the hook unmounts
	}, [collection]);
	return { docsFromHook };
};

const useDataFromFirestoreTournaments = (collection) => {
	const [docsFromHookTournaments, setDocsFromHookTournaments] = useState([]);
	useEffect( () => {		
		const unsubFromCollection = projectFirestore.collection(collection).orderBy("createdAt", "desc")			
			.onSnapshot(snap => {				
				let documents = [];				
				snap.forEach(doc => {
					documents.push({...doc.data(), id: doc.id,  slug: doc.id});
				});
				setDocsFromHookTournaments(documents);
			});
		return () => unsubFromCollection();			
	}, [collection]);
	return { docsFromHookTournaments };
};

const useDataFromFirestoreCMS = (collection) => {
	const [docsFromHookCMS, setDocsFromHookCMS] = useState([]);
	useEffect( () => {
		const unsubFromCollection = projectFirestore.collection(collection)
			.onSnapshot(snap => {
				let documents = [];
				snap.forEach(doc => {
					documents.push({...doc.data(), id: doc.id});
				});
				setDocsFromHookCMS(documents);
			});
		return () => unsubFromCollection();
	}, [collection]);
	return { docsFromHookCMS };
};

const useDataFromFirestoreBanners = (collection) => {
	const [docsFromHookBanners, setDocsFromHookBanners] = useState([]);
	useEffect( () => {
		const unsubFromCollection = projectFirestore.collection(collection)
			.onSnapshot(snap => {
				let documents = [];
				snap.forEach(doc => {
					documents.push({...doc.data(), id: doc.id});
				});
				setDocsFromHookBanners(documents);
			});
		return () => unsubFromCollection();
	}, [collection]);
	return {docsFromHookBanners};
};

const useDataFromFirestoreUserInfo = (collection) => {
	const [docsFromHookUserInfo, setDocsFromHookUserInfo] = useState([]);
	useEffect( () => {
		const unsubFromCollection = projectFirestore.collection(collection)
			.onSnapshot(snap => {
				let documents = [];
				snap.forEach(doc => {
					documents.push({...doc.data(), id: doc.id});
				});
				setDocsFromHookUserInfo(documents);
			});
		return () => unsubFromCollection();

	}, [collection]);
	return { docsFromHookUserInfo };
};

export {useDataFromFirestore, useDataFromFirestoreCMS, useDataFromFirestoreUserInfo, useDataFromFirestoreBanners, useDataFromFirestoreTournaments};