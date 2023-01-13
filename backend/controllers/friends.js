const User = require('../models/user.model')
const {transaction} = require('../models/transaction.model')
const jwt = require('jsonwebtoken')
const { Borrowed } = require('../models/Borrowed.model')

const add_friends = (req, res) => 
{
    const {username} = req.body
    User.findOne({Username: username}).then((list) => {
        if(!list) {
            return res.status(400)
        }
        console.log(list)
        const {user_id, user_name} = jwt.verify(req.cookies.auth, 'process.env.TOKEN_KEY');
        User.findOneAndUpdate({_id: user_id}, {$push : {friends : {Username : username, 
    amount : 0}}}, (error, success) => {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    })

    const part1 = new Borrowed({by: user_name, from : username, amount : 0})
    const part2 = new Borrowed({by: username, from : user_name, amount : 0})
    part1.save().then(item => {
        console.log(`${item} Borrowed`);
      })
      .catch(err => {
        console.log("Couldn't borrow", err);
      });
    part2.save().then(item => {
        console.log(`${item} Borrowed`);
      })
      .catch(err => {
        console.log("Couldn't borrow", err);
      });
        User.findOneAndUpdate({Username: username}, {$push : {friends : {Username: user_name, 
    amount : 0}}},  (error, success) => {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    })
    console.log("Hello Sir")    
        return res.status(200)
    })
}

const get_friends = (req, res) => {
    const {user_id} = jwt.verify(req.cookies.auth, 'process.env.TOKEN_KEY');
    console.log("Hello");
    User.findOne({_id: user_id}).then((user) => {
        if(!user) {
            console.log(user)
            console.log('Hello ++ ')
            return res.status(400).json({msg : "nothing found"})
        }
        console.log(user.friends)
        return res.status(200).json(user.friends)
    })
    console.log(`this didn't work`)
}
module.exports = {add_friends, get_friends}