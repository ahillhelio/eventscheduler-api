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
}