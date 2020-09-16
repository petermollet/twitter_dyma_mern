const express = require('express');
const api = express.Router();


api.get('/user', (req, res) => {
    res.json([{ name: 'jean' }]);
})

module.exports = api;