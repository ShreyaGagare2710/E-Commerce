const express = require('express');
const router = express.Router();
const userController = require('../Controllers/usercontroller');
const auth = require('../Middleware/auth');

router.post('/register', userController.register),
router.post('/login', userController.login ),
router.get('/:id',userController.getUser),
router.put('/id',userController.updateUser),
router.delete('/delete',userController.deleteUser)


module.exports = router