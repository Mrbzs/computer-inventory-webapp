// Using node js and mongodb to post/get from local server

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;

const app = express();
const baseURL = 'http://localhost:8100';
const databaseURL = 'mongodb://localhost:27017/computer-inventory';
let db; // The database instance

// Body parser middleware for parsing req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', baseURL);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', ['POST', 'GET', 'DELETE', 'PUT', 'OPTIONS']);

  // This is to overcome CORS error - preflight channel did not succeed
  if ('OPTIONS' === req.method) return res.sendStatus(200);
  next();
});

// Connect to database
MongoClient.connect(databaseURL).then((client) => {
  db = client.db('computer-inventory');
  console.log('Connected to database');

  // Create the collections if not already created
  db.createCollection('users').then().catch(err => {
    console.log(err);
  });
  db.createCollection('equipments').then().catch(err => {
    console.log(err);
  });
  db.createCollection('staff').then().catch(err => {
    console.log(err);
  });

  // Insert admin user if doesn't exist
  db.collection('users').find({username: 'admin'}).toArray().then(result => {
    if (!result.length) {
      db.collection('users').insertOne({
        name: "admin",
        role: "Admin",
        username: "admin",
        password: "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9"
      }).then(() => {
        console.log('Inserted admin');
      }).catch(err => {
        console.log(err);
      });
    }
  }).catch(err => {
    console.log(err);
  });

}).catch(err => {
  console.log(err);
});

// Gets all users
app.get('/users', (req, res) => {
  db.collection('users').find().toArray().then(result => {
    res.send(result);
    console.log('Sent users');
  }).catch(err => {
    console.log(err);
    res.sendStatus(400);
  });
});

// Gets all equipments
app.get('/equipments', (req, res) => {
  db.collection('equipments').find().toArray().then(result => {
    res.send(result);
    console.log('Sent equipments');
  }).catch(err => {
    console.log(err);
    res.sendStatus(400);
  });
});

// Gets all staff
app.get('/staff', (req, res) => {
  db.collection('staff').find().toArray().then(result => {
    res.send(result);
    console.log('Sent staff');
  }).catch(err => {
    console.log(err);
    res.sendStatus(400);
  });
});

// Gets a user by username
app.get('/users/:username', (req, res) => {
  db.collection('users').find({username: req.params.username}).toArray().then(result => {
    res.send(result);
    console.log('Sent user by username');
  }).catch(err => {
    console.log(err);
    res.sendStatus(400);
  });
});

// Handles all post requests
app.post('*', (req, res) => {
  const handler = req.originalUrl.slice(1);
  db.collection(handler).insertOne(req.body).then(() => {
    console.log('Inserted document to', handler);
    res.send(req.body);
  }).catch(err => {
    console.log(err);
    res.sendStatus(400);
  });
});

// Handles all delete requests
app.delete('/:handler/:id', (req, res) => {
  db.collection(req.params.handler).deleteOne({_id: ObjectID(req.params.id)}).then(result => {
    console.log('Deleted document from', req.params.handler);
    res.send(!!result.deletedCount);
  }).catch(err => {
    console.log(err);
    res.sendStatus(400);
  });
});

// Update equipment by id
app.put('/equipments/:id', (req, res) => {
  db.collection('equipments').updateOne({_id: ObjectID(req.params.id)}, {$set: {staff: req.body.staff}}).then(result => {
    console.log('Updated equipment');
    res.send(!!result.matchedCount);
  }).catch(err => {
    console.log(err);
    res.sendStatus(400);
  });
});

// Update staff by id
app.put('/staff/:id', (req, res) => {
  db.collection('staff').updateOne({_id: ObjectID(req.params.id)}, {$set: {email: req.body.email, office: req.body.office, equipments: req.body.equipments}}).then(result => {
    console.log('Updated staff');
    res.send(!!result.matchedCount);
  }).catch(err => {
    console.log(err);
    res.sendStatus(400);
  });
});

// Update lab assistant by id
app.put('/users/:id', (req, res) => {
  db.collection('users').updateOne({_id: ObjectID(req.params.id)}, {$set: {email: req.body.email}}).then(result => {
    console.log('Updated lab assistant');
    res.send(!!result.matchedCount);
  }).catch(err => {
    console.log(err);
    res.sendStatus(400);
  });
});

app.listen(3000, () => {
  console.log('listening on PORT 3000');
});
