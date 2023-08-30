const AssetSchema = new mongoose.Schema(
    {
        asset_id: String,
        name: String,
        type: String,
        price: Number,
        rarity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rarity",
        },
        date_from: Date,
        date_to: Date,
        supply: Number,
        src: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("Asset", AssetSchema);
