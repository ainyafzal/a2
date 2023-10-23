const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// YOU CAN ADD YOUR OWN SCHEMA HERE
let Category = new Schema({
    name: { type: String}
})

module.exports = mongoose.model('Category', Category);
