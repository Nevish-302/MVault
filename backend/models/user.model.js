const mongoose = require(`mongoose`)
const {Schema}  = mongoose;

const userinfo = new Schema ({
    Username : {
        type: String, 
        required: true,
        unique: true,
        trim: true,         
        minlength:3,
    },
    Email : {
        type : String,
        required : true,
        trim: true,
    },
    passHash : {
        type: String, 
        required: true, 
    },
    balance: {
        type : Number,
        default : 10000,    
    },
    friends: [{
        Username : {type : String},
        amount : {type: Number}
    }],
});

const User = mongoose.model('User', userinfo);

module.exports = User;