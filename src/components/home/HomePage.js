import React from "react";
import Card from "../card/Card";
import { connect } from "react-redux";
import {
	removeCharacterAction,
	addFavoritesAction,
} from "../../redux/charsDuck";
import styles from "./home.module.css";

function Home({ chars, removeCharacterAction, addFavoritesAction }) {
	function renderCharacter() {
		//console.table('antes', chars)
		chars.sort(function (a, b) {
			if (a.postedAt < b.postedAt) {
				return 1;
			}
			if (a.postedAt > b.postedAt) {
				return -1;
			}
			return 0;
		});
		console.table(chars);
		//let char = chars[0];
		return chars.map((char, idx)=>{
			return <Card {...char} key={idx} />
		});
	}

	/*function nextCharacter() {
		removeCharacterAction();
	}*/
	function addFav() {
		addFavoritesAction();
	}
	return (
		<div className={styles.container}>
			<h2>Jobs</h2>
			<div>{renderCharacter()}</div>
		</div>
	);
}

//function mapStatetoProps(store){};

function mapState(state) {
	return {
		chars: state.characters.array,
	};
}

export default connect(mapState, { removeCharacterAction, addFavoritesAction })(
	Home
);
