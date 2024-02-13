const express = require("express");
const {getAllProductOrders, getOneProductOrder, createProductOrder, updateProductOrder, deleteProductOrder} = require("../controllers/productOrdersController");


const router = express.Router()

router.get('/',  getAllProductOrders )
router.post('/', createProductOrder)
router.get('/:id',  getOneProductOrder)
router.put('/:id',  updateProductOrder)
router.delete('/:id', deleteProductOrder)




module.exports = router;