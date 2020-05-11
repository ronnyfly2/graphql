import React from "react";
import styles from "./card.module.css";
import FontAwesome from "react-fontawesome";
import PropTypes from "prop-types";

let rick = "https://rickandmortyapi.com/api/character/avatar/1.jpeg";
let descriptionFine = null;
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
		postedAt,
		applyUrl,
		rightClick,
		leftClick,
	}) {
	descriptionFine = description.substring(0,320);
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
					<span>{descriptionFine}</span>
					<b>{postedAt}</b>
					<i>{commitment.title}</i>
					<FontAwesome name="map-marker"></FontAwesome>
					<span>{cities.length>0?cities[0].name:'Oculto'}</span>
					{cities.length>0 && cities[0].country && <span>{cities[0].country.name}</span>}
					<a href={applyUrl} target="_blank">
						<span>Aplicar</span>
						<FontAwesome name="angle-right"></FontAwesome>
					</a>
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
