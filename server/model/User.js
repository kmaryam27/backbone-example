const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: String,
    family: String,
    email: String,
    phone: Number
});
var User = mongoose.model('User', UserSchema);

module.exports = User;
