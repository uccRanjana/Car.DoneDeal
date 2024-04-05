import Role from "../Modals/Role.js ";
import User from "../Modals/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";
import nodemailer from "nodemailer";
import UserToken from "../Modals/UserToken.js";
export const register = async (req, res, next) => {
  try {
    const role = await Role.find({ role: "user" });
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashPassword,
      city: req.body.city,
      roles: role,
    });
    await newUser.save();
    return next(CreateSuccess(200, "Registration successfully"));
  } catch (error) {
    return res.status(500).send("Internal server Error!");
  }
};

export const registerAdmin = async (req, res, next) => {
  try {
    const role = await Role.find({});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashPassword,
      city: req.body.city,
      isAdmin: true,
      roles: role,
    });
    await newUser.save();
    return next(CreateSuccess(200, "Admin Registration successfully"));
  } catch (error) {
    return res.status(500).send("Internal server Error!");
  }
};

export const loginApi = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate(
      "roles",
      "role"
    );

    const { roles } = user;
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(404).send("Email and password does not match!!");
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin, roles: roles },
      process.env.JWT_SECRET
    );
    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      status: 200,
      message: "Login Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).send("Internal server Error!");
  }
};

export const sendEmail = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({
    email: { $regex: "^" + email + "$", $options: "i" },
  });
  if (!user) {
    return next(CreateError(404, "User not found to reset the email"));
  }
  const payload = {
    email: user.email,
  };

  const expiryTime = 300;
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiryTime,
  });

  const newToken = new UserToken({
    userId: user._id,
    token: token,
  });

  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ucceshant@gmail.com",
      pass: "nrjx epoh usev zjhn",
    },
  });
  let mailDetails = {
    from: "uccranjana13@gmail.com",
    to: email,
    subject: "Reset Password",
    html: `
        
        <html>
        <head>
            <title> Password Reset Request </title>
        </head>
        <body>
           <h1>Password Reset Request</h1>
           <p>Dear ${user.fullname}, </p>
           <p>We have received a request to reset your account with CarDealer. To complete the password reset process, please click on the button below:</p>
           <a href=${process.env.LIVE_URL}/reset/${token}><button style="background-color: #4caf50; color: white; padding: 14px 20px; border: none; cursor: pointer; border-radius: 4px;"> Reset Password</button></a>
           <p>Please note that this link is only valid for 5 minutes. If you did not request a password reset, please disregard this message.</p>
           <p>Thank you,</p>
           <p>Team CarDealer</p>
           </body>
           </html>    
        `,
  };
  mailTransporter.sendMail(mailDetails, async (err, data) => {
    if (err) {
      console.log(err);
      return next(
        CreateError(500, "something went wrong while sending the email")
      );
    } else {
      await newToken.save();
      return next(CreateSuccess(200, "Email sent Successfully!"));
    }
  });
};

export const resetPassword = (req, res, next) => {
  const token = req.body.token;
  const newPassword = req.body.password;

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return next(CreateError(500, "Reset Link is Expired"));
    } else {
      const response = data;
      const user = await User.findOne({
        email: { $regex: "^" + response.email + "$", $options: "i" },
      });
      const salt = await bcrypt.genSalt(10); // Generate salt
      console.log('New Password:', newPassword);
      console.log('Request Body:', req.body);
      const encryptedPassword = await bcrypt.hash(newPassword, salt);

      user.password = encryptedPassword;
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $set: user },
          { new: true }
        );
        return next(CreateSuccess(200, "Password reset Successfully"));
      } catch (error) {
        return next(
          CreateError(500, "Something went wrong while reseting the password")
        );
      }
    }
  });
};
