import { useState, useEffect } from "react";
import axios from "axios";

function Timeline() {
    const [phases, setPhases] = useState([])
    const [form, setForm] = useState({ phaseName: '', startDate: '', endDate: '', status: 'Pending' })

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios.get(`${API_URL}/api/timeline`)
            .then(resp => setPhases(resp.data))
            .catch(() => console.log('Server not running'))
    }, [])

    const addPhase = async (e) => {
        e.preventDefault()
        await axios.post(`${API_URL}/api/timeline`, { ...form })
        const resp = await axios.get(`${API_URL}/api/timeline`)
        setPhases(resp.data)
        setForm({ phaseName: '', startDate: '', endDate: '', status: 'Pending' })
    }

    const deletePhase = async (id) => {
        await axios.delete(`${API_URL}/api/timeline/${id}`)
        setPhases(phases.filter(phase => phase.id !== id))
    }

    return (
        <>
            <h1>📅 Project Timeline</h1>
            <div className="form-container">
                <input type="text" placeholder="Phase Name" value={form.phaseName}
                    onChange={(e) => setForm({ ...form, phaseName: e.target.value })} />
                <input type="date" value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
                <input type="date" value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <button onClick={addPhase}>+ Add Phase</button>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th key="name">Phase</th>
                            <th key="start">Start</th>
                            <th key="end">End</th>
                            <th key="status">Status</th>
                            <th key="action">Action</th>
                        </tr>
                    </thead>
                    <tbody>{phases.map(phase => (
                        <tr key={phase.id}>
                            <td>{phase.phaseName}</td>
                            <td>{phase.startDate}</td>
                            <td>{phase.endDate}</td>
                            <td><span className={`status-${(phase.status || 'pending').toLowerCase().replace(' ', '-')}`}>{phase.status || 'Pending'}</span></td>
                            <td><button className="btn-delete" onClick={() => deletePhase(phase.id)}>🗑️</button></td>
                        </tr>
                    ))}</tbody>
                </table>
            </div>
        </>
    )
}

export default Timeline;