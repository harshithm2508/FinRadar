import express from "express";
import connectDB from "./src/config/db.js";
import transaction from "./src/model/transaction.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();    //  makes the environmental variables accessible
app.use(express.json())     // this helps express to parse json files

await connectDB();

app.use("/add", async (req, res) => {
    const body = req.body;
    
    try{
        await transaction.create({
            title: body.title,
            type: body.type,
            amount: body.amount,
            paymentMethod: body.paymentMethod,
            description: body.description,
            category: body.category
        })

        res.send("Transaction noted");
    }   catch (err){
        console.log(err);
    }
})


app.listen(3000, () => console.log("Listening at port 3000"));