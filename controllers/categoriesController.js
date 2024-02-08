const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Getting categories
async function getAllCategories(req, res) {
  const categories = await prisma.category.findMany();
  res.send(categories);
}

async function getOneCategory(req, res) {
  try {
    const id = parseInt(req.params.id);
    const categoryExists = await prisma.category.findUnique({
      where: { id },
    });

    if (!categoryExists) {
      return res.status(404).json({ error: "Record does't exist" });
    }
    return res.status(200).json({ data: categoryExists });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 400, error: `${error.message}` });
  }
}

async function createCategory(req, res) {
  try {
    // console.log(req.body)
    const { name } = req.body;
    //check data is valid
    if (!name) {
      return res
        .status(400)
        .json({ status: 400, msg: "Missing or empty fields" });
    }
    //check if category exists
    const categoryExists = await prisma.category.findUnique({
      where: { name },
    });

    if (categoryExists) {
      return res
        .status(400)
        .json({ status: 400, msg: "Record already exists" });
    }
    //save to database
    const newCategory = await prisma.category.create({
      data: {
        name: name.trim(),
      },
    });
    res.status(201).json({ message: "Registered successfully", newCategory });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 400, error: `${err.message}` });
  }
}

async function updateCategory(req, res) {
  try {
    const id = parseInt(req.params.id);
    const categoryExists = await prisma.category.findUnique({ where: { id } });

    if (!categoryExists) {
      return res.status(404).json({ error: "Record doesn't exist" });
    }
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: req.body,
    });
    return res
      .status(200)
      .json({ status: 200, msg: "Record updated", data: updatedCategory });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 400, error: `${error.message}` });
  }
}

async function deleteCategory(req, res) {
  try {
    const id = parseInt(req.params.id);
    const categoryExists = await prisma.category.findUnique({ where: { id } });

    if (!categoryExists) {
      return res.status(404).json({ error: "Record doesn't exist" });
    }
    await prisma.category.delete({
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
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
