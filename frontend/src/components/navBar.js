import React, { useState, useEffect } from "react";
import { Link as LinkRouter } from 'react-router-dom';
import Container from './SignUp/container'
import './styles/navBar.css'


export default function NavBar() {
    const [selected, setSelected] = useState("places")
    var buttonSelected = document.querySelectorAll('button[name="type"]')

    useEffect(() => {

        buttonSelected.forEach(btn => {
            btn.id.toLocaleLowerCase() !== selected ?
                btn.classList.remove("typeSelected") :
                btn.classList.add("typeSelected")
        })
        // eslint-disable-next-line
    }, [selected])

    return (
        <>
            <nav className="nav nav-pills flex-column flex-sm-row">
                
                <button id="places" name="type" className="flex-sm-fill text-sm-center btnNav" onClick={() => setSelected("places")}>
                    <LinkRouter to="/places" className="btnLink" >Places</LinkRouter>
                </button>
                <div className="nav-item ml-auto userContainer">
               
                    <Container />
                  
                </div>

            </nav>

        </>
    )

}
