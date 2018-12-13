const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

function aggregate (db, query, callback) {
  // Get the documents collection
  const collection = db.collection('Restaurants');
  // Find some documents
  collection.aggregate(query).limit(30).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    callback(docs);
  });
};

const url = "mongodb+srv://ksolimo:wkyP8ch7MvVZnul8@cluster0-yosjr.mongodb.net/";

module.exports = {
    
    all : function (callback) {
        // Use connect method to connect to the server
        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
         
            const db = client.db("Tecnologie");
         
            var query = [
                          {
                            '$project': {
                              '_id': 0, 
                              'name': '$name', 
                              'via': '$address.street', 
                              'numero': '$address.building'
                            }
                          }, {
                            '$sort': {
                              'name': 1
                            }
                          }
                        ];
         
            aggregate(db, query, function(docs) {
                client.close();
                callback(docs);
            });
        });
    },
    borough : function(borough, callback){
        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
         
            const db = client.db("Tecnologie");
            
            var query = [
                          {
                            '$match': {
                              'borough': borough
                            }
                          }, {
                            '$project': {
                              '_id': 0, 
                              'name': '$name', 
                              'via': '$address.street', 
                              'numero': '$address.building'
                            }
                          }, {
                            '$sort': {
                              'name': 1
                            }
                          }
                        ];
         
            aggregate(db, query, function(docs) {
                client.close();
                callback(docs);
            });
        });
    },
    allBorough : function(callback){
        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
         
            const db = client.db("Tecnologie");
            
            var query = [
                          {
                            '$group': {
                              '_id': '$borough'
                            }
                          }
                        ];
         
            aggregate(db, query, function(docs) {
                client.close();
                callback(docs);
            });
        });
    },
    allCuisine : function(callback){
        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
         
            const db = client.db("Tecnologie");
            
            var query = [
                          {
                            '$group': {
                              '_id': '$cuisine'
                            }
                          }
                        ];
         
            aggregate(db, query, function(docs) {
                client.close();
                callback(docs);
            });
        });
    },
    cuisine : function(cuisine, callback){
        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
         
            const db = client.db("Tecnologie");
            
            var query = [
                          {
                            '$match': {
                              'cuisine': cuisine
                            }
                          }, {
                            '$project': {
                              '_id': 0, 
                              'name': '$name', 
                              'via': '$address.street', 
                              'numero': '$address.building'
                            }
                          }, {
                            '$sort': {
                              'name': 1
                            }
                          }
                        ];
         
            aggregate(db, query, function(docs) {
                client.close();
                callback(docs);
            });
        });
    },
    cuisineEborough : function(cuisine, borough, callback){
        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
         
            const db = client.db("Tecnologie");
            
            var query = [
                          {
                            '$match': {
                              'cuisine': cuisine, 
                              'borough': borough
                            }
                          }, {
                            '$project': {
                              '_id': 0, 
                              'name': '$name', 
                              'via': '$address.street', 
                              'numero': '$address.building'
                            }
                          }, {
                            '$sort': {
                              'name': 1
                            }
                          }
                        ];
         
            aggregate(db, query, function(docs) {
                client.close();
                callback(docs);
            });
        });
    },
    string : function(string, callback){
        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
         
            const db = client.db("Tecnologie");
            
            var query = [
                          {
                            '$match': {
                              'name': new RegExp(string)
                            }
                          }, {
                            '$project': {
                              '_id': 0, 
                              'name': '$name', 
                              'via': '$address.street', 
                              'numero': '$address.building'
                            }
                          }, {
                            '$sort': {
                              'name': 1
                            }
                          }
                        ];
         
            aggregate(db, query, function(docs) {
                client.close();
                callback(docs);
            });
        });
    },
    stringMap : function(string, callback){
        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
         
            const db = client.db("Tecnologie");
            
            var query = [
                          {
                            '$match': {
                              'name': new RegExp(string)
                            }
                          }, {
                            '$project': {
                              '_id': 0, 
                              'name': '$name', 
                              'via': '$address.street', 
                              'numero': '$address.building', 
                              'address': '$address.coord'
                            }
                          }, {
                            '$sort': {
                              'name': 1
                            }
                          }
                        ];
         
            aggregate(db, query, function(docs) {
                client.close();
                callback(docs);
            });
        });
    }
    
};