const express = require('express')
const userRouter = require("./routes/userRouter")
const app = express()
const productsRouter = require("./routes/productsRouter")
const categoriesRouter = require("./routes/categoriesRouter")
const ordersRouter = require("./routes/ordersRouter")
const port = 3000

app.use(express.urlencoded({extended:true}));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/orders", ordersRouter);



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


