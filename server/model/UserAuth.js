const mongooose = require("mongoose");

const taskSchema = new mongooose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});
const users = mongooose.model("Class-Work", taskSchema);
module.exports = { users };
