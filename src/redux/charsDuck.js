import ApolloClient, { gql } from "apollo-boost";
import { updateDB, getFavorites } from "../firebase";
//Constanst
let initialData = {
	fetching: false,
	array: [],
	currrent: {},
	favorites: [],
	nextPage: 1,
};

let client = new ApolloClient({
	uri: "https://api.graphql.jobs/",
});

let GET_JOB = "GET_JOB";
let GET_JOB_SUCCESS = "GET_JOB_SUCCESS";
let GET_JOB_ERROR = "GET_JOB_ERROR";

let REMOVE_CHARACTER = "REMOVE_CHARACTER";

let ADD_TO_FAVORITE = "ADD_TO_FAVORITE";

let GET_FAVS = "GET_FAVS";
let GET_FAVS_SUCCESS = "GET_FAVS_SUCCESS";
let GET_FAVS_ERROR = "GET_FAVS_ERROR";

let UPDATE_PAGE = "UPDATE_PAGE";

//Reducer
export default function reducer(state = initialData, action) {
	switch (action.type) {
		case GET_JOB:
			return { ...state, fetching: true };
		case GET_JOB_ERROR:
			return { ...state, fetching: false, error: action.payload };
		case GET_JOB_SUCCESS:
			return { ...state, array: action.payload, fetching: false };
		case REMOVE_CHARACTER:
			return { ...state, array: action.payload };
		case ADD_TO_FAVORITE:
			return { ...state, ...action.payload };
		case GET_FAVS:
			return { ...state, fetching: true };
		case GET_FAVS_SUCCESS:
			return { ...state, fetching: false, favorites: action.payload };
		case GET_FAVS_ERROR:
			return { ...state, fetching: false, error: action.payload };
		case UPDATE_PAGE:
			return { ...state, fetching: false, nextPage: action.payload };
		default:
			return state;
	}
}

//Actions (thunks)
export let retreiveFavsAction = () => (dispatch, getState) => {
	dispatch({
		type: GET_FAVS,
	});
	let { uid } = getState().user;
	return getFavorites(uid)
		.then((array) => {
			dispatch({
				type: GET_FAVS_SUCCESS,
				payload: [...array],
			});
		})
		.catch((e) => {
			console.log("error", e);
			dispatch({
				type: GET_FAVS_ERROR,
				payload: e.message,
			});
		});
};
export let addFavoritesAction = () => (dispatch, getState) => {
	let { array, favorites } = getState().characters;
	let { uid } = getState().user;
	let char = array.shift();
	favorites.push(char);
	updateDB(favorites, uid);
	dispatch({
		type: ADD_TO_FAVORITE,
		payload: { array: [...array], favorites: [...favorites] },
	});
};
export let removeCharacterAction = () => (dispatch, getState) => {
	let { array } = getState().characters;
	array.shift();
	if (!array.length) {
		getCharactersAction()(dispatch, getState);
		return;
	}
	dispatch({
		type: REMOVE_CHARACTER,
		payload: [...array],
	});
};
export let getCharactersAction = () => (dispatch, getState) => {
	let query = gql`
		{
			jobs {
				title
				createdAt
				postedAt
				slug
				description
				applyUrl
				isPublished
				company {
					name
					logoUrl
				}
				cities {
					id
					name
					country {
						id
						name
					}
				}
				commitment {
					title
				}
				id
			}
		}
	`;
	dispatch({
		type: GET_JOB,
	});
	//let { nextPage } = getState().characters;
	return client
		.query({
			query,
			//variables:{ page: nextPage }
		})
		.then(({ data, error }) => {
			console.log("res", data);
			if (error) {
				console.log("eeee", error);
				dispatch({
					type: GET_JOB_ERROR,
					payload: error,
				});
				return;
			}
			dispatch({
				type: GET_JOB_SUCCESS,
				payload: data.jobs,
			});

			/*dispatch({
				type: UPDATE_PAGE,
				payload: data.characters.info.next?data.characters.info.next:1
			});*/
		});
};
