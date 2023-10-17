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
router.route('/search_PSName')
   .post(tutorials.search_psname)
router.route('/search_psCode')
   .post(tutorials.search_psCode)

router.route('/search_election_bystate/')
   .post(tutorials.search_election_bystate)
   
// router.route('/search_Pscode')
//    .post(tutorials.search_pscode)


router.route('/search')                                  
   .post(tutorials.findSearch)
router.route('/get_PSName')
   .post(tutorials.get_psname)

router.route('/create')
   .post(tutorials.create)
router.route('/createdata')
   .post(tutorials.createdata)
router.route('/search_Region')
   .post(tutorials.search_Region)
router.route('/get_autoFill')
   .post(tutorials.get_autoFill)

   
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

router.route('/search_candidate')
   .post(tutorials.search_candidate)  
router.route('/search_partybynames')
   .post(tutorials.search_party)  

//  router.route('/:id')
//   .post(tutorials.findOne)

// router.route("/published")
//   .get(tutorials.findAllPublished);
module.exports = router;