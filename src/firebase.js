import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
	apiKey: "AIzaSyBAAaMUxMTnLXpsBg6NL5bYY66okaDvkHk",
	authDomain: "react-slack-clone-c05ed.firebaseapp.com",
	databaseURL: "https://react-slack-clone-c05ed.firebaseio.com",
	projectId: "react-slack-clone-c05ed",
	storageBucket: "react-slack-clone-c05ed.appspot.com",
	messagingSenderId: "155819280769",
	appId: "1:155819280769:web:79097c612925ca96"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
