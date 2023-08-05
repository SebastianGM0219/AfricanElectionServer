const express = require('express');
const tutorials = require("../controllers/tutorial.controller.js");
const router = express.Router();

router.route('/')
  .get(tutorials.findAll)
  .post(tutorials.create)

router.route('/:id')
.get(tutorials.findOne)
.put(tutorials.update)

router.route("/published")
  .get(tutorials.findAllPublished);

module.exports = router;