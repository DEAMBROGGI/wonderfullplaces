
const initialState = {
    places: [],
    filterPlaces: [],
    auxiliar: []
}

const placesReducer = (state = initialState, action) => {
    console.log(action)
    
    switch (action.type) {
        case 'allplaces':
            return {
                ...state,
                places: action.payload,
                filterPlaces: action.payload,
                auxiliar: action.payload,
            }

        case 'filtro':
            const filtrado = action.payload.apiData.filter((data => data.name.toLowerCase().startsWith(action.payload.value.toLowerCase().trim())))

            return {
                ...state,
                filterApiData: filtrado
            }
        default:
            return state
    }
}
export default placesReducer