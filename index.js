const express = require('express');
require('dotenv').config()

const cors = require('cors');

const userRoute = require('./routes/userRoutes.js')
const { productRouter } = require("./routes/ProductRoute.js");
const { Product } = require('./models/products.js');

require('./db');

const app = express();

Product.sync().then(() => { console.log("resync product model") }).catch((err) => { console.log(err) });

app.use(express.json());



app.use("/user", userRoute);
app.use("/products", productRouter);




app.listen(process.env.SERVER_PORT, () => {
    console.log(`server started at ${process.env.SERVER_PORT}`);
})