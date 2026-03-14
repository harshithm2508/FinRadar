import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchExpenses() {
        try {
            const res = await axios.get(
            "https://finradar-6nxy.onrender.com/expense/present"
            );
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

        <div className="mt-6">
            <Link
            to="/today"
            className="text-blue-600 underline"
            >
            View Today's Transactions
            </Link>
        </div>
        </div>
    );
}

export default Home;