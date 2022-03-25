const Places = require('../models/placesModel')

const placesControllers = {

    getAllPlaces: async (req, res) => {

        try {
            const places = await Places.find()
            res.json({ success: false, response:{places} })

        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "Algo a salido mal intentalo en unos minutos" })
        }

    },
    getOnePlace: async (req, res) => {
        const id=req.params.id
        
        try {
            const place = await Places.findOne({_id:id}).populate("autor", {fullName:1}).populate("comments.userID",{fullName:1})
            res.json({ success: false, response:{place} })

        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "Algo a salido mal intentalo en unos minutos" })
        }

    },
    likeDislike:async (req,res) =>{
        const id=req.params.id //LLEGA POR PARAMETRO DESDE AXIOS
        const user = req.user.id //LLEGA POR RESPUESTA DE PASSPORT

       await  Places.findOne({_id: id})

        .then((place) =>{
            console.log(place)
            if(place.likes.includes(user)){
               Places.findOneAndUpdate({_id:id}, {$pull:{likes:user}},{new:true})//PULL QUITA, SACA
               .then((response)=> res.json({success:true, response:response.likes}))
               .catch((error) => console.log(error))
            }else{
                Places.findOneAndUpdate({_id: id}, {$push:{likes:user}},{new:true})//PUSH AGREGA
                .then((response) => res.json({success:true, response:response.likes}))
                .catch((error) => console.log(error))
            }
        })
        .catch((error) => res.json({success:false, response:error}))
    },

}
module.exports = placesControllers