const { users } = require("../model/UserAuth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({ message: "Invalid email or password" });
    }
    console.log(email, password);
    const hashedpass = await bcrypt.hash(password, 10);
    await users.create({
      email: email,
      password: hashedpass,
    });
    return res.status(200).json("User has signed up");
  } catch (err) {
    console.log(err);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).json("Invalid email or password");
    }
    const user = await users.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res.status(404).json("User has not been found");
    }
    const checkpass = await bcrypt.compare(password, user.password);
    if (!checkpass) {
      return res.status(200).json("Invalid Password");
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWTKEY);
    console.log(token);
    return res.status(200).json(token);
  } catch (err) {
    console.log(err);
  }
};
const handleforgot = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const user = await users.findOne({ email });
    if (!user) {
      console.log("User does not exists");
      return res.status(404).json({ message: "User does not exists" });
    }
    const secret = process.env.JWTKEY;

    const token = jwt.sign({ email: email, id: user._id }, secret);

    const link = `http://localhost:3000/api/user/reset-password/${user._id}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "appuravjaat370@gmail.com",
        pass: "phid chry lxjt aylk",
      },
    });

    var mailOptions = {
      from: `"Hey Appurav this to help you reseting your password"`,
      to: email,
      subject: "Password Reset",
      text: "Click on the link to reset your password",
      html: `<b>Click on this link to reset your password:<a href="${link}">${link}</a></b>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return res.status(200).json({ message: "User has been found", token });
  } catch (err) {
    console.log(err);
  }
};

const resetpass = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    console.log(password);
    const finduser = await users.findOne({ _id: id });
    if (!finduser) {
      console.log("User has not been found");
    }
    try {
      const encryptedpassword = await bcrypt.hash(password, 10);
      await users.updateOne(
        { _id: id },
        {
          $set: {
            password: encryptedpassword,
          },
        }
      );
      console.log("Password has been updated");
      res.status(200).json("Password has been updated");
    } catch (err) {
      console.log(err);
      return res.send("Password has not been updated");
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = { signup, login, handleforgot, resetpass };
