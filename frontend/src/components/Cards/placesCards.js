import React,{useEffect} from "react";
import { connect } from 'react-redux';
import './cards.css'
import placesActions from '../../redux/actions/placesActions'
import { Link as LinkRouter } from 'react-router-dom';

function PlacesCard(props) {

    useEffect(() => {
        props.getAllPlaces()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="cardContainer" >
            {props.places?.map(place =>
            <LinkRouter to={`/place/${place._id}`} className="card" key={place._id} >
                <div  >
                    <div className="front" style={{ backgroundImage: "url(" + place.image + ")" }} >

                    </div>
                    <div className="back">
                        <div>
                            <p>{place.name}</p>
                        </div>
                    </div>
                </div>
                </LinkRouter>
            )}
        </div>

    )
}
const mapDispatchToProps = {
    getAllPlaces: placesActions.getAllPlaces,

}

const mapStateToProps = (state) => {
    return {
        places: state.placesReducer.places

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacesCard);