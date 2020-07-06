const express = require('express');
const { request } = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));
const mongodb = require('mongoose');
const User = require('./server/model/User')
mongodb.connect('mongodb://localhost/backboneDB');

//test DB connection
// const m = new User({
//     name: 'mmm'
// })
// m.save();

const port = 3000;
app.listen(port, () => console.log(`:) port is open on ${port}`));
