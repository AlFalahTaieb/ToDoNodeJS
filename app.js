var express = require('express');
var todoController=require('./controllers/todocontroller');

var app = express();

//set up template engine
app.set('view engine','ejs');

//static files//chaque fois qu'on visite assets ça va mapper dans la statis public
app.use(express.static('./public'));
//fire controllers

todoController(app);

//listen to port

app.listen(3000);
console.log('You are Listening to port 3000');
