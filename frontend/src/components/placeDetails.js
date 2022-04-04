import { useEffect, useState } from 'react';
import './styles/placeDetails.css'
import { connect } from 'react-redux';
import placesActions from '../redux/actions/placesActions'
import commentsActions from '../redux/actions/commentsActions';
import { useParams } from 'react-router-dom';

const PlaceDetails = (props) => {
  const { id } = useParams()
  const [place, setPlace] = useState()
  const [inputText, setInputText] = useState("")
  const [modifi, setModifi] = useState()
  const [reload, setReload] = useState(false)

  useEffect(() => {
    props.getOnePlace(id)
      .then(response => setPlace(response.data.response.place))
  }, [reload])

  async function cargarComentario(event) {

    const commentData = {
      place: place._id,
      comment: inputText,
    }

    await props.addComment(commentData)
      .then(response => setPlace(response.data.response.nuevoComment), setInputText(""))
    document.querySelector("#nuevoComentario").textContent = ""


  }

  async function modificarComentario(event) {
    const commentData = {
      commentID: event.target.id,
      comment: modifi,
    }
    console.log(modifi)
    await props.modifiComment(commentData)
    setReload(!reload)

  }
  async function eliminarComentario(event) {
    await props.deleteComment(event.target.id)
    setReload(!reload)
  }

  async function likesOrDislikes() {
    await props.likeDislike(place._id)

    setReload(!reload)
  }
  console.log(place)



  return (
    <>

      <div className="card mb-3 cardDetail"  >
        <p className="card-text textDetail">Creador {place?.autor.fullName}</p>
        <div className='detailImg' style={{ backgroundImage: "url(" + place?.image + ")" }}></div>
        <div className="card-body">
          <h5 className="card-title">{place?.name}</h5>
          <h2>{place?.country}</h2>
          <p className="card-text">{place?.description}</p>

          <div className="likeDislike">
            {props.user ?
              (<div onClick={likesOrDislikes}>{place?.likes.includes(props.user.id) ?
                <span style={{ color: "red", fontSize: 30 }} className="material-icons likeDislike corazon">favorite</span> :
                <span style={{ color: "red", fontSize: 30 }} className="material-icons likeDislike corazon">favorite_border</span>}</div>)

              : (<span style={{ fontSize: 30 }} className="material-icons">favorite_border</span>)}

            <h3 style={{ color: "black ", fontSize: 30, margin: 0 }}>{place?.likes.length}</h3>
          </div>
        </div>




        <div className="accordion" id={place?.name}>
          <div className="accordion-item">
            <h2 className="accordion-header " id={"heading" + place?.name}>
              <button className="accordion-button collapsed acordion " type="button" data-bs-toggle="collapse" data-bs-target={"#" + place?.name.replace(/ /g, "").slice(0, 5)} aria-expanded="false" aria-controls={place?.name.replace(/ /g, "").slice(0, 5)}>
                COMENTARIOS ({place?.comments.length})
                <span className="material-icons ml-auto arrow collapsed " data-bs-toggle="collapse" aria-controls={place?.name.replace(/ /g, "").slice(0, 5)} data-bs-target={"#" + place?.name.replace(/ /g, "").slice(0, 5)}>
                  keyboard_arrow_down
                </span>
              </button>
            </h2>
            <div id={place?.name.replace(/ /g, "").slice(0, 5)} className="accordion-collapse collapse " aria-labelledby={"heading" + place?.name} data-bs-parent={"#" + place?.name}>
              <div className="accordion-body  ">


                {place?.comments.map(comment =>
                  <>
                    {comment.userID?._id !== props.user?.id ?
                      <div className="card cardComments " key={comment._id}>
                        <div className="card-header cardHeader">
                          <p>{comment.userID.fullName}</p> <p>{new Date(comment.date).toUTCString()}</p>
                        </div>
                        <div className="card-body">
                          <p className="card-text cardText">{comment.comment}</p>
                        </div>
                      </div> :

                      <div className="card cardComments">
                        <div className="card-header cardHeader">
                          <p>{comment.userID.fullName}</p> <p>{new Date(comment.date).toUTCString()}</p>
                        </div>
                        <div className="card-body ">

                          <div type="text" className="card-text textComments" onInput={(event) => setModifi(event.currentTarget.textContent)} contentEditable >{comment.comment}</div>
                          <button id={comment._id} onClick={modificarComentario} className="btn btn-primary btnComments">Modificar</button>
                          <button id={comment._id} onClick={eliminarComentario} className="btn btn-primary btnComments">Eliminar</button>
                        </div>
                      </div>
                    }
                  </>
                )}

                {props.user ?
                  <div className="card cardComments">
                    <div className="card-header cardHeaderNew">
                      DEJANOS TU COMENTARIO
                    </div>
                    <div className="card-body ">
                      <div id="nuevoComentario" placeholder='Ingresa aqui tu comentario...' onInput={(event) => setInputText(event.currentTarget.textContent)} contentEditable className="card-text textComments" ></div>
                      <button onClick={cargarComentario} className="btn btn-primary btnComments">Cargar</button>
                    </div>
                  </div> :
                  <h1>Realiza singIn y dejanos tu comentario</h1>
                }
              </div>
            </div>
          </div>
        </div>
      </div>



    </>
  )
}
const mapDispatchToProps = {
  getOnePlace: placesActions.getOnePlace,
  addComment: commentsActions.addComment,
  modifiComment: commentsActions.modifiComment,
  deleteComment: commentsActions.deleteComment,
  likeDislike: placesActions.likeDislike

}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetails);
