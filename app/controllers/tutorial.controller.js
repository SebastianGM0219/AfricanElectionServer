const db = require("../models");
const axios = require('axios');
const Tutorial = db.tutorials;

let lastUpdated;
let page = 0;

const calc = ( baseUrl ) => {
  const idx = baseUrl.lastIndexOf("-");
  baseUrl = baseUrl.slice(6, idx) + "." + baseUrl.slice(idx + 1);
  return "https://cdn.sanity.io/images/u0v1th4q/production/" + baseUrl + "?rect,0,1830,900&auto=format";
  //"?rect=0,39,1920,1002&w=640&h=334&auto=format&w=3840&q=75";
}
// get data from server
const grabNewsFromServer = async () => {
  
  await Tutorial.deleteMany();
  
  lastUpdated = Date();

  page = 0;
  setTimeout(getPage, 10);
}

const getPage = () => {
  const url = 'https://www.futurepedia.io/api/tools?page=' + page + '&sort=verified';
  axios.get(url)
  .then(data => {
    const responseObject = data.data;
    console.log("Debug ================================> Received ", page, responseObject.length);
    
    Tutorial.insertMany(responseObject.map( obj => ( {
      id: obj.id,
      duplictae: obj.duplicate,
      favCount: obj.favCount,
      image: calc(obj.mainImage.asset._ref),
      pricing: obj.pricing,
      publishedAt: obj.publishedAt,
      publishedAt_timestamp: obj.publishedAt_timestamp,
      reviewCount: obj.reviewStats.reviewCount,
      reviewScore: obj.reviewStats.reviewScore,
      socialLinks: obj.socialLinks,
      sponser: obj.sponsorOfTheDay,
      startingPrice: obj.startingPrice,
      status: obj.status,
      tagsIndex: obj.tagsIndex,
      toolCategories: obj.toolCategories,
      toolName: obj.toolName,
      toolShortDescription: obj.toolShortDescription,
      verified: obj.verified,
      verifiedReason: obj.verifiedReason,
      websiteUrl: obj.websiteUrl,
    } )));

    if(responseObject.length == 9){
      page ++;
      setTimeout(getPage, 10);
    } else {
      console.log("Debug ================================> Grabbing Ended : ", responseObject.length);
    }
      
  })
  .catch(error => console.error(error));

}

//grab data from server on startup
grabNewsFromServer();

// Create and Save a new Tutorial
exports.create = (req, res) => {
  console.log("API Request =========================================> Create");
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Tutorial in the database
  tutorial
    .save(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  console.log("API Request =========================================> FindAll");
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Tutorial.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  console.log("API Request =========================================> FindOne");
  const now = Date();
  if (now - lastUpdated >= 24 * 60 * 60 * 1000){
    grabNewsFromServer();
  }

  const limit = req.params.id;
  let from = ( lastUpdated == req.lastUpdated
              ? Math.max( limit - 9, 0 )
              : 0 );
  
  Tutorial.find()
    .skip(from)
    .limit(limit - from)
    .then(data => {
      res.send( { data: data, first: from } );
    })
    .catch(err => {
      res
        .status(500)
        .send("Error");
    })
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  console.log("API Request =========================================> Update");
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  console.log("API Request =========================================> FindAllPublished");
  Tutorial.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
