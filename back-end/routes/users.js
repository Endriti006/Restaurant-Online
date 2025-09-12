const express = require('express');
const router = express.Router();
const { addUser, loginUser, getUserById, getAllUsers, editUser, deleteUser, getAllClients, getAllAdmins } = require('../controllers/UsersController');

router.post('/create/', addUser);
router.post('/login/', loginUser);
router.get('/id/:id', getUserById);
router.get('/all/', getAllUsers); 
router.put('/edit/:id', editUser); 
router.delete('/delete/:id', deleteUser);
router.get('/getclients/', getAllClients)
router.get('/getadmins/', getAllAdmins)

module.exports = router;