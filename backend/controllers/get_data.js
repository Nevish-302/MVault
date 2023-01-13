const User = require('../models/user.model')
const {transaction} = require('../models/transaction.model')
const jwt = require('jsonwebtoken');
const { Borrowed } = require('../models/Borrowed.model');

const get_transactions = async (req, res) => {
    const {user_id} = jwt.verify(req.cookies.auth, 'process.env.TOKEN_KEY');
    transaction.find({Username : user_id}).then((list) => {
        if(!list) {
            return res.status(400)
        }
        console.log(list)
        return res.status(200).json(list)
    })
}

const get_users = (req, res) => 
{
    User.find({}).then((list) => {
        if(!list) {
            return res.status(400)
        }
        const user_list = list.map(item => item.Username)
        console.log(user_list)
        return res.status(200).json(user_list)
    })
}

const get_amount_left = (req, res) => {
    const {user_name} = jwt.verify(req.cookies.auth, 'process.env.TOKEN_KEY');
    User.find({Username : user_name}).then(person => {
        if(!person)
        {
            return res.status(400)
        }
        console.log("Person", person)
        return res.status(200).json(person[0].balance)
    })
}
const get_borrowed = async (req, res) => {
    const {user_name} = jwt.verify(req.cookies.auth, 'process.env.TOKEN_KEY');
    const givenTo = await Borrowed.find({from : user_name, amount : {$gt : 0}})
    const takenFrom = await Borrowed.find({to : user_name, amount : {$gt : 0}})
    res.status(200).json({owedTo : takenFrom, owedFrom : givenTo})
}
module.exports = {get_transactions, get_users, get_borrowed, get_amount_left}