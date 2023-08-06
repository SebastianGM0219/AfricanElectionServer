const { ObjectId } = require('mongoose');

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      PSCode: String,
      Constituency: String,
      District: String,
      PSName: String,
      Region: String,
      Winner: String,
   
    },
    { timestamps: true }
  );

  const Tutorial = mongoose.model("tutorial", schema);
  return Tutorial;
};
