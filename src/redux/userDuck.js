import { loginWithGoogle, signOutGoogle } from '../firebase'
// Constanst
let initialData = {
	loggedIn: false,
	fetching: false,
};
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";

const LOG_OUT = "LOG_OUT";

// Reducer
export default function reducer(state = initialData, action) {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return { ...state, fetching: false, ...action.payload, loggedIn: true }
		case LOGIN_ERROR:
			return { ...state, fetching: false, error: action.payload }
		case LOGIN:
			return { ...state, fetching: true }
		case LOG_OUT:
			return { ...initialData }
		default:
			return state;
	}
}

//AUX
function saveStorage(storage){
	localStorage.storage = JSON.stringify(storage);
}

// Actions (action creator)
export let logOutAction=()=>(dispatch, getState)=>{
	signOutGoogle();
	dispatch({
		type: LOG_OUT
	});
	localStorage.removeItem('storage');
}

export let restoreSessionAction=()=>(dispatch, getState)=>{
	let storage = localStorage.storage;
	storage = storage?JSON.parse(storage):null;
	if(storage && storage.user){
		dispatch({
			type: LOGIN_SUCCESS,
			payload: storage.user
		});
	}
}
export let doGoogleLoginAction=()=>(dispatch, getState)=>{
	dispatch({
		type: LOGIN
	});
	return loginWithGoogle()
		.then(user=>{
			dispatch({
				type: LOGIN_SUCCESS,
				payload: {
					uid: user.uid,
					displayName: user.displayName,
					email: user.email,
					photoURL: user.photoURL
				}
			});
			saveStorage(getState());
		}).catch(e=>{
			console.log(e);
			dispatch({
				type: LOGIN_ERROR,
				payload: e.message
			})
	})
}
