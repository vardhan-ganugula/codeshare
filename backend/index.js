const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors')
const {handleGetCode,handlePutText} = require('./controllers/testShare')
require("dotenv").config();


const corsOptions = {
  origin: 'https://textshare.vardhan.works', 
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static('dist'))
mongoose
  .connect(process.env.MONGOOSE_URI)
  .then((success) => console.log("connection success"))
  .catch(err=> console.log(err));


app.get('/view-text', handleGetCode);
app.post('/create-text', handlePutText);


app.listen(process.env.PORT, function(con){
    console.log('server running at port:' + process.env.PORT)
});





