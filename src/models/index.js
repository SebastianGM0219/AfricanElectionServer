const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);
db.summary = require("./summary.model.js")(mongoose);
db.summary_region = require("./summary_region.model.js")(mongoose);
db.summary_nation = require("./summary_nation.model.js")(mongoose);
db.candidate_name = require("./candidate_name.model.js")(mongoose);
db.election_name = require("./elction_name.model.js")(mongoose);


module.exports = db;