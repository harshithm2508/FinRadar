import express from "express";
import connectDB from "./src/config/db.js";
import transaction from "./src/model/transaction.js";
import finances from "./src/model/finances.js"
import dotenv from "dotenv";

const app = express();

dotenv.config();    //  makes the environmental variables accessible
app.use(express.json())     // this helps express to parse json files

await connectDB();

app.post("/add", async (req, res) => {
    const {title, type, amount, paymentMethod, description, category, transactionDate} = req.body;
    
    try{
        await transaction.create({
            title: title,
            type: type,
            amount: Number(amount),
            paymentMethod: paymentMethod,
            description: description,
            category: category,
            transactionDate: transactionDate
        })        

        const dateObj = transactionDate ? new Date(transactionDate) : new Date();

        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const date = dateObj.getDate();
        const week = Math.ceil(date / 7);

        if(type === "expense"){
            await finances.updateOne(
                {year: year},
                {
                    $inc: {
                        [`months.${month}.weeks.${week}.days.${date}.expense`]: Number(amount),
                        [`months.${month}.weeks.${week}.expense`]: Number(amount),
                        [`months.${month}.expense`]: Number(amount),
                        expense: Number(amount)
                    }
                },

                {upsert: true}
            );
        }   else if(type === "income"){
            await finances.updateOne(
                {year: year},
                {
                    $inc: {
                        [`months.${month}.income`]: amount,
                        income: amount
                    }
                },
                { upsert: true}
            )
        }
        

        res.status(201).send("Transaction noted");
    }   catch (err){
        console.log(err);
        res.status(500).send("Error saving transaction")
    }
})


app.listen(3000, () => console.log("Listening at port 3000"));