const db = require("../models");
const axios = require('axios');
const Tutorial = db.tutorials;
const summary = db.summary;
const summary_region = db.summary_region;
const summary_nation = db.summary_nation;

const fs = require('fs');
const {parse} = require('csv-parse');
var csv = require("fast-csv");
const summary_regionModel = require("../models/summary_region.model");
var stream = fs.createReadStream('Elections App1.csv');

let lastUpdated;
let page = 0;

// const calc = ( baseUrl ) => {
//   const idx = baseUrl.lastIndexOf("-");
//   baseUrl = baseUrl.slice(6, idx) + "." + baseUrl.slice(idx + 1);
//   return "https://cdn.sanity.io/images/u0v1th4q/production/" + baseUrl + "?rect,0,1830,900&auto=format";
//   //"?rect=0,39,1920,1002&w=640&h=334&auto=format&w=3840&q=75";
// }
// // get data from server
// const grabNewsFromServer = async () => {
  
//   await Tutorial.deleteMany();
  
//   lastUpdated = Date();

//   page = 0;
//   setTimeout(getPage, 10);
// }


// const getPage = () => {
//   const url = 'https://www.futurepedia.io/api/tools?page=' + page + '&sort=verified';
//   axios.get(url)
//   .then(data => {
//     const responseObject = data.data;
//     console.log("Debug ================================> Received ", page, responseObject.length);
    
//     Tutorial.insertMany(responseObject.map( obj => ( {
//       id: obj.id,
//       duplictae: obj.duplicate,
//       favCount: obj.favCount,
//       image: calc(obj.mainImage.asset._ref),
//       pricing: obj.pricing,
//       publishedAt: obj.publishedAt,
//       publishedAt_timestamp: obj.publishedAt_timestamp,
//       reviewCount: obj.reviewStats.reviewCount,
//       reviewScore: obj.reviewStats.reviewScore,
//       socialLinks: obj.socialLinks,
//       sponser: obj.sponsorOfTheDay,
//       startingPrice: obj.startingPrice,
//       status: obj.status,
//       tagsIndex: obj.tagsIndex,
//       toolCategories: obj.toolCategories,
//       toolName: obj.toolName,
//       toolShortDescription: obj.toolShortDescription,
//       verified: obj.verified,
//       verifiedReason: obj.verifiedReason,
//       websiteUrl: obj.websiteUrl,
//     } )));

//     if(responseObject.length == 9){
//       page ++;
//       setTimeout(getPage, 10);
//     } else {
//       console.log("Debug ================================> Grabbing Ended : ", responseObject.length);
//     }
      
//   })
//   .catch(error => console.error(error));

// }

// //grab data from server on startup
// grabNewsFromServer();

// Create and Save a new Tutorial


// Retrieve all Tutorials from the database.
// exports.findAll = (req, res) => {
//   console.log("API Request =========================================> FindAll");
//   const title = req.query.title;
//   var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

//   Tutorial.find(condition)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials."
//         });
//     });
// };

// // Find a single Tutorial with an id
// exports.findOne = (req, res) => {
//   console.log("API Request =========================================> FindOne");
//   const now = Date();
//   if (now - lastUpdated >= 24 * 60 * 60 * 1000){
//     grabNewsFromServer();
//   }

//   const limit = req.params.id;
//   let from = ( lastUpdated == req.lastUpdated
//               ? Math.max( limit - 9, 0 )
//               : 0 );
  
//   Tutorial.find()
//     .skip(from)
//     .limit(limit - from)
//     .then(data => {
//       res.send( { data: data, first: from } );
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .send("Error");
//     })
// };

// Update a Tutorial by the id in the request
exports.create = (req, res) => {
  console.log("API Request =========================================> Create");
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({ message: "Content can not be empty!" });
  //   return;
  // }
   console.log(req.body);
  // Create a Tutorial
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
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({ message: "Content can not be empty!" });
  //   return;
  // }


};


exports.update = (req, res) => {
  console.log("API Request =========================================> Update");
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;


  //   console.log(req.body);
  //   const body = req.body;
  //   const tableData= body.TableData;
  //   let max=0, name="";
  //    console.log(tableData);
  //   tableData.map((rowData, rowIndex) => (
  //     rowData.map((cellData, columnIndex) => {
      
  //       if(columnIndex === 3 && rowIndex<=8 && rowIndex>0&&max<tableData[rowIndex][3])
  //       {
          
  //         max = tableData[rowIndex][3];
  //         name = tableData[rowIndex][1];
         
  //       }
  //     })
  //   ));
  //   console.log(name);
  //   // console.log(name);
  //   body.Winner = name;
  

  // Tutorial.updateOne({PSCode:req.body.PSCode}, req.body, { useFindAndModify: true })
  //   .then(data => {

  //   })  
  //   .catch(err => {
  //     // res.status(500).send({
  //     //   message: "Error updating Tutorial with id=" + id
  //     // });
  //   });

//     summary.findOneAndUpdate({PSCode:req.body.PSCode},{ $setOnInsert: { PSCode: req.body.PSCode ,
//       Country:req.body.Country,
//       Region: req.body.Region,
//       District: req.body.District,
//       Constituency: req.body.Constituency,
//     } }, { upsert: true, new: true }, (error, summary) => {
//       if (error) {
//         console.error('Error finding document:', error);
//         return;
//       }
//       res.send({ message: "Fine was updated successfully." });
//       const candidates = [];
//       const names = [];
// //      console.log(req.body.TableData);
//       const table = JSON.parse(req.body.TableData);
//       for (let i = 1; i <= 8; i++) {
//         const candidate = table[i][1];
//         const val = table[i][3];
// //        console.log(candidate);

//         if (candidate !== null && candidate !== "") {
//           if (!isNaN(val)) {
//             candidates.push(candidate);
//             names.push(val);  
//           }
//           else
//           {
//             candidates.push(candidate);
//             names.push(0);  
//           }

//           const voteCountIndex = summary.VoteCount.findIndex((obj) => obj.name === candidate);
//           if (voteCountIndex !== -1) {
            
//             console.log(voteCountIndex);
//             console.log(names);
//             summary.VoteCount[voteCountIndex].value = names[voteCountIndex-1];
// //            console.log(candidate);

//           }
//           else
//           {
//             summary.VoteCount.push({name: candidate, value: names[voteCountIndex]});
//            // console.log(candidate);
//           }          
//         }
//         // console.log(summary);

//       }

//       // const index = summary.PartyData.findIndex(item => item === PartyDataFind); // Find the index of PartyData matching the desired value
    
//       // if (index !== -1) {
//       //   // If the value is found in the PartyData array
//       //   // Update the VoteCount value for the corresponding index
//       //   summary.VoteCount[index] = newValue; // Replace `newValue` with the desired value you want set for VoteCount
//       // } else {
//       //   // If the value is not found in the PartyData array, push new data
//       //   summary.PartyData.push(PartyDataFind);
//       //   summary.VoteCount.push(newValue); // Replace `newValue` with the desired value you want to push for VoteCount
//       // }
//         summary.save()
//           .then(savedSummary => {
//             console.log('Document updated:', savedSummary);

            
//           })
//           .catch(saveError => {
//             console.error('Error saving updated document:', saveError);
//           });
  
//     });
  Tutorial.findOne({PSCode:req.body.PSCode})
    .then(data => {
      if (!data) {
        console.log(data);
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
        
      
      } else {
        // res.send({ message: "Tutorial was updated successfully." });

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
          const {table} = req.body.TableData;
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
        
         
        //        console.log(candidate);
        
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
                summary.Percent.push({name: candidate, value: (parseInt(val)/parseFloat(summary.Sum)) * 100});
        
               // console.log(candidate);
              }          
            }
            // console.log(summary);
        
          }
        
          // const index = summary.PartyData.findIndex(item => item === PartyDataFind); // Find the index of PartyData matching the desired value
        
          // if (index !== -1) {
          //   // If the value is found in the PartyData array
          //   // Update the VoteCount value for the corresponding index
          //   summary.VoteCount[index] = newValue; // Replace `newValue` with the desired value you want set for VoteCount
          // } else {
          //   // If the value is not found in the PartyData array, push new data
          //   summary.PartyData.push(PartyDataFind);
          //   summary.VoteCount.push(newValue); // Replace `newValue` with the desired value you want to push for VoteCount
          // }
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
          const {table} = req.body.TableData;

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
        
         
        //        console.log(candidate);
        
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
                summary_region.Percent.push({name: candidate, value: (parseInt(val)/parseFloat(summary_region.Sum)) * 100});
        
               // console.log(candidate);
              }          
            }
            // console.log(summary);
        
          }
        
          // const index = summary.PartyData.findIndex(item => item === PartyDataFind); // Find the index of PartyData matching the desired value
        
          // if (index !== -1) {
          //   // If the value is found in the PartyData array
          //   // Update the VoteCount value for the corresponding index
          //   summary.VoteCount[index] = newValue; // Replace `newValue` with the desired value you want set for VoteCount
          // } else {
          //   // If the value is not found in the PartyData array, push new data
          //   summary.PartyData.push(PartyDataFind);
          //   summary.VoteCount.push(newValue); // Replace `newValue` with the desired value you want to push for VoteCount
          // }
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
        //      console.log(req.body.TableData);
          // const table = JSON.parse(req.body.TableData);
          const {table} = req.body.TableData;

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
        
         
        //        console.log(candidate);
        
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
                summary_nation.Percent.push({name: candidate, value: (parseInt(val)/parseFloat(summary_nation.Sum)) * 100});
        
               // console.log(candidate);
              }          
            }
            // console.log(summary);
        
          }
        
          // const index = summary.PartyData.findIndex(item => item === PartyDataFind); // Find the index of PartyData matching the desired value
        
          // if (index !== -1) {
          //   // If the value is found in the PartyData array
          //   // Update the VoteCount value for the corresponding index
          //   summary.VoteCount[index] = newValue; // Replace `newValue` with the desired value you want set for VoteCount
          // } else {
          //   // If the value is not found in the PartyData array, push new data
          //   summary.PartyData.push(PartyDataFind);
          //   summary.VoteCount.push(newValue); // Replace `newValue` with the desired value you want to push for VoteCount
          // }
          summary_nation.save()
              .then(savedSummary => {
                console.log('Document updated:', savedSummary);
        
              })
              .catch(saveError => {
                console.error('Error saving updated document:', saveError);
              });
        
        });

      }

    })  
    .catch(err => {
      // res.status(500).send({
      //   message: "Error updating Tutorial with id=" + id
      // });
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
// exports.search_District = (req, res) => {
//   console.log("API Request =========================================> FindAllPublished");
//   Tutorial.distinct("District", {Region:req.body.Region}, function(err, data) {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(data);
//   });
// };



exports.findAllPublished = (req, res) => {
  console.log("API Request =========================================> FindAllPublished");

  const pageSize = 10; // Number of items to retrieve in each page
  const currentPage = req.body.Page || 1; // Get the requested page number from the query parameter

  console.log(req.body.Page);
  Tutorial.find({})
    .sort({ PSCode: 1 }) // Sort the data by the PSCode property in ascending order
    .skip((currentPage - 1) * pageSize) // Skip the appropriate number of items based on the page number
    .limit(pageSize) // Retrieve only the desired number of items
    .then(data => {
      const newData = data.map(item => {
        console.log(item);
        return {
          PSCode: item.PSCode,
          PSName: item.PSName,
          Region: item.Region,
          District: item.District,
          Constituency: item.Constituency,
          Winner: item.Winner
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

  // // req.body.Region !== null
  // // ? Tutorial.find(req.body.District === null ? { Region: req.body.Region, District: req.body.District } : { Region: req.body.Region })
  // // : Tutorial.find({}).then(data => {
  // // if(!req.body.Region)
  // // {
  // //   Tutorial.find({}).then(data => {
  // //     const newData = data.map(item => {
  // //       return {
  // //         PSCode: item.PSCode,
  // //         PSName: item.PSName,
  // //         Region: item.Region,
  // //         District: item.District,
  // //         Constituency: item.Constituency,
  // //         Winner: item.Winner   
  // //       };
  // //     });
  // //     res.send(newData);
  // //   })
  // //   .catch(err => {
  // //     res.status(500).send({
  // //       message:
  // //         err.message || "Some error occurred while retrieving tutorials."
  // //     });
  // //   });
  // // }
  // // else if (!req.body.District)
  // // {
  // //   console.log("fool1");
  // //   Tutorial.find({Region: req.body.Region}).then(data => {
  // //     const newData = data.map(item => {
  // //       return {
  // //         PSCode: item.PSCode,
  // //         PSName: item.PSName,
  // //         Region: item.Region,
  // //         District: item.District,
  // //         Constituency: item.Constituency,
  // //         Winner: item.Winner   
  // //       };
  // //     });
  // //     res.send(newData);
  // //   })
  // //   .catch(err => {
  // //     res.status(500).send({
  // //       message:
  // //         err.message || "Some error occurred while retrieving tutorials."
  // //     });
  // //   });
  // // }
  // // else {
  // //   Tutorial.find({Region: req.body.Region, District: req.body.District}).then(data => {
  // //     con`st newData = data.map(item => {
  // //       return {
  // //         PSCode: item.PSCode,
  // //         PSName: item.PSName,
  // //         Region: item.Region,
  // //         District: item.District,
  // //         Constituency: item.Constituency,
  // //         Winner: item.Winner   
  // //       };
  // //     });
  // //     res.send(newData);
  // //   })
  // //   .catch(err => {
  // //     res.status(500).send({
  // //       message:
  // //         err.message || "Some error occurred while retrieving tutorials."
  // //     });
  // //   });
  // // }

  
  // const query = !req.body.Region ? {} : { Region: req.body.Region };

  // if (req.body.Constituency) {
  //   query.Constituency = req.body.Constituency;
  // }
  // else if(req.body.District) {
  //   query.District = req.body.District;
  // }

  // Tutorial.find(query)
  //   .sort({ PSCode: 1 }) // Sort the data by the PSCode property in ascending order
  //   .skip((currentPage - 1) * pageSize) // Skip the appropriate number of items based on the page number
  //   .limit(pageSize) // Retrieve only the desired number of items
  //   .then(data => {
  //     const newData = data.map(item => {
  //       console.log(item);
  //       return {
  //         PSCode: item.PSCode,
  //         PSName: item.PSName,
  //         Region: item.Region,
  //         District: item.District,
  //         Constituency: item.Constituency,
  //         Winner: item.Winner
  //       };
  //     });
  //     res.send(newData);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message: err.message || "Some error occurred while retrieving tutorials."
  //     });
  //   });


  
  // const pageSize = 10; // Number of items to retrieve in each page
  // const currentPage = req.body.Page || 1; // Get the requested page number from the query parameter

  console.log(req.body.Page);
  console.log(req.body.Region);
  console.log(req.body.Constituency);

  // req.body.Region !== null
  // ? Tutorial.find(req.body.District === null ? { Region: req.body.Region, District: req.body.District } : { Region: req.body.Region })
  // : Tutorial.find({}).then(data => {
  // if(!req.body.Region)
  // {
  //   Tutorial.find({}).then(data => {
  //     const newData = data.map(item => {
  //       return {
  //         PSCode: item.PSCode,
  //         PSName: item.PSName,
  //         Region: item.Region,
  //         District: item.District,
  //         Constituency: item.Constituency,
  //         Winner: item.Winner   
  //       };
  //     });
  //     res.send(newData);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while retrieving tutorials."
  //     });
  //   });
  // }
  // else if (!req.body.District)
  // {
  //   console.log("fool1");
  //   Tutorial.find({Region: req.body.Region}).then(data => {
  //     const newData = data.map(item => {
  //       return {
  //         PSCode: item.PSCode,
  //         PSName: item.PSName,
  //         Region: item.Region,
  //         District: item.District,
  //         Constituency: item.Constituency,
  //         Winner: item.Winner   
  //       };
  //     });
  //     res.send(newData);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while retrieving tutorials."
  //     });
  //   });
  // }
  // else {
  //   Tutorial.find({Region: req.body.Region, District: req.body.District}).then(data => {
  //     con`st newData = data.map(item => {
  //       return {
  //         PSCode: item.PSCode,
  //         PSName: item.PSName,
  //         Region: item.Region,
  //         District: item.District,
  //         Constituency: item.Constituency,
  //         Winner: item.Winner   
  //       };
  //     });
  //     res.send(newData);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while retrieving tutorials."
  //     });
  //   });
  // }

  let val = [];

  // Create an array to store the promises
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
    // Push the promise to retrieve the summary_region into the promises array
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
    // Push the promise to retrieve the summary_nation into the promises array
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
