import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

let firebaseConfig = {
	apiKey: "AIzaSyDTqJg97fDtDWe2RNK8V23sqb5ncUgCk7w",
	authDomain: "tienda-fb8e3.firebaseapp.com",
	databaseURL: "https://tienda-fb8e3.firebaseio.com",
	projectId: "tienda-fb8e3",
	storageBucket: "tienda-fb8e3.appspot.com",
	messagingSenderId: "1060707998782",
	appId: "1:1060707998782:web:858cb61c650e331c2d456f",
	measurementId: "G-4DNPCHDLH8"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore().collection('favs');

export function getFavorites(uid){
	return db.doc(uid).get().then(snap=>{
		return snap.data().array;
	})
}

export function updateDB(array, uid){
	return db.doc(uid).set({array});
}

export function signOutGoogle(){
	firebase.auth().signOut();
}

export function loginWithGoogle(){
	let provider = new firebase.auth.GoogleAuthProvider();
	return firebase.auth().signInWithPopup(provider).then(snap=>snap.user);
}
