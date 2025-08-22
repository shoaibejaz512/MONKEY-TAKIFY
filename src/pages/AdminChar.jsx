import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useFirebase } from '../context/FirebaseAuthContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const AdminChart = () => {
  const firebase = useFirebase();
  const [stats, setStats] = useState({
    admin: { total: 0, completed: 0, failed: 0 },
    employee: { total: 0, completed: 0, failed: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const adminTasks = await firebase.getAdminTasks();
        const employeeTasks = await firebase.getAllEmployeeTasks();

        setStats({
          admin: {
            total: adminTasks.length,
            completed: adminTasks.filter(t => t.taskCompleted).length,
            failed: adminTasks.filter(t => t.taskFailed).length,
          },
          employee: {
            total: employeeTasks.length,
            completed: employeeTasks.filter(t => t.taskCompleted).length,
            failed: employeeTasks.filter(t => t.taskFailed).length,
          },
        });
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [firebase]);

  if (loading) return <p className="text-white text-center mt-10">Loading chart...</p>;

  // Restructure data for Recharts
  const data = [
    {
      name: 'Admin',
      total: stats.admin.total,
      completed: stats.admin.completed,
      failed: stats.admin.failed,
    },
    {
      name: 'Employee',
      total: stats.employee.total,
      completed: stats.employee.completed,
      failed: stats.employee.failed,
    },
  ];

  return (
    <div className="main flex">
      <Sidebar />
      <div
        className="right-sidebar absolute top-0 right-0 w-[75%] h-[100vh] bg-[#040247]"
        style={{ background: 'linear-gradient(rgb(17, 24, 39), rgb(88, 28, 135), rgb(124, 58, 237))' }}
      >
        <div className="w-full h-96 p-4 shadow-md rounded-xl text-white">
          <h2 className="text-xl font-semibold mb-4">Task Stats Overview</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap="30%">
              <XAxis dataKey="name" tick={{ fill: '#fff', fontSize: 14, fontWeight: 700 }} tickLine={false} axisLine={{ stroke: '#E5E7EB' }} />
              <YAxis allowDecimals={false} tick={{ fill: '#fff', fontSize: 14, fontWeight: 700 }} tickLine={false} axisLine={{ stroke: '#E5E7EB' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', borderRadius: '8px', border: 'none', padding: '8px 12px' }}
                labelStyle={{ color: '#E5E7EB', fontWeight: '800' }}
                itemStyle={{ color: '#60A5FA' }}
              />
              <Legend verticalAlign="top" align="center" wrapperStyle={{ color: 'white', fontWeight: 700 }} />
              <Bar dataKey="total" fill="#4F46E5" radius={[8, 8, 0, 0]} barSize={40} />
              <Bar dataKey="completed" fill="#10B981" radius={[8, 8, 0, 0]} barSize={40} />
              <Bar dataKey="failed" fill="#EF4444" radius={[8, 8, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminChart;
