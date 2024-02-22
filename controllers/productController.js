const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


async function getAllProducts(req, res) {
    const products = await prisma.product.findMany();
    res.send(products);
  }

  async function getOneProduct(req, res) {
    try {
      const id = parseInt(req.params.id);
      const productExists = await prisma.product.findUnique({
        where: { id },
      });
  
      if (!productExists) {
        return res.status(404).json({ error: "Record does't exist" });
      }
      return res.status(200).json({ data: productExists });
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: 400, error: `${error.message}` });
    }
  }

  async function createProduct(req, res) {
    try {
        // console.log(req.body)
        const { name, price, description, categoryId } = req.body;
        //check data is valid
        if (!name || !price || !description || !categoryId) {
          return res
            .status(400)
            .json({ status: 400, msg: "Missing or empty fields" });
        }
        // check if product exists
        const productExists = await prisma.product.findUnique({ where: { name:name } });
    
        if (productExists) {
          return res
            .status(400)
            .json({ status: 400, msg: "Record already exists" });
        }
        //save to database
        // console.log(newProduct)
        const newProduct = await prisma.product.create({
          data: {
            name: name.trim(),
            price: price.trim(),
            description: description.trim(),
            categoryId: Number(categoryId),
            },
        });
        res.status(201).json({ message: "Registered successfully", newProduct });
      } catch (err) {
        console.log(err);
        res.status(400).json({ status: 400, error: `${err.message}` });
      }
  }

  async function updateProduct(req, res) {
    try {
      const id = parseInt(req.params.id);
      const productExists = await prisma.product.findUnique({ where: { id } });
  
      if (!productExists) {
        return res.status(404).json({ error: "Record doesn't exist" });
      }
      const updateProduct = await prisma.product.update({
        where: { id },
        data: req.body,
      });
      return res
        .status(200)
        .json({ status: 200, msg: "Record updated", data: updateProduct });
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: 400, error: `${error.message}` });
    }
  }

  async function deleteProduct(req, res) {
    try {
      const id = parseInt(req.params.id);
      const productExists = await prisma.product.findUnique({ where: { id } });
  
      if (!productExists) {
        return res.status(404).json({ error: "Record doesn't exist" });
      }
      await prisma.product.delete({
        where: { id },
      });
      return res
        .status(200)
        .json({ status: 200, msg: "Record deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: 400, error: `${error.message}` });
    }
  }
module.exports = {getAllProducts,
                 getOneProduct,
                 createProduct,
                 updateProduct,
                 deleteProduct}
