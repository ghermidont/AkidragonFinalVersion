/* eslint-disable no-undef */

import firebase from "firebase";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

//Firebase configuration
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIRE_BASE_API_KEY,
	authDomain: process.env.REACT_APP_FIRE_BASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIRE_BASE_DB_URL,
	projectId: process.env.REACT_APP_FIRE_BASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIRE_BASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIRE_BASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIRE_BASE_APP_ID,
	measurementId: process.env.REACT_APP_FIRE_BASE_MEASUREMENT_ID,
	region: "europe-west1"
};

// Initialize Firebase
const fireBase = firebase.initializeApp(firebaseConfig);
const functions = firebase.app().functions("europe-west1");
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

export { functions, projectStorage, projectFirestore, fireBase as default};
export const auth = fireBase.auth();