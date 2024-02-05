const { ObjectId } = require('mongoose');

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      Candiate: { type: String, default: null },
      PartyInital: { type: String, default: null },
    },
    { timestamps: true }
  );

  const CandidateNames = mongoose.model("candidate_names", schema);
  return CandidateNames;
};
