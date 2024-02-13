const express = require('express')
const app = express()

const userRouter = require("./routes/userRouter")
const productsRouter = require("./routes/productsRouter")
const categoriesRouter = require("./routes/categoriesRouter")
const ordersRouter = require("./routes/ordersRouter")
const productOrdersRouter = require("./routes/productOrdersRouter")
const port = 3000

app.use(express.urlencoded({extended:true}));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/orders", ordersRouter);
app.use("/api/v1/productOrders", productOrdersRouter);



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


