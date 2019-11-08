const express = require('express')
const app = express()
const path = require('path');
const assert = require('assert')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb');
mongoose.connect('mongodb+srv://praveen:180030026@firstcluster-amvhk.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
let db=mongoose.connection;


db.once('open',function(){
    console.log('Connected to MongoDB')
})


//check for db errors
db.on('error',function(err){
    console.log(err)
})


//connect html templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','pug')
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');
//connect static path
app.use(express.static(path.join(__dirname,'public')))

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())

//Bring in Models
let Note = require('./models/article')

app.post('/notes/add',(req,res)=>{
    let note = new Note();

    note.title=req.body.title
    note.notes=req.body.notes
    note.save(function(err){
        if(err){
            console.log(err)
            return;
        }else{
            res.redirect('/');
        }
    })

})
app.get('/notes/add',(req,res)=>{
    res.render('add_notes',null)
})
app.get('/',function(reg,res){
    Note.find({},function(err,notes){
        if(err){
            console.log(err)
        }else{
           
            res.render('home',{
                notes:notes
            })
        }
        
    })
    
})

//update notes
app.post('/notes/edit/:id',(req,res)=>{
    let note = {};

    note.title=req.body.title
    note.notes=req.body.notes
    let query={_id:req.params.id}
    Note.updateOne(query,note,function(err){
        if(err){
            console.log(err)
            return;
        }else{
            res.redirect('/');
        }
    })

})


app.get('/delete/notes/:id',function(req,res){
    let query = {_id:req.params.id}
    Note.deleteOne(query,function(err){
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})
app.listen(3000)
console.log('running on port 3000')