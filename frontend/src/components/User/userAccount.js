import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link as LinkRouter } from 'react-router-dom';
import '../styles/navBar.css'
import '../styles/userAccount.css'
import UserList from './userList';

const UserAccount = (props) => {
    const [selected, setSelected] = useState("userlist")
    var buttonSelected = document.querySelectorAll('button[name="typeUser"]')

    useEffect(() => {

        buttonSelected.forEach(btn => {
            btn.id.toLocaleLowerCase() !== selected ?
                btn.classList.remove("typeSelected") :
                btn.classList.add("typeSelected")
        })
        // eslint-disable-next-line
        console.log(selected)
    }, [selected])

    return (
        <>
            <nav className="nav nav-pills flex-column flex-sm-row userAccount">
                <button id="userlist"
                    name="typeUser"
                    className="flex-sm-fill text-sm-center btnNav btnLink"
                    onClick={() => setSelected("userlist")}>
                    Users List
                </button>
                <button id="profile"
                    name="typeUser"
                    className="flex-sm-fill text-sm-center btnNav btnLink"
                    onClick={() => setSelected("profile")}>
                    Profile
                </button>

            </nav>
            <div className='containerUserAccount'>
                {selected === "userlist" && <UserList />}
            </div>
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        socket: state.socketReducer.socket

    }
}

export default connect(mapStateToProps, null)(UserAccount);