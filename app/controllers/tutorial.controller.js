const db = require("../models");
const axios = require('axios');
const Tutorial = db.tutorials;
const summary = db.summary;
const summary_region = db.summary_region;
const summary_nation = db.summary_nation;
const CandidateNames = db.candidate_name;
const fs = require('fs');
const {parse} = require('csv-parse');
var csv = require("fast-csv");
const summary_regionModel = require("../models/summary_region.model");
var stream = fs.createReadStream('Elections App1.csv');
let lastUpdated;
let page = 0;

exports.create = (req, res) => {
  console.log("API Request =========================================> Create");
  console.log(req.body);

  const tutorial = new Tutorial({
    PSCode: req.body.PSCode,
    Constituency: req.body.Constituency,
    District: req.body.District,
    PSName: req.body.PSName,
    Region: req.body.Region,
    Winner: req.body.Winner,
    TableData2: req.body.TableData2,
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

exports.createdata = (req, res) => {
  console.log("API Request =========================================> Create");
};


exports.update = (req, res) => {
  console.log("API Request =========================================> Update");
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  Tutorial.findOneAndUpdate({PSCode:req.body.PSCode},req.body, { useFindAndModify: true })
    .then(data => {
      if (!data) {
        console.log(data);
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({ message: "Tutorial was updated successfully." });
        summary.findOneAndUpdate({Constituency: data.Constituency},{ $setOnInsert: { 
          Country:data.Country,
          Region: data.Region, 
          District: data.District,
          Constituency: data.Constituency,
        } }, { upsert: true, new: true }, (error, summary) => {
          if (error) {
            console.error('Error finding document:', error);
            return;
          }
          res.send({ message: "Fine was updated successfully." });
          const candidates = [];
          const names = [];
        //      console.log(req.body.TableData);
          // const {table} = req.body.TableData;
          const {TableData} = req.body;

          const table=TableData;
          let sum_me = parseInt(summary.Sum);
          for (let i = 1; i <= 8; i++) {
            let valful= 0;
             if (!isNaN(parseInt(table[i][3])) ) 
             {
              let valful = parseInt(table[i][3]);
              console.log(valful);
              summary.Sum  = summary.Sum + parseInt(valful);
         
             }
             else
             {
               valful= 0;  
             }             
          }
        
          for (let i = 1; i <= 8; i++) {
            const candidate = table[i][1];
            const party_val = table[i][2];
            let val = '0';
            if (!isNaN(table[i][3])) {
               val = table[i][3];
            }
            else
              val= '0';
            if (candidate !== null && candidate !== "") {
                candidates.push(candidate);
                names.push(val);  
        
              const voteCountIndex = summary.VoteCount.findIndex((obj) => obj.name === candidate);
              if (voteCountIndex !== -1) {
                
                console.log(voteCountIndex);
                console.log(names);
                summary.VoteCount[voteCountIndex].value = parseInt(summary.VoteCount[voteCountIndex].value) + parseInt(val);
              }
              else
              {
             
                console.log(val);
                console.log(summary.Sum);   
                summary.CandiDate.push(candidate);
                summary.VoteCount.push({name: candidate, value: parseInt(val)});
                summary.PartyData.push({name: candidate, value: party_val});
                summary.Percent.push({name: candidate, value: ((parseInt(val)/parseFloat(summary.Sum)) * 100).toFixed(2)});
              }          
            }

          }
            summary.save()
              .then(savedSummary => {
                console.log('Document updated:', savedSummary);
              })
              .catch(saveError => {
                console.error('Error saving updated document:', saveError);
              });
        
        });

        summary_region.findOneAndUpdate({Region: data.Region},{ $setOnInsert: { 
          Country:data.Country,
          Region: data.Region,
          District: data.District,
          Constituency: data.Constituency,
        } }, { upsert: true, new: true }, (error, summary_region) => {
          if (error) {
            console.error('Error finding document:', error);
            return;
          }
          const candidates = [];
          const names = [];
        //      console.log(req.body.TableData);
          // const table = JSON.parse(req.body.TableData);
          const {TableData} = req.body;

          const table=TableData;
          let sum_me = parseInt(summary_region.Sum);
          for (let i = 1; i <= 8; i++) {
            let valful= 0;
             if (!isNaN(parseInt(table[i][3])) ) 
             {
              let valful = parseInt(table[i][3]);
              console.log(valful);
              summary_region.Sum  = summary_region.Sum + parseInt(valful);
             }
             else
             {
               valful= 0;  
             }             
          }
        
          for (let i = 1; i <= 8; i++) {
            const candidate = table[i][1];
            const party_val = table[i][2];
            let val = '0';
            if (!isNaN(table[i][3])) {
               val = table[i][3];
            }
            else
              val= '0';
            if (candidate !== null && candidate !== "") {
                candidates.push(candidate);
                names.push(val);  
        
              const voteCountIndex = summary_region.VoteCount.findIndex((obj) => obj.name === candidate);
              if (voteCountIndex !== -1) {
                
                console.log(voteCountIndex);
                console.log(names);
                summary_region.VoteCount[voteCountIndex].value = parseInt(summary_region.VoteCount[voteCountIndex].value) + parseInt(val);
              }
              else
              {
                console.log(val);
                console.log(summary_region.Sum);   
                summary_region.CandiDate.push(candidate);
                summary_region.VoteCount.push({name: candidate, value: parseInt(val)});
                summary_region.PartyData.push({name: candidate, value: party_val});
                summary_region.Percent.push({name: candidate, value: ((parseInt(val)/parseFloat(summary_region.Sum)) * 100).toFixed(2)});
              }          
            }
          }
          summary_region.save()
              .then(savedSummary => {
                console.log('Document updated:', savedSummary);   
              })
              .catch(saveError => {
                console.error('Error saving updated document:', saveError);
              });
        
        });

        summary_nation.findOneAndUpdate({Country: data.Country},{ $setOnInsert: { 
          Country:data.Country,
          Region: data.Region,
          District: data.District,
          Constituency: data.Constituency,
        } }, { upsert: true, new: true }, (error, summary_nation) => {
          if (error) {
            console.error('Error finding document:', error);
            return;
          }
          const candidates = [];
          const names = [];
          const {TableData} = req.body;
          const table=TableData;
          let sum_me = parseInt(summary_nation.Sum);
          for (let i = 1; i <= 8; i++) {
            let valful= 0;
             if (!isNaN(parseInt(table[i][3])) ) 
             {
              let valful = parseInt(table[i][3]);
              console.log(valful);
              summary_nation.Sum  = summary_nation.Sum + parseInt(valful);
             }
             else
             {
               valful= 0;  
             }             
          }
        
          for (let i = 1; i <= 8; i++) {
            const candidate = table[i][1];
            const party_val = table[i][2];
            let val = '0';
            if (!isNaN(table[i][3])) {
               val = table[i][3];
            }
            else
              val= '0';
    
            if (candidate !== null && candidate !== "") {
              candidates.push(candidate);
              names.push(val);  
              const voteCountIndex = summary_nation.VoteCount.findIndex((obj) => obj.name === candidate);
              if (voteCountIndex !== -1) {
                
                console.log(voteCountIndex);
                console.log(names);
                summary_nation.VoteCount[voteCountIndex].value = parseInt(summary_nation.VoteCount[voteCountIndex].value) + parseInt(val);
              }
              else
              {
                console.log(val);
                console.log(summary_nation.Sum);   
                summary_nation.CandiDate.push(candidate);
                summary_nation.VoteCount.push({name: candidate, value: parseInt(val)});
                summary_nation.PartyData.push({name: candidate, value: party_val});
                summary_nation.Percent.push({name: candidate, value: ((parseInt(val)/parseFloat(summary_nation.Sum)) * 100).toFixed(2)});
              }          
            }
            // console.log(summary);
        
          }
        
          summary_nation.save()
              .then(savedSummary => {
                console.log('Document updated:', savedSummary);
        
              })
              .catch(saveError => {
                console.error('Error saving updated document:', saveError);
              });
        
        });
        // Tutorial.save()
        //       .then(savedSummary => {
        //         console.log('Document updated:', savedSummary);
        
        //       })
        //       .catch(saveError => {
        //         console.error('Error saving updated document:', saveError);
        //       });
      }

    })  
    .catch(err => {
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
exports.search_country = (req, res) => {
  console.log("API Request =========================================> FindAllPublished");
  Tutorial.distinct("Country").then(data => {
    const newData = data.map(item => {
      return {
        title: item
      };
    });
    res.send(newData);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
};
exports.get_autoFill = (req, res) => {
  console.log("API Request =========================================> FindAllPublished");
  console.log(req.body.PSName);
  if(req.body.PSCode)
  {
    
    Tutorial.findOne({PSCode: req.body.PSCode}).then(data => {
        const newData = {
          PSCode: data.PSCode,
          PSName: data.PSName,
          Constituency: data.Constituency,
      };
      res.send(newData);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
  }
  // if(req.body.PSCode)
  // {
  //     Tutorial.findOne({PSCode: req.body.PSCode}).then(data => {
  //         const newData = {
  //           PSCode: data.PSCode,
  //           PSName: data.PSName,
  //       };
  //       res.send(newData);
  //     })
  //     .catch(err => {
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while retrieving tutorials."
  //       });
  //     });
  // }

};
exports.search_Region = (req, res) => {
  console.log("API Request =========================================> FindAllPublished");
  Tutorial.distinct("Region", {Country:req.body.Country}).then(data => {
    const newData = data.map(item => {
      return {
        title: item
      };
    });
    res.send(newData);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

exports.search_District = (req, res) => {
  console.log("API Request =========================================> FindAllPublished");
  Tutorial.distinct("District", {Region:req.body.Region}).then(data => {
    const newData = data.map(item => {
      return {
        title: item
      };
    });
    res.send(newData);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

exports.search_Constituency = (req, res) => {
  console.log("API Request ======== =================================> FindAllPublished");
  Tutorial.distinct("Constituency", {Region:req.body.Region}).then(data => {
    const newData = data.map(item => {
      return {
        title: item
      };
    });
    res.send(newData);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
};
exports.search_psname = (req, res) => {
  console.log("API Request =========================================> FindAllPublished");

  const pageSize = 30; // Number of items to retrieve in each page
  const currentPage = req.body.Page || 1; // Get the requested page number from the query parameter

  console.log(req.body.Page);

  Tutorial.find({PSName: { $regex: req.body.PSName, $options: "i" }})
    .sort({ PSCode: 1 }) // Sort the data by the PSCode property in ascending order
    .skip((currentPage - 1) * pageSize) // Skip the appropriate number of items based on the page number
    .limit(pageSize) // Retrieve only the desired number of items
    .then(data => {
      const newData = data.map(item => {
        console.log(item);
        return {
          PSName: item.PSName,
        };
      });
      res.send(newData);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tutorials."
      });
    });
}
exports.search_psCode = (req, res) => {
  console.log("API Request =========================================> FindAllPublished");

  const pageSize = 5; // Number of items to retrieve in each page
  const currentPage = req.body.Page || 1; // Get the requested page number from the query parameter

  console.log(req.body.Page);

  Tutorial.find({PSCode: { $regex: req.body.PSCode, $options: "i" }})
    .sort({ PSCode: 1 }) // Sort the data by the PSCode property in ascending order
    .skip((currentPage - 1) * pageSize) // Skip the appropriate number of items based on the page number
    .limit(pageSize) // Retrieve only the desired number of items
    .then(data => {
      const newData = data.map(item => {
        console.log(item);
        return {
          PSCode: item.PSCode,
        };
      });
      res.send(newData);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tutorials."
      });
    });
}
exports.findAllPublished = (req, res) => {
  console.log("API Request =========================================> FindAllPublished");

  const pageSize = 10000; // Number of items to retrieve in each page
  const currentPage = req.body.Page || 1; // Get the requested page number from the query parameter

  console.log(req.body.Page);

  Tutorial.find({PSName: req.body.name})
    .sort({ PSCode: 1 }) // Sort the data by the PSCode property in ascending order
    .skip((currentPage - 1) * pageSize) // Skip the appropriate number of items based on the page number
    .limit(pageSize) // Retrieve only the desired number of items
    .then(data => {
      const newData = data.map(item => {
        console.log(item);
        return {
          PSName: item.PSName,
        };
      });
      res.send(newData);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.findSearch = (req, res) => {
  console.log("API Request =========================================> FindSearch");
  const pageSize = 10; // Number of items to retrieve in each page
  const currentPage = req.body.Page || 1; // Get the requested page number from the query parameter
  console.log(req.body.Page);
  console.log(req.body.Region);
  console.log(req.body.Constituency);
  console.log(req.body.Page);
  console.log(req.body.Region);
  console.log(req.body.Constituency);
  let val = [];
  let promises = [];
  if (req.body.Constituency) {
    // Push the promise to retrieve the summary into the promises array
    promises.push(
      summary.findOne({ Constituency: req.body.Constituency })
        .then(item => {
          val[0] = item;
          console.log(item);
        })
        .catch(err => {
          throw new Error(err.message || "Some error occurred while retrieving tutorials.");
        })
    );
  }
  
  if (req.body.Region) {
    promises.push(
      summary_region.findOne({ Region: req.body.Region })
        .then(item => {
          val[1] = item;
          console.log(item);
        })
        .catch(err => {
          throw new Error(err.message || "Some error occurred while retrieving tutorials.");
        })
    );
  }
  
  if (req.body.Country) {
    promises.push(
      summary_nation.findOne({ Country: req.body.Country })
        .then(item => {
          val[2] = item;
          console.log(item);
        })
        .catch(err => {
          throw new Error(err.message || "Some error occurred while retrieving tutorials.");
        })
    );
  }
  // Await all promises to resolve using Promise.all
  Promise.all(promises)
    .then(() => {
      // Send the response with the populated val array
      res.send(val);
    })
    .catch(err => {
      // Handle any errors that occurred during the promises
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
exports.finddetail = (req, res) => {
  console.log("API Request =========================================> Finddetail");
  console.log(req.body.PSCode);
  Tutorial.findOne({PSCode:req.body.PSCode})
    .then(item => {
      res.send(item);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.search_candidate = (req, res) => {
  console.log("API Request =========================================> FindAllPublished");
  CandidateNames.distinct("Candiate").then(data => {
    const newData = data.map(item => {
      return {
        title: item
      };
    });
    res.send(newData);
  })
  .catch(err => {   
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
};
exports.get_psname = (req, res) => {
  console.log("API Request =========================================> FindAllPublished");
  Tutorial.find({}).then(data => {
    data.map(item => {
       res.send({name: item.PSName});
    })
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

exports.search_party = (req, res) => {
  console.log("API Request =========================================> FindAllPublished");
  CandidateNames.findOne({Candiate:req.body.candidate}).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
};