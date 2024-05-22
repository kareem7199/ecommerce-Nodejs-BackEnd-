import express from "express"
import mongoose from "mongoose"
import 'dotenv/config'
import boom from '@hapi/boom'
import redis from "./redis/client.js"

import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from "./routes/userRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import deliveryMethodRoutes from './routes/deliveryMethodRoutes.js'
import orderRoutes from "./routes/orderRoutes.js"

const app = express();

app.use(express.json());

app.use("/category" , categoryRoutes);  
app.use("/product" , productRoutes); 
app.use("/user" , userRoutes);
app.use("/cart" , cartRoutes);
app.use("/deliverymethod" , deliveryMethodRoutes);
app.use("/order" , orderRoutes);

app.use((err, req, res, next) => {
    if (!err.isBoom) {
      next(err);
      return;
    }
    const { output } = err;
    res.status(output.statusCode).json({ message: output.payload });
  });

app.listen(5000 , async () => {

    mongoose.connect(process.env.DBCONNECTION);
    await redis.connect();

    console.log("server is running on port 5000");
})