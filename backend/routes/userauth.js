const express = require('express')
const {add_friends, get_friends} = require('../controllers/friends')
const { get_borrowed } = require('../controllers/get_data')
const {login} = require('../controllers/login_1')
const {logout} = require('../controllers/logout')
const {register} = require('../controllers/register.js')

const router =  express.Router()

router.post('/login/', login);

router.post('/logout/', logout);

router.post('/register/', register);

router.post('/addFriend/', add_friends)

router.get('/getFriends/', get_friends)

router.post('/getBorrowed/', get_borrowed)

module.exports = router