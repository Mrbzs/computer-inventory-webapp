// Using node js to post/get from server

'use strict';

const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const path = require('path');

const app = express();
const dataPath = '/home/mrbzs/ProjectData';
const serverURL = 'http://localhost:8100';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', serverURL);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST');
  next();
});

// Handles all get requests
app.get('*', (req, res) => {
  console.log('Received request');
  const handler = req.url.slice(1);

  fs.readFile(`${dataPath}/${handler}.json`, (err, data) => {
    if (err)
      throw err;
    res.send(JSON.parse(data));
    console.log(`Sent ${handler}`);
  });
});

// Handles all post requests
app.post('*', (req, res) => {
  console.log('Received request');
  const handler = req.url.slice(1);

  fs.readFile(`${dataPath}/${handler}.json`, (err, data) => {
    let json = JSON.parse(data);
    json.push(req.body);
    fs.writeFile(`${dataPath}/${handler}.json`, JSON.stringify(json), (err) => {
      if (err)
        throw err;
      console.log(`Data added to ${handler}.json`);
      res.send(req.body);
    });
  });
});

app.listen(3000, () => {
  console.log("Listening on PORT 3000");
});
