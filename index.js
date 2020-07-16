const express = require('express');
// const mongoose = require('mongoose');
const app = express();

// app.connect()

app.get('/', function(req,res){
    res.send('hi, there');
});



app.listen(process.env.PORT || 5000, () => {
    console.log('uKnow started');
});