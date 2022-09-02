const app = require("./index");
const connect = require("./configs/db.js");
const Port = process.env.PORT || 5000;

app.listen(Port, async () => {
  try {
    await connect();
    console.log(`Listening on port ${Port}`);
  } catch (err) {
    console.log(err);
  }
});
