const express = require("express");
const router = express.Router();
const Artist = require("../models/Artist.model.js");
const Song = require("../models/Song.model.js");

router.post("/addartist", async (req, res, next) => {
  try {
    const artist = await Artist.create(req.body);
    return res.status(201).send(artist);
  } catch (err) {
    return res.status(500).send({ "error:": err.message });
  }
});

router.get("", async (req, res, next) => {
  try {
    const artists = await Artist.find().limit(10).lean().exec();
    const artistsWithSongs = await Promise.all(
      artists.map(async (artist) => ({
        ...artist,
        songs: await Song.find({ artistId: artist._id }).lean().exec(),
      }))
    );
    return res.status(201).send(artistsWithSongs);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ "error:": err.message });
  }
});

module.exports = router;
