import mongoose from "mongoose";

const daySchema = new mongoose.Schema({
    expense : {
        type: Number,
        default: 0
    }
},
{ _id: false })

const weekSchema = new mongoose.Schema({
    days: {
        type: Map,
        of: daySchema
    },

    expense: {
        type: Number,
        default: 0
    }
},
{ _id: false })

const monthSchema = new mongoose.Schema(
    {
        weeks: {
            type: Map,
            of: weekSchema
        },

        income: {
            type: Number,
            default: 0
        },

        expense: {
            type: Number,
            default: 0
        }
    },
{ _id: false }
)


const financeSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true,
        unique: true
    },

    months: {
        type: Map,
        of: monthSchema
    },

    income: {
        type: Number,
        default: 0
    },

    expense: {
        type: Number,
        default: 0
    }
},
    {timestamps: true}
)

const finances = mongoose.model("Finances", financeSchema);

export default finances;