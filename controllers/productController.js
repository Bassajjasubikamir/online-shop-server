const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


async function getAllProducts(req, res) {
    const products = await prisma.product.findMany();
    res.send(products);
  }

  async function getOneProduct(req, res) {
    const products = await prisma.product.findMany();
    res.send(products);
  }

  async function createProduct(req, res) {
    try {
        console.log(req.body)
        const { name, price, description, categoryId, orderId } = req.body;
        //check data is valid
        // if (!name || !price || !description || !categoryId || !orderId ) {
        //   return res
        //     .status(400)
        //     .json({ status: 400, msg: "Missing or empty fields" });
        // }
        //check if product exists
        // const productExists = await prisma.product.findUnique({ where: { name:name } });
    
        // if (productExists) {
        //   return res
        //     .status(400)
        //     .json({ status: 400, msg: "Record already exists" });
        // }
        //save to database
        // console.log(newProduct)
        const newProduct = await prisma.product.create({
          data: {
            name: name.trim(),
            price: price.trim(),
            description: description.trim(),
            categoryId: Number(categoryId),
            orderId: Number(orderId)
            },
        });
        res.status(201).json({ message: "Registered successfully", newProduct });
      } catch (err) {
        console.log(err);
        res.status(400).json({ status: 400, error: `${err.message}` });
      }
  }

  async function updateProduct(req, res) {
    const Products = await prisma.product.findMany();
    res.send(Products);
  }

  async function deleteProduct(req, res) {
    const Products = await prisma.product.findMany();
    res.send(Products);
  }
module.exports = {getAllProducts,
                 getOneProduct,
                 createProduct,
                 updateProduct,
                 deleteProduct}