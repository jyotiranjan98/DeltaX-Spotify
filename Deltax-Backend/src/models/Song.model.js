const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dateOfRelease: { type: String, required: true },
    cover: { type: String, required: true },
    ratings: { type: Object, default: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } },
    artistId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "artist",
        required: true,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("song", SongSchema);
