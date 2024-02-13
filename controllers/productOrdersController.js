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
    const productOrders = await prisma.productOrder.findMany();
    res.send(productOrders);
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