const express = require("express");
const router = express.Router();
const Song = require("../models/Song.model.js");
const { upload } = require("../middlewares/SongCoverUpload.js");

router.post("/addsong", upload.single("cover"), async (req, res, next) => {
  try {
    const artistId = req.body.artistId.split(","); // create ids array
    const { name, dateOfRelease } = req.body;
    const song = await Song.create({
      name: name,
      dateOfRelease: dateOfRelease,
      cover: req.file.path,
      artistId: artistId,
    });

    return res.status(201).send(song);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ "error:": err.message });
  }
});

router.get("", async (req, res) => {
  try {
    const songs = await Song.find()
      .populate("artistId")
      .sort({ ratings: -1 })
      .limit(10)
      .lean()
      .exec();
    return res.status(201).send(songs);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ "error:": err.message });
  }
});

// router.patch("/addrating", async (req, res) => {
//   try {
//     const { id: song_id, rating } = req.body;
//     switch (rating) {
//       case 1: {
//         await Song.findByIdAndUpdate(song_id, {
//           $inc: { "ratings[1]": 1 },
//         }).exec();
//         break;
//       }
//       case 2: {
//         await Song.findByIdAndUpdate(song_id, {
//           $inc: { "ratings[2]": 1 },
//         }).exec();
//         break;
//       }
//       case 3: {
//         await Song.findByIdAndUpdate(song_id, {
//           $inc: { "ratings[3]": 1 },
//         }).exec();
//         break;
//       }
//       case 4: {
//         await Song.findByIdAndUpdate(song_id, {
//           $inc: { "ratings[4]": 1 },
//         }).exec();
//         break;
//       }
//       case 5: {
//         await Song.findByIdAndUpdate(song_id, {
//           $inc: { "ratings[5]": 1 },
//         }).exec();
//         break;
//       }
//     }

//     return res.status(201).send("rating updated successfuly");
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send({ "error:": err.message });
//   }
// });

module.exports = router;
