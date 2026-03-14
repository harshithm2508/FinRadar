import { useEffect, useState } from "react";
import axios from "axios";

function Today() {
    const [transactions, setTransactions] = useState(null);

    useEffect(() => {
        async function fetchTodayTransactions() {
        try {
            const res = await axios.get("https://finradar-6nxy.onrender.com/transactions/today");
            setTransactions(res.data);
        } catch (err) {
            console.error(err);
        }
        }

        fetchTodayTransactions();
    }, []);

    if (!transactions) {
        return <div className="text-black p-10">Loading...</div>;
    }

    return (
        <div className="text-gray-600 p-10">
        <h1 className="text-lg text-black font-bold mb-4">Today's Transactions</h1>

        {transactions.length === 0 ? (
            <p>No expenses today</p>
        ) : (
            <ul>
            {transactions.map((tx, index) => (
                <li key={index} className="mb-2">
                {tx.title} — ₹{tx.amount}
                </li>
            ))}
            </ul>
        )}
        </div>
    );
    }

export default Today;