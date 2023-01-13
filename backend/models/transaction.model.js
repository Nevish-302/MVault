const mongoose = require('mongoose');
const {Schema}  = mongoose;

const Transaction = new Schema({
    Username: {type: String},
    to: { type: String},
    from : {type: Array},
    description : {type : String},
    amount : {type : Number},
    date : {type : Date},
    
})

const transaction = mongoose.model('transaction', Transaction);

module.exports = {transaction};