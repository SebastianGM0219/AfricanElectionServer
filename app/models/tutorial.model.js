const { ObjectId } = require('mongoose');

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      PSCode: String,
      PSName: String,
      Region: String,
      District: String,
      Constituency: String,
      Winner: String,
      TableData2: [[String]],
    },
    { timestamps: true }
  );

  const Tutorial = mongoose.model("tutorial", schema);
  return Tutorial;
};
