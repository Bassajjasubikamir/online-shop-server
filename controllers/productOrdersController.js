const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Getting users
async function getAllProductOrders(req, res) {
  const productOrders = await prisma.productOrder.findMany();
  res.send(productOrders);
}

async function getOneProductOrder(req, res) {
    const productOrders = await prisma.productOrder.findMany();
    res.send(productOrders);
  }

  async function createProductOrder(req, res) {
    try {
      const id = parseInt(req.params.id);
      const userExists = await prisma.user.findUnique({
        where: { id },
      });
  
      if (!userExists) {
        return res.status(404).json({ error: "Record does't exist" });
      }
      return res.status(200).json({ data: userExists });
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: 400, error: `${error.message}` });
    }
  }
  
  async function createProductOrder(req, res) {
    try {
      // console.log(req.body)
      const { productId, quantity, userId } = req.body;
      //check data is valid
      if ( !productId|| !quantity || !userId) {
        return res
          .status(400)
          .json({ status: 400, msg: "Missing or empty fields" });
      }
      //check if user exists
      
  
      //save to database
      const newproductOrder = await prisma.productOrder.create({
        data: {
          productId: +productId,
          quantity: +quantity ,
          userId: +userId,
        },
      });
      res.status(201).json({ message: "Registered successfully", newproductOrder });
    } catch (err) {
      console.log(err);
      res.status(400).json({ status: 400, error: `${err.message}` });
    }
  }

  async function updateProductOrder(req, res) {
    const productOrders= await prisma.productOrder.findMany();
    res.send(productOrders);
  }

  async function deleteProductOrder(req, res) {
    const users = await prisma.user.findMany();
    res.send(users);
  }

  module.exports = {
    getAllProductOrders,
    getOneProductOrder,
    createProductOrder,
    updateProductOrder,
    deleteProductOrder,
  };