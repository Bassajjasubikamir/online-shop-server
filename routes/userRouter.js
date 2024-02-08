const express = require("express");
const {getAllUsers, getOneUser, createUser, updateUser, deleteUser} = require("../controllers/userController");


const router = express.Router()

router.get('/',  getAllUsers )
router.post('/', createUser)
router.get('/:id',  getOneUser)
router.put('/:id',  updateUser)
router.delete('/:id', deleteUser)




module.exports = router;