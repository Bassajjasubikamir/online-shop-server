const express = require("express");
const {getAllProducts , getOneProduct, createProduct, updateProduct, deleteProduct} = require("../controllers/productController");


const router = express.Router()

router.get('/',  getAllProducts )                    
router.post('/', createProduct)
router.get('/:id',  getOneProduct)
router.put('/:id',  updateProduct)
router.delete('/:id',deleteProduct)




module.exports = router;