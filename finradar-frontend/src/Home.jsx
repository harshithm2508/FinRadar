import { useEffect, useState } from "react";
import axios from "axios";

function App() {

    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchExpenses() {
        try {
            const res = await axios.get("https://finradar-6nxy.onrender.com/expense/present");
            setData(res.data);
        } catch (err) {
            console.error(err);
        }
    }

        fetchExpenses();
    }, []);

    if (!data) {
        return <div className="text-black p-10">Loading...</div>;
    }

    return (
        <div className="text-black p-10">
        <h2>Today's Expense: ₹{data.dayExpense}</h2>
        <h2>This Week: ₹{data.weekExpense}</h2>
        <h2>This Month: ₹{data.monthExpense}</h2>
        <h2>This Year: ₹{data.yearExpense}</h2>
        </div>
    );
}

export default App;

// https://finradar-6nxy.onrender.com