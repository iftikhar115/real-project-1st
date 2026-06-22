import { useState, useEffect } from "react";
import axios from "axios";

function Materials() {
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [form, setForm] = useState({ name: "", quantity: '', unit: '', priceperunit: '' })

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const materialsFetch = async () => {
            try {
                await axios.get(`${API_URL}/api/materials`)
                    .then(resp => setData(resp.data))
            } catch (error) {
                setError("Materials can not fatched")
            }
        }
        materialsFetch()
    }, [])
    const materialsAddHandle = async (e) => {
        e.preventDefault()
        const newItem = {
            ...form, quantity: Number(form.quantity),
            priceperunit: Number(form.priceperunit)
        }
        await axios.post(`${API_URL}/api/materials`, newItem)
        const resp = await axios.get(`${API_URL}/api/materials`)
        setData(resp.data)
        setForm({ name: '', quantity: '', unit: '', priceperunit: '' })
    }
    const materialsDeletehandle = async (id) => {
        await axios.delete(`${API_URL}/api/materials/${id}`)
        setData(data.filter(item => item.id !== id))
    }
    return (
        <>
            <h1>Materials</h1>
            <div className="form-container">
                <input type="text"
                    placeholder="Name"
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input type="number"
                    placeholder="Quantity"
                    value={form.quantity}
                    onChange={e => setForm({ ...form, quantity: e.target.value })}
                />
                <input type="text"
                    placeholder="Unit" value={form.unit}
                    onChange={e => setForm({ ...form, unit: e.target.value })}
                />
                <input type="number"
                    placeholder="Price Per Unit"
                    value={form.priceperunit}
                    onChange={e => setForm({
                        ...form, priceperunit: e.target.value
                    })}
                />
                <button onClick={materialsAddHandle}>+ Add</button>
            </div>
            {/*tlp zinda bad*/}
            <div className="table-container">
                <table>
                    <thead>
                        <tr><th>Name:</th><th>Unit:</th><th>Quantity</th><th>Price:</th><th>total</th><th>Action:</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (

                            <tr key={item.id}>

                                <td>{item.name}</td>
                                <td>{item.unit}</td>
                                <td>{item.quantity}</td>
                                <td>{item.priceperunit}</td>
                                <td>{item.quantity * item.priceperunit}</td>
                                <td><button className="delete-btn"
                                    onClick={() => materialsDeletehandle(item.id)}
                                > 🗑️ Delete</button></td>


                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Materials;