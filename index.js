const express = require('express');
// const mongoose = require('mongoose');
const app = express();

// app.connect()

app.get('/', function(req,res){
    res.send('hi, there');
});



app.listen(5000 || process.env.PORT, () => {
    console.log('uKnow started');
});