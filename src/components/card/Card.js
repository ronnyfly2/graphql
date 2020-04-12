import React from "react";
import styles from "./card.module.css";
import FontAwesome from "react-fontawesome";
import PropTypes from "prop-types";

let rick = "https://rickandmortyapi.com/api/character/avatar/1.jpeg";

function onClick(side) {
	return () => console.log(side);
}
function addDefaultSrc(ev){
  ev.target.src = './logo192.png'
}
export default function Card({
		title,
		company,
		slug,
		description,
		commitment,
		cities,
		rightClick,
		leftClick,
	}) {
	let showAll = false;
	function show(){
		console.log('divine')
		showAll = true;
	}
	console.log('des', description.substring(0,320))
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.left_card}>
					<img
						alt="job"
						src={company && company.logoUrl ? company.logoUrl : "./logo192.png"}
						onError={addDefaultSrc}
					/>
					<FontAwesome name="building"></FontAwesome>
					<span>{company && company.name ? company.name : "Oculto"}</span>
				</div>
				<div className={styles.right_card}>
					<h2 className={styles.name}>{title}</h2>
					<span>{showAll? description:description.substring(0,320)}</span>
					<b>{commitment.title}</b>
					<button onClick={()=>show()}>click</button>
					<FontAwesome name="map-marker"></FontAwesome>
					<span>{cities.length>0?cities[0].name:'Oculto'}</span>
					{cities.length>0 && cities[0].country && <span>{cities[0].country.name}</span>}
				</div>
			</div>
		</div>
	);
}

Card.propTypes = {
	name: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	leftClick: PropTypes.func,
	rightClick: PropTypes.func,
};

Card.defaultProps = {
	name: "Rick Sanches",
	image: rick,
};
