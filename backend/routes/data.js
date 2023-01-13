const express = require('express')
const {add_transaction} = require('../controllers/form.js')
const {get_users, get_transactions, get_amount_left} = require('../controllers/get_data')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const  {update_transaction} = require('../controllers/update')
const {delete_transaction} = require('../controllers/delete')

router.post('/get', verifyToken, get_transactions);

router.post('/add',verifyToken, add_transaction)

router.post('/update',verifyToken, update_transaction)

router.post('/delete', verifyToken, delete_transaction)

router.post('/all_users', verifyToken, get_users)

router.post('/get_balance', verifyToken, get_amount_left)

module.exports = router