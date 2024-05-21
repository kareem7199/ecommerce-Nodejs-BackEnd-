import express from "express"
import mongoose from "mongoose"
import 'dotenv/config'

import categoryRoutes from './routes/categoryRoutes.js'

const app = express();

app.use(express.json());

app.use("/category" , categoryRoutes);

app.listen(5000 , async () => {

    await mongoose.connect(process.env.DBCONNECTION);

    console.log("server is running on port 5000");
})