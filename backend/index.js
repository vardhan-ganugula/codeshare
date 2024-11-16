const {io, server, app} = require('./utils/server')
const mongoose = require("mongoose");
const cors = require('cors')
const {handleGetCode,handlePutText,handleUpdateText} = require('./controllers/testShare')
require("dotenv").config();


const corsOptions = {
  origin: 'https://textshare.vardhan.works', 
  optionsSuccessStatus: 200 
};





app.use(cors(corsOptions))

mongoose
  .connect(process.env.MONGOOSE_URI)
  .then((success) => console.log("connection success"))
  .catch(err=> console.log(err));






app.get('/view-text', handleGetCode);
app.post('/create-text', handlePutText);
app.post('/update-text', handleUpdateText)


server.listen(process.env.PORT, function(con){
    console.log('server running at port:' + process.env.PORT)
});



