const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  iscompleted: {
    type: Boolean,
    default: false,
  },
});
const Tasks = mongoose.model("Tasks", TaskSchema);
module.exports = { Tasks };
