import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [expenses, setExpenses] = useState([]);

  const addExpense = () => {
    if (!expenseName || !amount || !date) {
      alert("Please fill all required fields");
      return;
    }

    if (editingId) {
      setExpenses(
        expenses.map((expense) =>
          expense.id === editingId
            ? {
                ...expense,
                title: expenseName,
                amount,
                date,
                description,
              }
            : expense
        )
      );

      setEditingId(null);
    } else {
      const newExpense = {
        id: Date.now(),
        title: expenseName,
        amount,
        date,
        description,
      };

      setExpenses([...expenses, newExpense]);
    }

    setExpenseName("");
    setAmount("");
    setDate("");
    setDescription("");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const editExpense = (expense) => {
    setExpenseName(expense.title);
    setAmount(expense.amount);
    setDate(expense.date);
    setDescription(expense.description);
    setEditingId(expense.id);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Expense Tracker Dashboard</h2>

        <Link to="/" className="btn btn-danger">
          Logout
        </Link>
      </div>

      <div className="card shadow p-4 mb-4">
        <h3>{editingId ? "Edit Expense" : "Add Expense"}</h3>

        <input
          className="form-control mb-3"
          placeholder="Expense Name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="date"
          className="form-control mb-3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          className="btn btn-success"
          onClick={addExpense}
        >
          {editingId ? "Update Expense" : "Add Expense"}
        </button>
      </div>

      <div className="card shadow p-4">
        <h3>Your Expenses</h3>

        {expenses.length === 0 ? (
          <div className="text-center py-4">
            <h5 className="text-muted">No expenses added yet.</h5>
            <p className="text-secondary">
              Add your first expense using the form above.
            </p>
          </div>
        ) : (
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.title}</td>
                  <td>₹ {expense.amount}</td>
                  <td>{expense.date}</td>
                  <td>{expense.description}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => editExpense(expense)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteExpense(expense.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Home;