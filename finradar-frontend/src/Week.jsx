import { useEffect, useState } from "react";
import axios from "axios";

function Week() {
    const [transactions, setTransactions] = useState(null);

    useEffect(() => {
        async function fetchWeekTransactions() {
        const res = await axios.get(
            "https://finradar-6nxy.onrender.com/transactions/week"
        );
        setTransactions(res.data);
        }

        fetchWeekTransactions();
    }, []);

    if (!transactions) {
        return <div className="p-10">Loading...</div>;
    }

    return (
        <div className="text-gray-600 p-10">
        <h1 className="text-lg text-black font-bold">This Week's Transactions</h1>

        {transactions.length === 0 ? (
            <p>No expenses this week</p>
        ) : (
            <ul>
            {transactions.map((tx, i) => (
                <li key={i}>
                {tx.title} — ₹{tx.amount}
                </li>
            ))}
            </ul>
        )}
        </div>
    );
}

export default Week;
