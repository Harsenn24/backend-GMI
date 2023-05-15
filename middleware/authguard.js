const { ObjectID } = require("bson");
const { UserData } = require("../model/index.js");
const jwt = require("jsonwebtoken");

const authentif = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw { message: "You are not login" };
    }

    const payload = jwt.verify(authorization, process.env.KEY);

    console.log(payload);

    const find_user = await UserData.aggregate([
      {
        $match: {
          email: payload.email,
        },
      },
      {
        $project: {
          email: "$email",
        },
      },
    ]);

    if (find_user.length === 0) {
      throw { message: "You are not login" };
    }

    req.user = {
      email: payload.email,
    };

    next();
  } catch (error) {
    res.status(500).json({ ERROR: error.message });
  }
};

module.exports = {
  authentif,
};
