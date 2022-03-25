
import React, { useEffect } from 'react'
import './App.css';
import Snackbar from './components/Snackbar';
import SignUp from "./components/SignUp/signup";
import SignIn from "./components/SignUp/signin";
import PlaceDetails from "./components/placeDetails"
import NavBar from './components/navBar';
import { connect } from 'react-redux';
import userActions from './redux/actions/userActions';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlacesCards from './components/Cards/placesCards';


function App(props) {
  useEffect(() => {

    if (localStorage.getItem('token') !== null) {
      const token = localStorage.getItem("token")
      props.VerificarToken(token)
    }
  }, [])
  return (

    <div className="App">
      
      <Snackbar />
      
      <BrowserRouter>
      <NavBar/>
        <Routes>
        <Route path="*" element={<PlacesCards />} />
          <Route path="/places" element={<PlacesCards />} />
          <Route path="/place/:id" element={<PlaceDetails />} />
          {!props.user && <Route path="/signin" element={<SignIn />} />}
          {!props.user && <Route path="/signup" element={<SignUp />} />}
        </Routes>
      </BrowserRouter>

    </div>
  );
}

const mapDispatchToProps = {
  VerificarToken: userActions.VerificarToken,

}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
