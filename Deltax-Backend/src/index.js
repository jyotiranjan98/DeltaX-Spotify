const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");

app.use(cors());

const songController = require("./controllers/Song.controller.js");
const artistController = require("./controllers/Artist.controller.js");
const userController = require("./controllers/User.controller.js")

app.use("/songs", songController);
app.use("/artists", artistController);
app.use("/user", userController);

module.exports = app;
