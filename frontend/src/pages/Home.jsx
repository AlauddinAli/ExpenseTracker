import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser);
console.log(currentUser?.id);

  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/expenses/${currentUser.id}`
      );

      setExpenses(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load on mount is intentional
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearForm = () => {
    setExpenseName("");
    setAmount("");
    setDate("");
    setDescription("");
    setEditingId(null);
  };

  const addExpense = async () => {
    if (!expenseName || !amount || !date) {
      alert("Please fill all required fields");
      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/expenses/${editingId}`,
          {
            title: expenseName,
            amount,
            date,
            description,
          }
        );

        alert("Expense Updated Successfully");
      } else {
        await axios.post(
          "http://localhost:5000/api/expenses",
          {
            title: expenseName,
            amount,
            date,
            description,
            userId: currentUser.id,
          }
        );

        alert("Expense Added Successfully");
      }

      clearForm();
      fetchExpenses();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/expenses/${id}`
      );

      fetchExpenses();
    } catch (err) {
      console.log(err);
    }
  };

  const editExpense = (expense) => {
    setExpenseName(expense.title);
    setAmount(expense.amount);
    setDate(expense.date);
    setDescription(expense.description);

    setEditingId(expense._id);
  };
  return (
  <div className="container mt-5">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Expense Tracker Dashboard</h2>

      <Link
        to="/"
        className="btn btn-danger"
        onClick={() => localStorage.removeItem("currentUser")}
      >
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
          <h5 className="text-muted">
            No expenses added yet.
          </h5>

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
              <tr key={expense._id}>
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
                    onClick={() =>
                      deleteExpense(expense._id)
                    }
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