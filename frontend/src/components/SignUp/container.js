import React from "react";
import { connect } from 'react-redux';
import userActions from '../../redux/actions/userActions';
import { Link as LinkRouter } from 'react-router-dom';
import './styleSign.css'
import '../styles/navBar.css'


function Container(props) {

	function SignOut() {
		props.SignOutUser(props.user.email)
	}

	return (
		<>
			{props.user ?
				<>
					<div style={{ display: "flex",flexBasis:"row", justifyContent: "center", width: "100%" }}>
						<h5 className="navBar-text"style={{ display: "flex",flexBasis:"row", justifyContent: "center", alignItems:"center", width: "100%" }}>{props.user.fullName}</h5>
						<button onClick={SignOut} className="btnSignOut"><span style={{fontSize:30}}class="material-icons">
power_off
</span></button>
					</div>
				</>
				: <LinkRouter to="/signin" className="btnLink first">No hay usuario conectado</LinkRouter>}

		</>
	)

}
const mapStateToProps = (state) => {
	return {
		user: state.userReducer.user,
	}
}
const mapDispatchToProps = {
	SignOutUser: userActions.SignOutUser,

}



export default connect(mapStateToProps, mapDispatchToProps)(Container)