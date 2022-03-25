import axios from 'axios';

const placesActions = {

    getAllPlaces: () => {
        return async (dispatch, getState) => {
            const res = await axios.get('http://localhost:4000/api/places/getallplaces')
            dispatch({ type: 'allplaces', payload: res.data.response.places })
        }
    },
    getOnePlace: (id) => {
        return async (dispatch, getState) => {
            const res = await axios.get('http://localhost:4000/api/places/getoneplace/'+id)
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
                let response = await axios.put(`http://localhost:4000/api/places/like/${placeId}`, {},
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
    }
}

export default placesActions;