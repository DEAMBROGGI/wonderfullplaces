import React, {useState } from 'react';
import { connect } from 'react-redux';
import Avatar from 'react-avatar';
import '../styles/userList.css'

const UserList = (props) => {
  const [reload, setReload] = useState(false)

  function timeConected(data) {
    let lastConect = new Date(data)
    let now = new Date()
    let dif = now - lastConect
    const userTime = Math.round((dif / 1000) / 60)
    let horas = Math.floor(userTime/60)
    let minutos =    userTime-horas*60 
    let textHora = horas>1?"horas":"hora"
    let textMinuto = minutos>1?"minutos":"minuto"

    if(userTime > 60){
      let response = <div> Tiempo {horas} {textHora}, {minutos} {textMinuto}</div>
      return response
    }else{
      let response =<div> Tiempo {userTime} {textMinuto}</div>
    return response
    }
  }

  setInterval(() => {
    setReload(!reload)
  }, 1000 * 60)

  console.log(props)
  return (
    <div>
      {props.userList.map(user =>
        <div key={user._id} className="userRow">
          <div><Avatar size="70" round={true} name={user.fullName} /></div>
          <div className='userData'>
            <div className='userName'>{user.fullName}</div>
            <div> Contectado desde {new Date(user.lastConection).toLocaleTimeString()}</div>
            <div className='userTime'>{timeConected(user.lastConection)}</div>
          </div>
        </div>
      )}
    </div>

  )
}


const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    socket: state.socketReducer.socket,
    userList: state.socketReducer.userList
  }
}

export default connect(mapStateToProps, null)(UserList);
