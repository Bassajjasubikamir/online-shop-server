const express = require("express");
const {getAllCategories, getOneCategory, createCategory, updateCategory, deleteCategory} = require("../controllers/categoriesController");


const router = express.Router()

router.get('/',  getAllCategories )
router.post('/', createCategory)
router.get('/:id', getOneCategory)
router.put('/:id',   updateCategory)
router.delete('/:id', deleteCategory)


module.exports = router;