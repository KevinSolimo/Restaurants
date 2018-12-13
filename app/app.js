/*eslint-env node*/

var express = require('express');
var app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));

var restaurants = require(__dirname + '/function/queryMongoDB.js');

app.get('/stringMap', function(req, res){
    if(!req.query.Submit){
        
        res.render('es7Form');
        
    }else{
        restaurants.stringMap(req.query.string, function(docs){
          res.render('es7Map1', {message: 'Primi 30 ristoranti che contengono ' + req.query.string + ' nel nome', title:'Restaurants', list: docs});
        });
    }
});

app.get('/string', function (req, res) {
    if(!req.query.Submit){
        
        res.render('es6');
        
    }else{
        restaurants.string(req.query.string, function(docs){
          res.render('es2_2', {message: 'Primi 30 ristoranti che contengono ' + req.query.string + ' nel nome', title:'Restaurants', list: docs});
        });
    }
});



app.get('/', function (req, res) {
  restaurants.all(function(docs){
      res.render('es1', {message: 'Primi 30 ristoranti', title:'Restaurants', list: docs});
  });
});

app.get('/borough', function (req, res) {
    
    if(!req.query.Submit){
        
        res.render('es2');
        
    }else{
        restaurants.borough(req.query.borough,function(docs){
            res.render('es2_2', {message: 'Primi 30 ristoranti ' + req.query.borough , title:'Restaurants', list: docs});
        }); 
    }
  
});

app.get('/boroughList', function (req, res) {
    
    restaurants.allBorough(function(docs){
        res.render('es3', {list: docs});
    }); 
  
});

app.get('/cuisineList', function (req, res) {
    
    restaurants.allCuisine(function(docs){
        res.render('es4', {list: docs});
    }); 
  
});

app.get('/cuisine', function (req, res) {
    
    restaurants.cuisine(req.query.cuisine, function(docs){
        res.render('es2_2', {list: docs});
    }); 
  
});

app.get('/bcList', function (req, res) {
    
    restaurants.allCuisine( function(radio){
        restaurants.allBorough(function(select){
            res.render('es5', {listRadio: radio , listSelect : select});
        });
    }); 
  
});
app.get('/cuisine&borough', function (req, res) {
    
    restaurants.cuisineEborough(req.query.cuisine, req.query.borough, function(docs){
        res.render('es2_2', {message : 'Primi 30 ristoranti ' + req.query.borough + ' che fanno ' + req.query.cuisine, list: docs});
    });
  
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
