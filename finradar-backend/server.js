import express from "express";
import connectDB from "./src/config/db.js";
import transaction from "./src/model/transaction.js";
import finances from "./src/model/finances.js"
import dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config();    //  makes the environmental variables accessible
app.use(cors())
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

app.get("/expense/present", async (req, res) => {

    try {

        const now = new Date();

        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const week = Math.ceil(day / 7);

        const finance = await finances.findOne({ year });

        if (!finance) {
            return res.json({
                yearExpense: 0,
                monthExpense: 0,
                weekExpense: 0,
                dayExpense: 0
            });
        }

        const monthData = finance.months?.get(String(month));
        const weekData = monthData?.weeks?.get(String(week));
        const dayData = weekData?.days?.get(String(day));

        res.json({
            yearExpense: finance.expense || 0,
            monthExpense: monthData?.expense || 0,
            weekExpense: weekData?.expense || 0,
            dayExpense: dayData?.expense || 0
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Error retrieving present expenses");
    }

});

app.listen(3000, () => console.log("Listening at port 3000"));