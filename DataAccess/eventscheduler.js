const MongoClient = require('mongodb').MongoClient;
const ObjectID = require("mongodb").ObjectID;
const assert = require('assert');
 
const url = process.env.DB_URL;

const dbName = "eventscheduler";
const colName = "events";
const settings = { useUnifiedTopology: true }

const getEvent = () => {
    const iou = new Promise ((resolve,reject) => {
        MongoClient.connect(url, settings, function(err, client){
            if(err){
                reject(err);
            }else{
                console.log("Connected to Events Scheduler")
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.find({}).toArray(function(err, docs){
                    if (err) {
                        reject(err);
                    } else { 
                        console.log("Found the Following");
                        console.log(docs);
                        resolve(docs);
                        client.close();
                    }
                });
            }
        });
    });
    return iou;
};

const createEvent = (event) => {
    const iou = new Promise ((resolve,reject) => {
        MongoClient.connect(url, settings, async function (err,client){
            if(err){
                reject(err);
            } else{
                console.log("Connected successfully to POST new Event");
                const db = client.db(dbName);
                const collection = db.collection(colName)
                collection.insertMany (event, (err, result) => {
                   if(err){
                       reject(err);
                   } else {
                       resolve(result.ops); 
                       client.close();
                   }
               })


            }
        

        })
    });
    return iou;
};

const updateEvent= (id, event) => {
    const iou = new Promise ((resolve, reject) => {
        MongoClient.connect(url, settings, function (err, client){
            if(err){
                reject(err);
            }else{
                console.log("Connected to server to Update Event.");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.replaceOne({_id: ObjectID(id)},
                    event,
                    {upsert:true },
                    (err, result) => {
                        if(err){
                            reject(err);
                        }else{
                            resolve({ updated_id:id });
                            client.close();
                        }
                    }
                );
            }
        })
    })
    return iou;
};

const deleteEvent = async (id) => {
    const iou = new Promise ((resolve, reject) => {
        MongoClient.connect(url, settings, async function (err, client) { //changed "url" to "DB_URL" 
            if(err){
                reject(err);
            } else {
                console.log("Connected to Server to Delete Event");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                console.log(collection)
                collection.deleteMany({_id: ObjectID(id) }, (err, result) => {
                    if (err) {
                        reject(err);
                    } else{
                         resolve(true);
                         client.close(); 
                    }
                })
            }
        })    
    })
    return iou;
};  


module.exports = {
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
}