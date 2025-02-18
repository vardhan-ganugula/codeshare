const {server, app} = require('./utils/server')
const mongoose = require("mongoose");
const express = require('express')
const cors = require('cors')
const {handleGetCode,handlePutText,handleUpdateText,handleSearch} = require('./controllers/testShare')
const {handleCreateGroup, handleAddTextToGroup} = require('./controllers/group.controller')
const path = require('path')
require("dotenv").config();


const corsOptions = {
  origin: ['https://textshare.vardhan.works', '*', 'http://localhost:5173'], 
  optionsSuccessStatus: 200 
};






app.use(cors(corsOptions))
app.use('public', express.static('dist'))
mongoose
  .connect(process.env.MONGOOSE_URI)
  .then((success) => console.log("connection success"))
  .catch(err=> console.log(err));






app.get('/api/view-text', handleGetCode);
app.post('/api/create-text', handlePutText);
app.post('/api/update-text', handleUpdateText)
app.get('/api/search', handleSearch)
app.post('/api/create-group', handleCreateGroup)
app.post('/api/update-group', handleAddTextToGroup)

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

server.listen(process.env.PORT, function(con){
    console.log('server running at port:' + process.env.PORT)
});



