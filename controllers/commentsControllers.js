const Places = require('../models/placesModel')

const commentsControllers = {

    addComment: async (req, res) => {
        const {place,comment} = req.body.comment
        const user = req.user._id
        try {
            const nuevoComment = await Places.findOneAndUpdate({_id:place}, {$push: {comments: {comment: comment, userID: user, date: Date.now()}}}, {new: true}).populate("autor", {fullName:1}).populate("comments.userID", {fullName:1})
            res.json({ success: true, response:{nuevoComment}, message:"gracias por dejarnos tu comentario" })

        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "Algo a salido mal intentalo en unos minutos" })
        }

    },
    modifiComment: async (req, res) => {
        const {commentID,comment} = req.body.comment
        const user = req.user._id
        try {
            const newComment = await Places.findOneAndUpdate({"comments._id":commentID}, {$set: {"comments.$.comment": comment,"comments.$.date": Date.now() }}, {new: true})
            console.log(newComment)
            res.json({ success: true, response:{newComment}, message:"tu comentario a sido modificado" })

        }
        catch (error) {
            console.log(error)
            res.json({ success: true, message: "Algo a salido mal intentalo en unos minutos" })
        }

    },
    deleteComment: async (req, res) => {
        const id = req.params.id
        const user = req.user._id
        try {
            const deleteComment = await Places.findOneAndUpdate({"comments._id":id}, {$pull: {comments: {_id: id}}}, {new: true})
          console.log(deleteComment)
            res.json({ success: true, response:{deleteComment}, message: "has eliminado el comentario" })

        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "Algo a salido mal intentalo en unos minutos" })
        }

    },
    
}
module.exports = commentsControllers