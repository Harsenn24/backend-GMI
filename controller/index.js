const bcrypt = require("bcryptjs");
const { UserData } = require("../model");
const jwt = require("jsonwebtoken");

class User {
  static async register(req, res) {
    try {
      let { email, password } = req.body;

      let hash_pass = bcrypt.hashSync(password, 12);

      let input_data = {
        email,
        password: hash_pass,
      };

      await UserData.insertMany(input_data);

      res.status(201).json("Register Success");
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async login(req, res) {
    try {
      let { email, password } = req.body;

      let hash_pass = bcrypt.hashSync(password, 12);

      const find_user = await UserData.aggregate([
        {
          $match: {
            email,
          },
        },
        {
          $project: {
            password: "$password",
          },
        },
      ]);

      if (find_user.length === 0) {
        throw "Email is not valid";
      }

      const decrypt_pass = bcrypt.compareSync(password, find_user[0].password);

      if (decrypt_pass === false) {
        throw "password is not correct";
      }

      const payload = {
        email,
      };

      const token = jwt.sign(payload, process.env.KEY);

      res.status(201).json({
        token,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async get_user(req, res) {
    try {
      const all_user = await UserData.aggregate([
        {
          $project: {
            email: "$email",
          },
        },
      ]);

      res.status(200).json(all_user);
    } catch (error) {}
  }
}

module.exports = { User };
