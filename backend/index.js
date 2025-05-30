const {server, app} = require('./utils/server')
const mongoose = require("mongoose");
const express = require('express')
const cors = require('cors')
const {handleGetCode,handlePutText,handleUpdateText,handleSearch} = require('./controllers/testShare')
const {handleCreateGroup, handleAddTextToGroup, handleSearchGroup} = require('./controllers/group.controller')
const path = require('path')
require("dotenv").config();


const corsOptions = {
  origin: ['https://textshare.vardhan.works', '*', 'http://localhost:5173'], 
  optionsSuccessStatus: 200 
};






app.use(cors(corsOptions))
mongoose
  .connect(process.env.MONGOOSE_URI)
  .then((success) => console.log("connection success"))
  .catch(err=> console.log(err));







app.get('/api/view-text', handleGetCode);
app.post('/api/create-text', handlePutText);
app.post('/api/update-text', handleUpdateText);
app.get('/api/search', handleSearch);
app.get('/api/search-group', handleSearchGroup); 
app.post('/api/create-group', handleCreateGroup);
app.post('/api/update-group', handleAddTextToGroup);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    if (req.originalUrl.startsWith('/api/')) {
      return res.status(404).json({ error: 'API route not found' });
    }
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}


server.listen(process.env.PORT, function(con){
    console.log('server running at port:' + process.env.PORT)
});



