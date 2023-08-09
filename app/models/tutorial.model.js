const { ObjectId } = require('mongoose');

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      PSCode: { type: String, default: null },
      PSName: { type: String, default: null },
      Region: { type: String, default: null },
      District: { type: String, default: null },
      Constituency: { type: String, default: null },
      Winner: { type: String, default: null },
      TableData2: { type: [[String]], default: null },
      TableData: { type: [[String]], default: null },
      TableData1: { type: [[String]], default: null },
      TableData3: { type: [String], default: null },
      TableData5: { type: [String], default: null },
    },
    { timestamps: true }
  );

  const Tutorial = mongoose.model("tutorial", schema);
  return Tutorial;
};
