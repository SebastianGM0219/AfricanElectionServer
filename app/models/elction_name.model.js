const { ObjectId } = require('mongoose');

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      Name: { type: String, default: null },
      Content: { type: String, default: null },
      Date: { type: String, default: null },
      Election_Size: { type: String, default: null },
      Election_type: { type: String, default: null },
      Link: { type: String, default: null },
    },
    { timestamps: true }
  );

  const ElectionNames = mongoose.model("election_tables", schema);
  return ElectionNames;
};
