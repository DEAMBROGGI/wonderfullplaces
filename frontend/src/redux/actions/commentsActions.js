import axios from 'axios';

const commentsActions = {
   
    addComment: (comment) => {

        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {

            if (comment.comment !== "") {
                const res = await axios.post('https://wonderfullplaces.herokuapp.com/api/places/comment', { comment }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                dispatch({
                    type: 'message',
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    }
                })
                return res
            }
            else {
                dispatch({
                    type: 'message',
                    payload: {
                        view: true,
                        message: "ingresa un comentario para guardarlo",
                        success: false
                    }
                })
            }
        }

    },
    modifiComment: (comment) => {

        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const res = await axios.put('https://wonderfullplaces.herokuapp.com/api/places/comment', { comment }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })

            return res
        }
    },
    deleteComment: (id) => {

        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const res = await axios.post(`https://wonderfullplaces.herokuapp.com/api/places/comment/${id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }

            })
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })
            return res
        }
    },

}

export default commentsActions;