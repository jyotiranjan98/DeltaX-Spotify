const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    `mongodb+srv://jyotiranjan98:jyotiranjan-123@cluster0.wbp776z.mongodb.net/?retryWrites=true&w=majority`
  );
};

module.exports = connect;
