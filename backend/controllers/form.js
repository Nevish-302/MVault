const {transaction} = require('../models/transaction.model')
const User = require('../models/user.model')
const jwt = require("jsonwebtoken");
const { findOneAndUpdate } = require('../models/user.model');
const { Borrowed } = require('../models/Borrowed.model');

const add_transaction =  async (req, res) => {
    
    const {tran} = await req.body
    console.log(req.cookies.auth)
    const {user_id, user_name} = jwt.verify(req.cookies.auth, 'process.env.TOKEN_KEY');
    const trans = new transaction({
        Username : user_name, 
        to :tran.to, 
        from :tran.from, 
        description :tran.description, 
        amount :tran.amount, 
        date :tran.date,  
    })
    const no = tran.from.length
    tran.from.forEach(element => {
        if( element == 'Me')
        {    
            element = user_name
        }
    User.findOneAndUpdate({Username : element}, [{$set : {"balance" : {$subtract : ["$balance", (tran.amount / no)]}}}], (success, error) => {
            success ? console.log(success) : console.log(error)
        })
    Borrowed.updateOne({from : element, by : tran.to}, [{$set : {"amount" : {$sum : ["$amount", (tran.amount / no)]}}}], (success, error) => {
            success ? console.log(success) : console.log(error)
        })
    Borrowed.updateOne({by : element, from : tran.to}, [{$set : {"amount" : {$subtract : ["$amount", (tran.amount) / no]}}}], (success, error) => {
            success ? console.log(success) : console.log(error)
        })
    })
    User.updateOne({Username: tran.to}, [{$set : {"balance" : {$sum : ["$balance", (tran.amount)]}}}], (success, error) => {
        success ? console.log(success) : console.log(error)
    })
    trans.save().then((item) => {
        console.log(`${item} has been saved successfully`)
    }).catch(err => {
       console.log(`unable to save the data`, err);
        
    })
    res.status(200).json({msg: 'success'})
}

module.exports = {add_transaction}