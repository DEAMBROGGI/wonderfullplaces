import React from 'react';
import GoogleLogin from 'react-google-login'
import { connect } from 'react-redux';
import userActions from '../../redux/actions/userActions';
import './styleSign.css'

function GoogleSignIn(props) {

  const responseGoogle = async (res) => {
      console.log(res)
     const logedUser = {
      email: res.profileObj.email,
      password: res.profileObj.googleId+"Ab0",
      from: "google"
    }
    await props.signInUser(logedUser)
  }

  return (
    <GoogleLogin
    className="buttonsocial"
      clientId="971845975096-a3gu832l2esbdv2dmp2iktvql4t5imot.apps.googleusercontent.com"
      buttonText=" with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />

  );
}

const mapDispatchToProps = {
    signInUser: userActions.signInUser,

}


export default connect(null, mapDispatchToProps)(GoogleSignIn);