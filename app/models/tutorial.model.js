const { ObjectId } = require('mongoose');

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      duplictae: Boolean,
      favCount: Number,
      image: String,
      pricing: Array,
      publishedAt: String,
      publishedAt_timestamp: Number,
      reviewCount: Number,
      reviewScore: Number,
      socialLinks: Array,
      sponser: Boolean,
      startingPrice: String,
      status: String,
      tagsIndex: Array,
      toolCategories: Array,
      toolName: String,
      toolShortDescription: String,
      verified: Boolean,
      verifiedReason: String,
      websiteUrl: String,
    },
    { timestamps: true }
  );

  const Tutorial = mongoose.model("tutorial", schema);
  return Tutorial;
};
