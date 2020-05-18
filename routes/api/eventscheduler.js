const express = require('express');
const {getEvent} = require('../../DataAccess/eventscheduler');
const {createEvent} = require('../../DataAccess/eventscheduler');
const {updateEvent} = require('../../DataAccess/eventscheduler');
const {deleteEvent} = require('../../DataAccess/eventscheduler');
const router = express.Router();

router.get('/', async function(req, res, next) {
    try {
          console.log("Got it!")
          const data = await getEvent(); 
          res.send(data);
    } catch (err) {
          console.log(err);
          res.send(500, "Error-Internal Server Issue. Failure.");
    };
});

router.post('/', async function(req, res, next) {
    console.log(req.body);
       try {
             const data = await createEvent(req.body); 
             res.send(data);
       } catch (err) {
             console.log(err);
             res.status(500).send  ("Error-Internal Server Issue. A total failure.");
  };
});

router.put('/:id', async function(req, res, next) {
    console.log(req.body);
       try {
             const data = await updateEvent(req.params.id, req.body); 
             res.send(data);
             
       } catch (err) {
             console.log(err);
             res.status(500).send  ("Error-Internal Server Issue. A total failure.");
       };
 });

router.delete('/:id', async function(req, res, next) {
    console.log(req.body);
         try {
               const data = await deleteEvent(req.params.id); 
               res.send(data);
               
         } catch (err) {
               console.log(err);
               res.status(500).send  ("Error-Internal Server Issue. A total failure.");
    };
});

module.exports = router;