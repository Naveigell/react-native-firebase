import firebase from "firebase";

function Firebase() {

	if (!firebase.apps.length) {
		return firebase.initializeApp({
			apiKey: "",
			authDomain: "",
			projectId: "",
			storageBucket: "",
			messagingSenderId: "",
			appId: "",
			measurementId: ""
		});	
	}

	return firebase.app();
}

export default Firebase;