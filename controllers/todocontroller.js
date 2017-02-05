var bodyParser=require('body-parser');
var mongoose=require('mongoose');

//Connect to the DB
mongoose.connect('mongodb://test:test@ds135069.mlab.com:35069/todo');


//create a schema - it's a blueprnt for schema

var todoSchema = new mongoose.Schema({
   item:String
});
var Todo =mongoose.model('Todo',todoSchema);
var itemOne= Todo({item:'buy flowers'}).save(function (err) {
   if(err) throw err;
   console.log('item saved');
});

//var data=[{item:'get milk'},{item:'walk dog'},{item:'kick some coding ass'}];
var urlcodedParser=bodyParser.urlencoded({extended:false});


module.exports = function(app){
    app.get('/todo',function (req,res) {
        //get data from mongodb and pass it to view annd add it to mongodb
        Todo.find({},function (err,data) {
            if (err) throw err;
            res.render('todo',{todos:data});
        });

    });



    app.post('/todo', urlcodedParser,function (req,res) {
        //get data from mongodb and pass it to view annd add it to mongodb
        var newTodo=Todo(req.body).save(function (err,data) {
            if(err) throw err;
            res.json(data);
        })



    });



    app.delete('/todo/:item',function (req,res) {
        //delete the requested item from mongodb
        Todo.find({item:req.params.item.replace(/\-/g,"")}).remove(function (err,data) {
            if(err) throw err;
            res.json(data);


});

    });
};