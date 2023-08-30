const NftSchmea = new mongoose.Schema(
  {
    id: Number,
    name: String,
    description: String,
    image: String,
    animation_url: String,
    attributes: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Nft", NftSchmea);
