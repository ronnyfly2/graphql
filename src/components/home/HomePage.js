import React from "react";
import Card from "../card/Card";
import { connect } from "react-redux";
import {
	findJobsAction
} from "../../redux/charsDuck";
import styles from "./home.module.css";

function Home({ chars,otherArray, findJobsAction }) {
	let hereDummy = otherArray;
	function renderCharacter() {
		return chars.map((char, idx)=>{
			return <Card {...char} key={idx} />
		});
	}
	function findAJob(e){
		let letter = e.target.value;
		findJobsAction(letter, hereDummy)
	}
	function orderByDate(){
		chars.sort((a, b)=>{
			if (a.postedAt < b.postedAt) {
				return 1;
			}
			if (a.postedAt > b.postedAt) {
				return -1;
			}
			return 0;
		});
	}
	return (
		<div className={styles.container}>
			<h2>Jobs</h2>
			<form onSubmit={(e)=>e.preventDefault()}>
				<input type="search" onChange={findAJob} />
			</form>
			<div>{renderCharacter()}</div>
		</div>
	);
}

function mapState(state) {
	return {
		chars: state.characters.array,
	};
}

export default connect(mapState, { findJobsAction })(
	Home
);
