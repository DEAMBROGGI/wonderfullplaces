import axios from 'axios';
import { urlBackend } from '../../App';

const placesActions = {

    getAllPlaces: () => {
        return async (dispatch, getState) => {
            const res = await axios.get(`${urlBackend}/api/places/getallplaces`)
            dispatch({ type: 'allplaces', payload: res.data.response.places })
        }
    },
    getOnePlace: (id) => {
        return async (dispatch, getState) => {
            const res = await axios.get(`${urlBackend}/api/places/getoneplace/${id}`)
           return res
        }
    },

    filtrar: (apiData, value) => {
        return (dispatch, getState) => {
            dispatch({ type: 'filtro', payload: { apiData, value } })
        }
    },
    likeDislike: (placeId) => {
        const token = localStorage.getItem('token')
        return async () => {
            try {
                let response = await axios.put(`${urlBackend}/api/places/like/${placeId}`, {},
                {headers: {
                    Authorization: "Bearer "+token
                    }
                })
                console.log(response)
                return response
                
            }catch (error) {
                console.log(error)
            }
        }
    },

    uploadPlace: (newPlace) => {
        const token = localStorage.getItem('token')
        
        return async (dispatch, getState) => {
            const res = await axios.post(`${urlBackend}/api/places/upload`, newPlace,
            {headers: {
                Authorization: "Bearer "+token
                }
            })
            console.log(res)
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

export default placesActions;