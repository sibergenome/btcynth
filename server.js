var express = require('express');
var app = express();
var path = require('path');
var btc_data = require('./btc.json');
var reqs = 0;
app.get('/', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'index.html'));
    reqs += 1;
    console.log("requests: "+reqs);
})
.get('/index.js', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'index.js'));
})
.get('/index.css', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'index.css'));
})
.get('/btc', (req,res)=>{
    res.json(btc_data);
})
.listen(4000, ()=>{
    console.log('listening on 4000');
});
