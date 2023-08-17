const { ObjectId } = require('mongoose');

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      PSCode: { type: String, default: null },
      Country: { type: String, default: null },
      Region: { type: String, default: null },
      District: { type: String, default: null },
      Constituency: { type: String, default: null },
      CandiDate: { type: [String], default: null },
      PartyData: { type: [{name:String, value: String}], default: null },
      VoteCount: { type: [{name:String, value: Number}], default: null },
      Percent: { type: [{name:String, value: Number}], default: null },
      Sum: {type: Number, default: 0},
    },
    { timestamps: true }
  );

  const summary_model = mongoose.model("summary_model", schema);
  return summary_model;
};
