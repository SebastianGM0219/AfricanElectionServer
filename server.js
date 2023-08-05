const express = require("express");
const app = express();
 const router = express.Router();
// const routes = require("./app/routes/turorial.routes");

// const db = require("./app/models");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const compress = require("compression");
// const methodOverride = require("method-override");
// const cors = require("cors");
// const helmet = require("helmet");

// parse body params and attache them to req.body
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cookieParser());
// app.use(compress());
// app.use(methodOverride());

// // secure apps by setting various HTTP headers
// app.use(helmet());

// // enable CORS - Cross Origin Resource Sharing
// app.use(cors());

// // app.use("/", routes);

// // parse requests of content-type - application/json
// app.use(express.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

// db.mongoose
//   .connect(db.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("Connected to the database!");
//   })
//   .catch(err => {
//     console.log("Cannot connect to the database!", err);
//     process.exit();
//   });


// simple route
app.get("/", (req, res) => {
  console.log("REQUEST");
  res.json({ message: "Welcome to bezkoder application." });
});

// router.use("/", routes);

// set port, listen for requests
const PORT = process.env.PORT || 443;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});