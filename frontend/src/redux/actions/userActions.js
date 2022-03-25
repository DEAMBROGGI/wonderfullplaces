import axios from 'axios';

const userActions = {

    signUpUser: (userData) => {
        console.log(userData)
        return async (dispatch, getState) => {

            const res = await axios.post('https://wonderfullplaces.herokuapp.com/api/auth/signUp', { userData })
            console.log(res)
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

            const user = await axios.post('https://wonderfullplaces.herokuapp.com/api/auth/signIn', { logedUser })
            if (user.data.success) {
                localStorage.setItem('token', user.data.response.token)
                dispatch({ type: 'user', payload: user.data.response.userData });

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
            const user = axios.post('https://wonderfullplaces.herokuapp.com/api/auth/signOut', { closeuser })
            localStorage.removeItem('token')
            dispatch({ type: 'user', payload: null });
        }
    },
    VerificarToken: (token) => {

        return async (dispatch, getState) => {

            await axios.get('https://wonderfullplaces.herokuapp.com/api/auth/signInToken', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(user => {
                    console.log(user)
                    if (user.data.success) {
                        dispatch({ type: 'user', payload: user.data.response });
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
                    console.log(error.response.status)
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