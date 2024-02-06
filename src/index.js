const express = require("express");
const app = express();
 const router = express.Router();
const routes = require("./routes/index");
const conn_str = "mongodb+srv://father:Showlightning123@cluster0.rpclhi3.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const https = require('https');
const fs = require('fs');
// let key = fs.readFileSync(__dirname+'/tutorial.key','utf-8');
// let cert = fs.readFileSync(__dirname+'/tutorial.crt','utf-8');

const {parse} = require('csv-parse');
var csv = require("fast-csv");
var stream = fs.createReadStream('Elections App1.csv');

const db = require("./models");
const axios = require('axios');
const Tutorial = db.tutorials;
// const cookieParser = require("cookie-parser");
// const compress = require("compression");
// const methodOverride = require("method-override");
 const cors = require("cors");
// const helmet = require("helmet");

// parse body params and attache them to req.body

//important code"




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cookieParser());
// app.use(compress());
// app.use(methodOverride());

// // secure apps by setting various HTTP headers
// app.use(helmet());

// // enable CORS - Cross Origin Resource Sharing
 app.use(cors());


// // parse requests of content-type - application/json
// app.use(express.json());

// // parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");

    //   var list= new Array();
    // fs.createReadStream('Elections App1.csv')
    // .pipe(parse({delimiter: ':'}))
    // .on('data', (row) => {
    //   list.push(row)
    //   // console.log(row);
    // })
    // .on('end', () => {
    //   console.log('CSV file successfully processed');
    //   //  console.log(list)
    //   for (var i in list) {
    //     var str= list[i].toString();

    //     var res= str.split(",")
    //     //const post= new Post();


    //       const tutorial = new Tutorial({
    //         PSCode: res[0].trimStart(),
    //         PSName: res[1].trimStart(),
    //         Country: res[2].trimStart(),
    //         Region: res[3].trimStart(),
    //         District: res[4].trimStart(),          
    //         Constituency: res[5].trimStart(),
    //       });
                
    //       // console.log(tutorial);
    //       // Savze Tutorial in the database
    //       tutorial
    //         .save(tutorial);
    //     }
    // });
  
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


// simple route
app.get("/", (req, res) => {
  console.log("REQUEST:", req);
  res.json({ message: "Welcome to bezkoder application." });
});
app.use(require('./routes/index'));
// mongoose.connect(
//   conn_str,
//   { 
//   useNewUrlParser: true, 
//   useUnifiedTopology: true 
//   },(err) => {
//   if (err) {
//   console.log("error in connection");
//   } else {
//   console.log("mongodb is connected");
//   }});
  //create a server object:
// router.use("/", routes);
// app.use("/", routes);

// set port, listen for requests
const PORT = process.env.PORT || 443;
// const parameters = {
//   key: key,
//   cert: cert
// }
// let server = https.createServer(parameters,app)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
// server.listen(PORT,()=>{
//   console.log(`Server is listening at port ${PORT}`)
// })