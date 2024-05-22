import express from "express"
import mongoose from "mongoose"
import 'dotenv/config'
import boom from '@hapi/boom'

import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from "./routes/userRoutes.js"

const app = express();

app.use(express.json());

app.use("/category" , categoryRoutes);  
app.use("/product" , productRoutes); 
app.use("/user" , userRoutes);


app.use((err, req, res, next) => {
    if (!err.isBoom) {
      next(err);
      return;
    }
    const { output } = err;
    res.status(output.statusCode).json({ message: output.payload });
  });

app.listen(5000 , async () => {

    await mongoose.connect(process.env.DBCONNECTION);

    console.log("server is running on port 5000");
})