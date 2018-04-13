// Using node js and mongodb to post/get from local server

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const serverURL = 'http://localhost:8100';
const databaseURL = 'mongodb://localhost:27017/computer-inventory';
let db;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', serverURL);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', ['POST', 'GET', 'DELETE', 'PUT']);
  next();
});

MongoClient.connect(databaseURL, (err, client) => {
  if (err) return console.log(err);
  db = client.db('computer-inventory');
  console.log('Connected to database');

  // Create the collections if not already created
  db.createCollection('users');
  db.createCollection('equipments');
  db.createCollection('staff');

  // Insert admin user if doesn't exist
  db.collection('users').find({username: 'admin'}).toArray((err, results) => {
    if (!results.length)
      db.collection('users').insertOne({name:"admin", role:"Admin", username:"admin", password:"240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9"});
  });

  // Gets all users
  app.get('/users', (req, res) => {
    db.collection('users').find().toArray((err, results) => {
      res.send(results);
      console.log('Sent users');
    });
  });

  // Gets all equipments
  app.get('/equipments', (req, res) => {
    db.collection('equipments').find().toArray((err, results) => {
      res.send(results);
      console.log('Sent equipments');
    });
  });

  // Gets all staff
  app.get('/staff', (req, res) => {
    db.collection('staff').find().toArray((err, results) => {
      res.send(results);
      console.log('Sent staff');
    });
  });

  // Gets a user by username
  app.get('/users/:username', (req, res) => {
    db.collection('users').find({username: req.params.username}).toArray((err, results) => {
      res.send(results);
      console.log('Sent user by username');
    });
  });

  // Add equipment to database
  app.post('/equipments', (req, res) => {
    db.collection('equipments').insertOne(req.body).then(() => {
      console.log('Added equipment to database');
      res.send(req.body);
    }).catch(err => {
      res.send(err);
    });
  });

  // Add lab assistant to database
  app.post('/users', (req, res) => {
    db.collection('users').insertOne(req.body).then(() => {
      console.log('Added user to database');
      res.send(req.body);
    }).catch(err => {
      res.send(err);
    });
  });

  // Add staff to database
  app.post('/staff', (req, res) => {
    db.collection('staff').insertOne(req.body).then(() => {
      console.log('Added staff to database');
      res.send(req.body);
    }).catch(err => {
      res.send(err);
    });
  });

  app.listen(3000, () => {
    console.log('listening on PORT 3000');
  });

});
