
import React, { useEffect } from 'react'
import './App.css';
import Snackbar from './components/Snackbar';
import SignUp from "./components/SignUp/signup";
import SignIn from "./components/SignUp/signin";
import PlaceDetails from "./components/Places/placeDetails"
import NavBar from './components/navBar';
import { connect } from 'react-redux';
import userActions from './redux/actions/userActions';
import socketActions from './redux/actions/socketActions';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlacesCards from './components/Cards/placesCards';
import io from "socket.io-client";
import UserList from './components/User/userList';
import UserAccount from './components/User/userAccount';

//export const urlBackend = 'http://localhost:4000'
export const urlBackend = "https://wonderfullplaces-dev.fl0.io"

function App(props) {
  useEffect(()=>{
    props.socketConection()
    
  },[])
  
  
  useEffect(() => {

    if (localStorage.getItem('token') !== null) {
      const token = localStorage.getItem("token")
      props.VerificarToken(token)
      
    }
    
    
  }, [])

console.log(props.socket)
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
          {props.user && <Route path="/userAccount" element={<UserAccount />} />}
          {!props.user && <Route path="/signup" element={<SignUp />} />}
          
        </Routes>
      </BrowserRouter>

    </div>
  );
}

const mapDispatchToProps = {
  VerificarToken: userActions.VerificarToken,
  socketConection : socketActions.socketConection

}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    socket:state.socketReducer.socket
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
