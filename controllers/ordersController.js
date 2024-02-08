const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Getting users
async function getAllOrders(req, res) {
  const orders = await prisma.order.findMany();
  res.send(orders);
}

async function getOneOrder(req, res) {
  try {
    const id = parseInt(req.params.id);
    const orderExists = await prisma.order.findUnique({
      where: { id },
    });

    if (!orderExists) {
      return res.status(404).json({ error: "Record does't exist" });
    }
    return res.status(200).json({ data: orderExists });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 400, error: `${error.message}` });
  }
  }

  async function createOrder(req, res) {
    try {
        // console.log(req.body)
        const { name, price, number,} = req.body;
        //check data is valid
        if (!name || !price || !number) {
          return res
            .status(400)
            .json({ status: 400, msg: "Missing or empty fields" });
        }
        //check if user exists
        const orderExists = await prisma.order.findUnique({ where: { name } });
    
        if (orderExists) {
          return res
            .status(400)
            .json({ status: 400, msg: "Record already exists" });
        }
        //save to database
        const newOrder = await prisma.order.create({
          data: {
            name: name.trim(),
            price: price.trim(),
            number: number.trim(),           
          },
        });
        res.status(201).json({ message: "Registered successfully", newOrder });
      } catch (err) {
        console.log(err);
        res.status(400).json({ status: 400, error: `${err.message}` });
      }
  }

  async function updateOrder(req, res) {
    try {
      const id = parseInt(req.params.id);
      const orderExists = await prisma.order.findUnique({ where: { id } });
  
      if (!orderExists) {
        return res.status(404).json({ error: "Record doesn't exist" });
      }
      const updateOrder = await prisma.order.update({
        where: { id },
        data: req.body,
      });
      return res
        .status(200)
        .json({ status: 200, msg: "Record updated", data: updateOrder });
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: 400, error: `${error.message}` });
    }
  }

  async function deleteOrder(req, res) {
    try {
      const id = parseInt(req.params.id);
      const orderExists = await prisma.order.findUnique({ where: { id } });
  
      if (!orderExists) {
        return res.status(404).json({ error: "Record doesn't exist" });
      }
      await prisma.order.delete({
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


  module.exports = {
    getAllOrders,
    getOneOrder,
    createOrder,
    updateOrder,
    deleteOrder,
  };
