import React, { useState } from 'react'
import { connect } from 'react-redux';
import userActions from '../../redux/actions/userActions';
import { Link as LinkRouter } from 'react-router-dom';
import GoogleSignUp from './GoogleSignUp'
//import FacebookSignUp from './FacebookSignUp';


function SignUp(props) {
    const paises = ["unselected", "Argentina", "Brazil", "Colombia", "Chile", "Uruguay"]

    const [selectPaises, setSelectPaises] = useState("unselected")

    function selected(event) {
        console.log(event.target.value)
        setSelectPaises(event.target.value)
    }

    console.log(props)
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(event.target[3].value)
        const userData = {
            fullName: event.target[0].value,
            email: event.target[1].value,
            password: event.target[2].value,
            from: "form-Signup",
            pais: selectPaises
        }
        props.signUpUser(userData)
    }

    return (
        <>

            <article className="card-body mx-auto" style={{ maxWidth: 400, marginTop: 60 }}>

                <div class="styled-select">
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" onChange={selected}>

                        {paises.map(pais =>

                            <option >{pais}</option>

                        )}

                    </select>

                </div>
                {selectPaises !== "unselected" ?
                    <>
                        <h4 className="card-title mt-3 text-center">User Account</h4>
                        <p className="text-center">Get started with your free account</p>

                        <p className="divider-text">
                            <span className="bg-light">OR</span>
                        </p>
                        <GoogleSignUp pais={selectPaises} />
                        //<FacebookSignUp pais={selectPaises} />
                        <form onSubmit={handleSubmit}>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                                </div>
                                <input name="fullName" className="form-control" placeholder="Full name" type="text" />
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                                </div>
                                <input name="email" className="form-control" placeholder="Email address" type="email" />
                            </div>

                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                                </div>
                                <input name='password' className="form-control" placeholder="Create password" type="password" />
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                                </div>

                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block"> Create Account  </button>
                            </div>
                            <div className="text-center">Have an account? <LinkRouter to="/signin">SignIn</LinkRouter> </div>
                        </form>
                    </> : <h1>Selecciona tu pais para continuar signUp</h1>}
            </article>
        </>
    )

}

const mapDispatchToProps = {
    signUpUser: userActions.signUpUser,

}
const mapStateToProps = (state) => {
    return {
        message: state.userReducer.message,
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
