import React, { useState, useEffect } from 'react';

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    // Load expenses from localStorage when component mounts
    useEffect(() => {
        const Expenses = JSON.parse(localStorage.getItem('expenses'));
        if (Expenses) {
            setExpenses(Expenses);
            // console.log(expenses.target)
        }
    }, []);

    useEffect(() => {
        // Save expenses to localStorage when expenses change
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

    const addExpense = () => {
        if (description && amount) {
            const newExpense = { description, amount: parseFloat(amount) };
            setExpenses([...expenses, newExpense]);
            setDescription('');
            setAmount('');
        }
    };

    const deleteExpense = (index) => {
        const updatedExpenses = expenses.filter((_, i) => i !== index);
        setExpenses(updatedExpenses);
    };

    const totalAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-red-500 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Expense Tracker</h2>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Enter your expense name"
                    className="w-full mt-1 p-2 border rounded-md"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <input
                    type="number"
                    placeholder="Enter expense amount"
                    className="w-full mt-1 p-2 border rounded-md"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>

            <button
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                onClick={addExpense}
            >
                Add Expense
            </button>

            <h3 className="text-lg font-semibold text-gray-700 mt-6">Expenses</h3>
            <ul className="divide-y divide-gray-200 bg-white rounded-lg pl-2">
                {expenses.map((expense, index) => (
                    <li key={index} className="py-2 flex justify-between items-center">
                        <span className="text-gray-700">{expense.description}</span>
                        <span className="text-gray-700">Rs.{expense.amount.toFixed(2)}</span>
                        <button
                            className="text-red-500 hover:text-red-700 ml-4"
                            onClick={() => deleteExpense(index)}
                        >
                            ❌
                        </button>
                    </li>
                ))}
            </ul>

            <div className="mt-4 p-3 bg-gray-100 rounded-lg flex justify-between items-center">
                <span className="text-gray-700 font-bold">Total</span>
                <span className="text-gray-700 font-bold text-1xl">Rs.{totalAmount.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default ExpenseTracker;
