const { PrismaClient } = require("@prisma/client");
const { createToken } = require('../utils/jwt');
const prisma = new PrismaClient();

// Getting users
async function getAllUsers(req, res) {
  const users = await prisma.user.findMany();
  res.send(users);
}

async function getOneUser(req, res) {
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

async function createUser(req, res) {
  try {
    // console.log(req.body)
    const { name, email, phone, password } = req.body;
    //check data is valid
    if (!name || !email || !phone || !password) {
      return res
        .status(400)
        .json({ status: 400, msg: "Missing or empty fields" });
    }
    //check if user exists
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return res
        .status(400)
        .json({ status: 400, msg: "Record already exists" });
    }
    //save to database
    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password: password.trim(),
      },
    });
    res.status(201).json({ message: "Registered successfully", newUser });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 400, error: `${err.message}` });
  }
}

async function updateUser(req, res) {
  try {
    const id = parseInt(req.params.id);
    const userExists = await prisma.user.findUnique({ where: { id } });

    if (!userExists) {
      return res.status(404).json({ error: "Record doesn't exist" });
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: req.body,
    });
    return res
      .status(200)
      .json({ status: 200, msg: "Record updated", data: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 400, error: `${error.message}` });
  }
}

async function deleteUser(req, res) {
  try {
    const id = parseInt(req.params.id);
    const userExists = await prisma.user.findUnique({ where: { id } });

    if (!userExists) {
      return res.status(404).json({ error: "Record doesn't exist" });
    }
    await prisma.user.delete({
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

async function loginUser(req, res) {
  // user should provide a username and password
  let userDetails = req.body;
  //check if user exists and if their password matches the one in the database
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userDetails.email,
      },
    });
    
    
    if (user && user.password === userDetails.password) {
      let token = createToken({
        id: user.id,
        email: user.email,
      });

      res.status(200).json({ message: "Success", token });
    } else
      res
        .status(404)
        .json({ error: "User Not Found or Incorrect Password Provided" });
  } catch (error) {
    res.json({ errorObject: error.message });
  }
}

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
