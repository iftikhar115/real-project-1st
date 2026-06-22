import { useState, useEffect } from "react";
import axios from "axios";
import Reuseablecomponents from './Reusecomps'

function Home() {
    const [stats, setStats] = useState({
        totalMetarial: 0,
        totalWorkers: 0,
        totalExpenses: 0,
        activeProjects: 3
    });

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [materials, workers, expenses] = await Promise.all([
                    axios.get(`${API_URL}/api/materials`),
                    axios.get(`${API_URL}/api/workeRS`),
                    axios.get(`${API_URL}/api/expenses`)
                ]);

                setStats({
                    totalMetarial: materials.data.length,
                    totalWorkers: workers.data.length,
                    totalExpenses: expenses.data.reduce((sum, exp) => sum + Number(exp.amount || 0), 0),
                    activeProjects: 3
                });
            } catch (error) {
                console.log("Stats fetching error");
            }
        };
        fetchStats();  // ✅ useEffect ke ANDAR
    }, []);

    return (
        <>
            <h1>🏗️ IHR BuildTrack Dashboard</h1>
            <div className="stats-grid">
                <Reuseablecomponents title="Total Materials" value={stats.totalMetarial} icon="🧱" color="#a78bfa" />
                <Reuseablecomponents title="Total Workers" value={stats.totalWorkers} icon="👷" color="#38bdf8" />
                <Reuseablecomponents title="Total Expenses" value={`PKR ${stats.totalExpenses}`} icon="💰" color="#f472b6" />
                <Reuseablecomponents title="Active Projects" value={stats.activeProjects} icon="🏗️" color="#4ade80" />
            </div>
        </>
    )
}

export default Home;