import React, {useState} from 'react'
import placesActions from '../../redux/actions/placesActions'
import { connect } from 'react-redux';
import '../styles/upload.css'

 function UploadPlaces(props) {
    const [files, setFiles]=useState()

async function handleSubmit(event){
    event.preventDefault()
  
const file = await files[0]
    console.log(files)
    const name = await event.target[0].value
    const country= await event.target[1].value
    const description =  await event.target[2].value

    const formData =   new FormData()
     formData.append('name', name)
     formData.append('country', country)
     formData.append("description",description)
     formData.append('file', file)
   
     props.uploadPlace(formData)
    
}

    return (

        <div className="uploadContainer">
            <form onSubmit={handleSubmit} className="uploadForm">
                <div className='uploadItems'>
                    <input name="name" className="form-control uploadInputs" placeholder="Place Name" type="text" />
                </div>
                <div className='uploadItems'>
                    <input name="country" className="form-control uploadInputs" placeholder="Country" type="text" />
                </div>
                <div className='uploadItems'>
                    <input name="description" className="form-control uploadInputs " placeholder="Description" type="text" />
                </div>
                <div className='uploadItems'>
                    <input onChange={(event)=>setFiles(event.target.files)} name="image" className="form-control uploadInputs" placeholder="Image" type="file" />
                </div>
                <div className="form-group uploadItems">
                    <button type="submit" className="btn btn-primary btn-block uploadInputs"> Upload  </button>
                </div>
            </form>

        </div>
    )
}

const mapDispatchToProps = {
    uploadPlace: placesActions.uploadPlace,
   
  
  }
  
  const mapStateToProps = (state) => {
    return {
      user: state.userReducer.user
  
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(UploadPlaces);