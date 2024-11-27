const express = require('express');
const {getUsers, signupUser, loginUser, createUser, updateUser, deleteUser, updateRole} = require('../controllers/userController.js');
const {authorize} = require('../middleware/authorize.js');

const router = express.Router();

// signup and login routes
router.post('/signup', signupUser);
router.post('/login', loginUser);

// crud operations routes
router.get('/', authorize(['Admin', 'Editor', 'Viewer']), getUsers);
router.post('/', authorize(['Admin']), createUser);
router.put('/:id', authorize(['Admin', 'Editor']), updateUser);
router.delete('/:id', authorize(['Admin']), deleteUser);
router.put('/:id/role', authorize(['Admin']), updateRole);

module.exports = router;