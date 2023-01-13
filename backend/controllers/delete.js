const {transaction} = require('../models/transaction.model')
const jwt = require("jsonwebtoken");

const delete_transaction =  async (req, res) => {
    
    const {trans} = await req.body
    
    console.log(trans)

    transaction.findByIdAndDelete({_id: trans.id}).then((i) =>{
        console.log('Data Deleted')
        return res.status(200).json({msg: 'success'})
    })
    return res.status(400) 
    
}

module.exports = {delete_transaction}