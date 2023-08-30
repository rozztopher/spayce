const RaritySchema = new mongoose.Schema(
    {
        rarity_id: String,
        name: String,
        colour: String,
        probability: {
            type: Number,
            min: 0,
            max:1
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Rarity", RaritySchema);
