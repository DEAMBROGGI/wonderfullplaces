import axios from 'axios';
import { urlBackend } from '../../App';

const userActions = {

    signUpUser: (userData) => {
       
        return async (dispatch, getState) => {

            const res = await axios.post(`${urlBackend}/api/auth/signUp`, { userData })
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            });
            

        }
    },
    signInUser: (logedUser) => {

        return async (dispatch, getState) => {

            const user = await axios.post(`${urlBackend}/api/auth/signIn`, { logedUser })
            if (user.data.success) {
                localStorage.setItem('token', user.data.response.token)
                dispatch({ type: 'user', payload: user.data.response.userData });
                dispatch({type:'userList'})
            }
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: user.data.message,
                    success: user.data.success
                }
            });
        }
    },
    SignOutUser: (closeuser) => {
        return async (dispatch, getState) => {
            const user = await axios.post(`${urlBackend}/api/auth/signOut`, { closeuser })
            localStorage.removeItem('token')
            dispatch({ type: 'user', payload: null });
            dispatch({type:'userList'})
            return user
        }
        
    },
    VerificarToken: (token) => {

        return async (dispatch, getState) => {

            await axios.get(`${urlBackend}/api/auth/signInToken`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(user => {
                    if (user.data.success) {
                        dispatch({ type: 'user', payload: user.data.response });
                        dispatch({type:'userList'})
                        dispatch({
                            type: 'message',
                            payload: {
                                view: true,
                                message: user.data.message,
                                success: user.data.success
                            }
                        });
                    } else {
                        localStorage.removeItem('token')
                    }
                }
                ).catch(error => {
                    if (error.response.status === 401)
                        dispatch({
                            type: 'message',
                            payload: {
                                view: true,
                                message: "Por favor realize nuevamente su signIn",
                                success: false
                            }
                        })
                    localStorage.removeItem('token')
                })
        }
    }
}
export default userActions;