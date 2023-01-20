const express = require("express");
const { required } = require("nodemon/lib/config");
//const fs = require("fs");
const path= require("path");
const app = express();
var mongoose = require('mongoose');
const bodyparser= require("body-parser");
 mongoose.connect('mongodb://localhost/contactDance');

const port = 8000;
// define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    query: String
  });
  var Contact = mongoose.model('contact', contactSchema);


app.use(express.static('static', ))
//EXPRESS SPECIFIC STUFF
app.use('/static' ,express.static('static'))
app.use(express.urlencoded())

//PUG STUFFS
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// ENDPOINTS
app.get('/', (req, res)=>{
    
    const params = { }
    res.status(200).render('home.pug');
})



app.get('/contact', (req, res)=>{
    
    const params = { }
    res.status(200).render('contact.pug');
})
app.get('/about', (req, res)=>{
    
    const params = { }
    res.status(200).render('about.pug');
})
app.get('/services', (req, res)=>{
    
    const params = { }
    res.status(200).render('services.pug');
})
app.get('/info', (req, res)=>{
    
    const params = { }
    res.status(200).render('info.pug');
})

app.post('/contact', (req, res)=>{
    var myData= new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to database")
    }).catch(()=>{
        res.status(400).send("This item was not saved to database");    
    });
  //  res.status(200).render('contact.pug', params);
})
    


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
}); 