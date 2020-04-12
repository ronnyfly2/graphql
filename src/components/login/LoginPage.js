import React from "react";
import styles from "./login.module.css";
import { connect } from "react-redux";
import { doGoogleLoginAction, logOutAction } from "../../redux/userDuck";

function LoginPage({ loggedIn, fetching, doGoogleLoginAction, logOutAction }) {
	function doLogin() {
		doGoogleLoginAction();
	}
	function closeSession() {
		logOutAction();
	}
	if (fetching) return <p>Cargando...</p>;
	return (
		<div className={styles.container}>
			{loggedIn ? (
				<div>
					<h1>Cierra tu sesión</h1>
					<button onClick={closeSession}>Cerrar Sesión</button>
				</div>
			) : (
				<div>
					<h1>Inicia Sesión con Google</h1>
					<button onClick={doLogin}>Iniciar</button>
				</div>
			)}
		</div>
	);
}

function mapState({ user: { fetching, loggedIn } }) {
	return {
		fetching,
		loggedIn,
	};
}

export default connect(mapState, { doGoogleLoginAction, logOutAction })(
	LoginPage
);
