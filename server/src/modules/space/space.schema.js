const SpaceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: 'New Spayce'
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        thumbnail: {
            type: String,
            default: ''
        },
        architecture: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },
        frames: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },
        interior: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },
        audio: {
            type: String,
            default: null
        },
        views: {
            type: Number,
            default: 0
        },
        likes: {
            type: Number,
            default: 0
        },
        shares: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

// SpaceSchema.pre("findOneAndUpdate", async function (next) {

//     var objId = this.getFilter();
//     var obj = this.getUpdate();

//     let space = await this.findOne({ _id: objId._id });
//     if (!space) {
//         throw createError(400, messages.notFound("Space"));
//     }

//     if (obj.air_slots && space.air_slot_limit && obj.air_slots.length > space.air_slot_limit) {
//         throw createError(400, messages.limitExceeds("Air slot"));
//     }
//     if (obj.wall_slots && space.wall_slot_limit && obj.wall_slots.length > space.wall_slot_limit) {
//         throw createError(400, messages.limitExceeds("Wall slot"));
//     }
//     if (obj.floor_slots && space.floor_slot_limit && obj.floor_slots.length > space.floor_slot_limit) {
//         throw createError(400, messages.limitExceeds("Floor slot"));
//     }
//     if (obj.nft_slots && space.nft_slot_limit && obj.nft_slots.length > space.nft_slot_limit) {
//         throw createError(400, messages.limitExceeds("NFT slot"));
//     }
//     if (obj.viewer_allowance && space.viewer_limit && obj.viewer_allowance < space.viewer_limit) {
//         throw createError(400, messages.limitExceeds("Viewer allowance"));
//     }
//     if (obj.levels && space.levels_limit && obj.levels > space.levels_limit) {
//         throw createError(400, messages.limitExceeds("Levels"));
//     }

//     next();
// });

module.exports = mongoose.model("Space", SpaceSchema);
