const express = require('express');
const {getUsers, addUser} = require('../controllers/userController.js');

const router = express.Router();

router.get('/', getUsers);
router.post('/signup', addUser);

module.exports = router;