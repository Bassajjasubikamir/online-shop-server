const express = require("express");
const {getAllOrders,  getOneOrder, createOrder, updateOrder, deleteOrder} = require("../controllers/ordersController");


const router = express.Router()

router.get('/',  getAllOrders )
router.post('/',  createOrder)
router.get('/:id',   getOneOrder)
router.put('/:id',  updateOrder)
router.delete('/:id', deleteOrder)




module.exports = router;