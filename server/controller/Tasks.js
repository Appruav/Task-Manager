const { default: axios } = require("axios");
const { Tasks } = require("../model/Taskmodel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { users } = require("../model/UserAuth");
const path = require("path");
const bcrypt = require("bcrypt");
const AddTasks = async (req, res) => {
  console.log(req.body);
  const { name, description } = req.body;
  console.log(name, description);
  if (!name || !description) {
    return res.status(404).json("Enter a Valid Name or description");
  }
  await Tasks.create({
    name: name,
    description: description,
    iscompleted: false,
  });
  return res.status(200).json("Task has been created succesfully");
};
const fetchtasks = async (req, res) => {
  try {
    const x = await Tasks.find();
    if (!x) {
      res.status(400).json("Unable to fetch tasks");
    }
    res.status(200).json(x);
  } catch (err) {
    console.log(err);
  }
};
const deletetask = async (req, res) => {
  try {
    console.log("1");
    const { id } = req.body;
    console.log(req.body);
    console.log(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid task ID format" });
    }
    if (!id) {
      return res.status(400).json({ error: "Invalid task ID" });
    }
    const deletedTask = await Tasks.findByIdAndDelete(id);
    console.log(deletedTask);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task has been deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const handlecheck = async (req, res) => {
  try {
    const { id, stake } = req.body;
    console.log(stake);
    const check = await Tasks.findByIdAndUpdate(
      id,
      { $set: { iscompleted: stake } },
      { new: true }
    );
    const data = await Tasks.findById(id);
    console.log(data);
    if (!check) {
      console.log("Error while updating the task");
    }
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  AddTasks,
  fetchtasks,
  deletetask,
  handlecheck,
};
