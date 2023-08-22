const Places = require('../models/placesModel')
const fs = require('fs')
const crypto = require('crypto') 
const placesControllers = {

    getAllPlaces: async (req, res) => {

        try {
            const places = await Places.find()
            console.log(places)
            res.json({ success: true, response: { places } })

        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "Algo a salido mal intentalo en unos minutos" })
        }

    },
    getOnePlace: async (req, res) => {
        const id = req.params.id

        try {
            const place = await Places.findOne({ _id: id }).populate("autor", { fullName: 1 }).populate("comments.userID", { fullName: 1 })
            res.json({ success: false, response: { place } })

        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "Algo a salido mal intentalo en unos minutos" })
        }

    },
    likeDislike: async (req, res) => {
        const id = req.params.id //LLEGA POR PARAMETRO DESDE AXIOS
        const user = req.user.id //LLEGA POR RESPUESTA DE PASSPORT

        await Places.findOne({ _id: id })

            .then((place) => {
             
                if (place.likes.includes(user)) {
                    Places.findOneAndUpdate({ _id: id }, { $pull: { likes: user } }, { new: true })//PULL QUITA, SACA
                        .then((response) => res.json({ success: true, response: response.likes }))
                        .catch((error) => console.log(error))
                } else {
                    Places.findOneAndUpdate({ _id: id }, { $push: { likes: user } }, { new: true })//PUSH AGREGA
                        .then((response) => res.json({ success: true, response: response.likes }))
                        .catch((error) => console.log(error))
                }
            })
            .catch((error) => res.json({ success: false, response: error }))
    },
    uploadPlace: async (req, res) => {

        const { file } = req.files
        const name = req.body.name
        const country = req.body.country
        const description = req.body.description
        const autor = req.user._id

        try {
            const placeExiste = await Places.findOne({ name })

            if (placeExiste) {
                res.json({
                    success: false,
                    message: "El lugar que intentas cargar ya ha sido cargado anteriormente"
                })

            } else {
                const filename = crypto.randomBytes(10).toString('hex') + "." + file.name.split(".")[file.name.split(".").length - 1];
                const ruta = `${__dirname}../../frontend/public/image/places/${filename}`
                file.mv(ruta, err => {

                    if (err) {
                        console.log(err)
                    } else {
                        console.log("archivo cargado")
                    }
                })
                const nuevoLugar = await new Places({
                    name: name,
                    image: filename,
                    country: country,
                    description: description,
                    autor: autor
                })
                await nuevoLugar.save()
                res.json({
                    success: true,
                    message: "Gracias por agregar valor a nuestro sitio"
                })
            }

        } catch (error) {
            console.log(error)
            res.json({ success: false, message: "Algo a salido mal intentalo en unos minutos" }) //CAPTURA EL ERROR
        }

    }

}
module.exports = placesControllers
