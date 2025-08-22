import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/FirebaseAuthContext'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import Sidebar from '../components/Sidebar';

const EmployeeChart = () => {
  const firebase = useFirebase()
  const [state, setStats] = useState({ totalTask: 0, completedTask: 0, failedTask: 0 });
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // ✅ Fetch all employee tasks, not just current user
        const tasks = await firebase.getAllEmployeeTasks();
        const total = tasks.length;
        const completed = tasks.filter(t => t.taskCompleted).length;
        const failed = tasks.filter(t => t.taskFailed).length;

        setStats({ totalTask: total, completedTask: completed, failedTask: failed });
      } catch (error) {
        console.error("Error fetching employee tasks:", error);
      }
    };

    fetchTasks();
  }, [firebase]);

  const data = [
    { name: "Tasks", total: state.totalTask, completed: state.completedTask, failed: state.failedTask }
  ];


  return (
    <div className="main flex">
      <Sidebar />
      <div className='right-sidebar absolute  top-0 right-0 w-[75%] h-[100vh] bg-[#040247]' style={{ background: "linear-gradient(rgb(17, 24, 39), rgb(88, 28, 135), rgb(124, 58, 237))" }}>
        <div className="w-full  h-96 p-4  shadow-md rounded-xl text-white">
          <h2 className="text-xl font-semibold mb-4">Your Task Stats</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap="40%">
              <XAxis dataKey="name" tick={{ fill: "#fff", fontSize: 20, fontWeight: 800 }} tickLine={false} axisLine={{ stroke: "#E5E7EB" }} />
              <YAxis allowDecimals={false} tick={{ fill: "#fff", fontSize: 20, fontWeight: 800 }} tickLine={false} axisLine={{ stroke: "#E5E7EB" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1F2937", borderRadius: "8px", border: "none", padding: "8px 12px" }}
                labelStyle={{ color: "#E5E7EB", fontWeight: "800" }}
                itemStyle={{ color: "#60A5FA" }}
              />
              <Legend verticalAlign="top" align="center" wrapperStyle={{ paddingBottom: "10px", fontSize: "20px", fontWeight: 800, color: "white" }} />
              <Bar dataKey="total" fill="#4F46E5" barSize={60} radius={[8, 8, 0, 0]} />
              <Bar dataKey="completed" fill="#10B981" barSize={60} radius={[8, 8, 0, 0]} />
              <Bar dataKey="failed" fill="#EF4444" barSize={60} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

        </div>
      </div>
    </div>
  )
}

export default EmployeeChart
