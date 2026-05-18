import { useState, useEffect } from "react";
import axios from "axios";

function Expenses() {
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [form, setForm] = useState({date:'', description:'', category:'', amount:'' })

// use effect hook ===>  
    useEffect(() => {
     axios.get('/api/expenses')
     .then(resp => setData(resp.data))
     .catch(() => {
        setError("Expenses can not found")
     })
     
    },[])
    const expensesHandler = async (e) => {
        e.preventDefault()
    const newExpense =  await axios.post('/api/expenses', {
        ...form, amount: Number(form.amount)
    })
    const resp= await axios.get('/api/expenses')
        setData(resp.data)
        setForm({date:'', description:'', category:'', amount:''})
    }
    const expense_DeleteHandle = async (id) => {
        console.log("delted id:", id)
   await axios.delete(`/api/expenses/${id}`)
   setData(data.filter(expense => expense.id !== id))
    }
    return(
        <>
        <h1>Expenses</h1>
        <div className="form-container">

            <input type="date"
            placeholder=""
            value={form.date}
            onChange={(e) => setForm({...form, date: e.target.value})}
             />

             <input type="text"
             value={form.description}
             placeholder="Description"
             onChange={(e) => setForm({...form, description: e.target.value})}
              />
        <input type="text" 
        placeholder="Catagory"
        value={form.category}
        onChange={(e) => setForm({...form, category: e.target.value})}
        />
        <input type="number" 
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({...form, amount: e.target.value})}
        />
        <button onClick={expensesHandler}>➕ Add</button>
        </div>
        {error && <p className="error">{error}</p>}
        <div className="table-container">
            <table>
                <thead>
                    <tr><th>Date</th><th>Description</th><th>Category</th><th>Amount</th></tr>
                </thead>
                <tbody>
                    {data.map((expense) => (
                        <tr key={expense.id}>
                            <td>Date: {expense.date}</td>
                            <td>Description: {expense.description}</td>
                            <td>Category: {expense.category}</td>
                            <td>Amount: {expense.amount}</td>
                         <td><button onClick={() => expense_DeleteHandle(expense.id)}>🚮 Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}
export default Expenses;