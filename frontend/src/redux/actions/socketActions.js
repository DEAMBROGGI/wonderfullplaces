
import io from "socket.io-client";
import { urlBackend } from '../../App';

const socketActions = {

    socketConection:()=>{
         const socket = io.connect(urlBackend); 
         
        return async (dispatch, getState)=>{
            dispatch({ type: 'socket', payload:socket})

            socket.on('usersConected', ({ response }) => { //RECIBE EL EMIT Y EL PARAMETRO     
                console.log(response)
                dispatch({
                    type: 'usersConected',
                    payload: response.user
                })
               
              }
              );
            
        }
    }

}
export default socketActions