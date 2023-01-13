const mongoose = require('mongoose');
const {Schema}  = mongoose;

const borrowedMoney = new Schema({
    by: {type: String},
    from : {type: String},
    amount : {type : Number},
})

const Borrowed = mongoose.model('borrowed', borrowedMoney);

module.exports = {Borrowed};