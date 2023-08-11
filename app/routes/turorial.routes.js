const express = require('express');
const tutorials = require("../controllers/tutorial.controller.js");
const router = express.Router();

// router.route('/')
//   .get(tutorials.findAll)
//   .post(tutorials.create)

// router.route('/:id')
// .get(tutorials.findOne)
// .put(tutorials.update)

// router.route("/published")
//   .get(tutorials.findAllPublished);

router.route('/read')
   .post(tutorials.findAllPublished)
router.route('/search')
   .post(tutorials.findSearch)

router.route('/create')
   .post(tutorials.create)
router.route('/createdata')
   .post(tutorials.createdata)
router.route('/search_Region')
   .post(tutorials.search_Region)

   
router.route('/update/')
 .post(tutorials.update)

 router.route('/detail/')
 .post(tutorials.finddetail)

 router.route('/delete/:id')
 .post(tutorials.delete)

 router.route('/search_country')
   .post(tutorials.search_country)
router.route('/search_District')
   .post(tutorials.search_District)
router.route('/search_Constituency')
   .post(tutorials.search_Constituency)

   
//  router.route('/:id')
//   .post(tutorials.findOne)

// router.route("/published")
//   .get(tutorials.findAllPublished);
module.exports = router;