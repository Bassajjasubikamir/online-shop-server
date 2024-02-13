const express = require("express");
const {getAllUsers, getOneUser, createUser, updateUser, deleteUser, loginUser} = require("../controllers/userController");


const router = express.Router()

router.get('/',  getAllUsers )
router.post('/', createUser)
router.get('/:id',  getOneUser)
router.put('/:id',  updateUser)
router.delete('/:id', deleteUser)
router.post('/login', loginUser)




module.exports = router;