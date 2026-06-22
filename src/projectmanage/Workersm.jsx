import { useState, useEffect } from "react";
import axios from "axios";

function About() {
    const [data, setData] = useState([])
    const [form, setForm] = useState({
        name: '', Category: '',
        attendence: '', salary: '', currency: ''
    })

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchWorker = async () => {
            const resp = await axios.get(`${API_URL}/api/worker`)
            setData(resp.data)
        }
        fetchWorker()
    }, [])
    const workerHandler = async () => {
        const newWorker = { ...form, salary: Number(form.salary) }
        await axios.post(`${API_URL}/api/worker`, newWorker)
        const resp = await axios.get(`${API_URL}/api/worker`)
        setData(resp.data)
        setForm({ name: '', Category: '', attendence: '', salary: '', currency: '' })
    }
    const worker_Del_Handler = async (id) => {
        await axios.delete(`${API_URL}/api/worker/${id}`)
        setData(data.filter(worker => worker.id !== id))
    }
    return (
        <>
            <h1>Workers Information Page: WIP</h1>
            <div className="form-container">
                <input type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input type="text"
                    placeholder="Category"
                    value={form.Category}
                    onChange={(e) => setForm({ ...form, Category: e.target.value })}
                />
                <input type="text"
                    placeholder="Present?"
                    value={form.attendence}
                    onChange={(e) => setForm({ ...form, attendence: e.target.value })}
                />
                <input type="number"
                    placeholder="Salary:"
                    value={form.salary}
                    onChange={(e) => setForm({ ...form, salary: e.target.value })}
                />
                <input type="text"
                    placeholder="Currency: " value={form.currency}
                    onChange={(e) => setForm({ ...form, currency: e.target.value })}
                />
                <button onClick={workerHandler}>New  👷🏻‍♂️ Worker</button>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th key="name">Name:</th>
                            <th key="category">Category:</th>
                            <th key="attendance">Attendence:</th>
                            <th key="salary">Salary</th>
                            <th key="currency">Currency:</th>
                            <th key="action">Action</th>
                        </tr>
                    </thead>
                    <tbody>{data.map((item) => (
                        <tr key={item.id}>
                            <td>Name: {item.name}</td>
                            <td>Category: {item.Category}</td>
                            <td>Attendence: {item.attendence}</td>
                            <td>Salary: {item.salary}</td>
                            <td>Currency: {item.currency}</td>
                            <td><button onClick={() => worker_Del_Handler(item.id)}>Delete Worker</button></td>
                        </tr>
                    ))}</tbody>
                </table>
            </div>
        </>
    )
}
export default About;