const {transaction} = require('../models/transaction.model')
const User = require('../models/user.model')
const {Borrowed} = require('../models/Borrowed.model')

const jwt = require("jsonwebtoken");

const update_transaction =  async (req, res) => {
    
    const {trans} = await req.body
    console.log(req.cookies.auth)
    const {user_id, user_name} = jwt.verify(req.cookies.auth, 'process.env.TOKEN_KEY');
    const tran = await transaction.findOne({_id : trans.id})
    const no = tran.from.length
    tran.from.forEach(element => {
        if( element == 'Me')
        {    
            element = user_name
        }
    User.findOneAndUpdate({Username : element}, [{$set : {"balance" : {$sum : ["$balance", (tran.amount / no)]}}}], (success, error) => {
            success ? console.log(success) : console.log(error)
        })
    Borrowed.updateOne({from : element, by : tran.to}, [{$set : {"amount" : {$subtract : ["$amount", (tran.amount / no)]}}}], (success, error) => {
            success ? console.log(success) : console.log(error)
        })
    Borrowed.updateOne({by : element, from : tran.to}, [{$set : {"amount" : {$sum : ["$amount", (tran.amount) / no]}}}], (success, error) => {
            success ? console.log(success) : console.log(error)
        })
    })
    User.updateOne({Username: tran.to}, [{$set : {"balance" : {$subtract : ["$balance", (tran.amount)]}}}], (success, error) => {
        success ? console.log(success) : console.log(error)
    })
    transaction.findOneAndUpdate({_id: trans.id},{
        Username : user_id, 
        to :trans.to, 
        from :trans.from, 
        description :trans.description, 
        amount :trans.amount, 
        date :trans.date,  
    }).then((i) =>{
        const no = trans.from.length
    trans.from.forEach(element => {
        if( element == 'Me')
        {    
            element = user_name
        }
    User.findOneAndUpdate({Username : element}, [{$set : {"balance" : {$subtract : ["$balance", (trans.amount / no)]}}}], (success, error) => {
            success ? console.log(success) : console.log(error)
        })
    Borrowed.updateOne({from : element, by : trans.to}, [{$set : {"amount" : {$sum : ["$amount", (trans.amount / no)]}}}], (success, error) => {
            success ? console.log(success) : console.log(error)
        })
    Borrowed.updateOne({by : element, from : trans.to}, [{$set : {"amount" : {$subtract : ["$amount", (trans.amount) / no]}}}], (success, error) => {
            success ? console.log(success) : console.log(error)
        })
    })
    User.updateOne({Username: trans.to}, [{$set : {"balance" : {$sum : ["$balance", (trans.amount)]}}}], (success, error) => {
        success ? console.log(success) : console.log(error)
    })
        console.log('Data updated', i)
    return res.status(200).json({msg: 'success'})
    })
    return res.status(400) 
    
}

module.exports = {update_transaction}