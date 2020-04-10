import React from 'react'
import Card from '../card/Card'
import { connect } from 'react-redux'
import { removeCharacterAction, addFavoritesAction } from '../../redux/charsDuck'
import styles from './home.module.css'

function Home({ chars, removeCharacterAction, addFavoritesAction }) {

	function renderCharacter() {
		let char = chars[0]
		return (
			<Card leftClick={nextCharacter} { ...char } rightClick={addFav} />
		)
	}

	function nextCharacter(){
		removeCharacterAction()
	}
	function addFav(){
		addFavoritesAction()
	}
	return (
			<div className={styles.container}>
					<h2>Personajes de Rick y Morty</h2>
					<div>
							{renderCharacter()}
					</div>
			</div>
	)
}

//function mapStatetoProps(store){};

function mapState(state){
	return {
		chars:state.characters.array
	}
}

export default connect(mapState, { removeCharacterAction, addFavoritesAction })(Home);
