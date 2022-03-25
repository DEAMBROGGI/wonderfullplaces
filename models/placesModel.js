
const mongoose =  require('mongoose')

const placesSchema =  new mongoose.Schema({
    name:{type:String, required:true},
    image:{type:String, required:true},
    country:{type:String, required:true}, 
    description:{type:String, required:true},
    autor: {type:mongoose.Types.ObjectId, ref:"users"},
    likes: {type: Array},
    comments:[{
        date:{type:Date},
        comment: {type: String},
        userID: {type:mongoose.Types.ObjectId, ref:"users"},
    }],
  
})

const Places = mongoose.model('lugares', placesSchema)
module.exports = Places