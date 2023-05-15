const mongoose = require('mongoose');
const { user_schema } = require('../schema');
const Schema = mongoose.Schema

const users = new Schema(user_schema, { collection: "users" })
const UserData = mongoose.model('User', users)

module.exports = { UserData }
