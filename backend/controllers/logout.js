const express = require('express')

const logout = (req, res) => {
    
    res.clearCookie("auth");
    console.log('Logout')
    res.status(200);
}

module.exports = {logout}