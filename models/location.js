const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    name: String,
    dates: [String]
});

const Location = mongoose.model('location', LocationSchema);

module.exports = Location;