var express = require('express');
var bodyparser = require('body-parser');



var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var mongoUrl = 'mongodb://localhost:27017/myserver';
var mongo;

MongoClient
  .connect(mongoUrl)
  .then(function(db) {
    mongo = db;
  });


var app = express();

app.use(bodyparser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
    next();
});


app.get("/", function(req,res){
	res.send("Your is in my API Srver");
});

app.get('/tasks/get', function(req,res){
	if(req.query.all === 'true'){
		mongo
			.collection('tasks').find().toArray()
			.then(function(tasks) {
			   res.send(tasks);
			});
		console.log('send Task');
	}
	else{
		res.send("hello");
	}
});

app.post('/tasks/post', function(req,res){
	var task = {
		name:'',
		desk:''
	}
	if(req.query.type === 'set'){
		
			task.name = req.body.name;
			task.desk = req.body.desk;
			mongo
				.collection('tasks').insert(task)
				.then(function(tasks) {
					console.log('get Task');
			});
		}
		else if(req.query.type === 'delete'){
			var task = {
				name: req.body.name
			}
			mongo
				.collection('tasks').remove(task)
				.then(function(tasks) {
					console.log('delete Task');
			});
		}
		
	
	res.send();
});

app.listen(3001);
