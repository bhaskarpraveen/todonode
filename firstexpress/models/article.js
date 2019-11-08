let mongoose=require('mongoose')

let noteSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    notes:{
        type:String,
        required:true
    }
})

let Note = module.exports= mongoose.model('Note',noteSchema)