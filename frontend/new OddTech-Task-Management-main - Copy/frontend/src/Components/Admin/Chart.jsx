// import React from 'react';
// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
//     PieChart,
//     Pie,
//     Cell,
//     LineChart,
//     Line,
//     AreaChart,
//     Area,
//     RadarChart,
//     PolarGrid,
//     PolarAngleAxis,
//     PolarRadiusAxis,
//     Radar
// } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

// const Charts = ({ tasks, users }) => {
//     // Process task data for charts
//     const processTaskData = () => {
//         const statusCount = {};
//         const priorityCount = {};
//         const userTaskCount = {};
//         const completionOverTime = {};
//         const categoryCount = {};

//         tasks.forEach(task => {
//             // Status distribution
//             statusCount[task.taskStatus] = (statusCount[task.taskStatus] || 0) + 1;

//             // Priority distribution
//             priorityCount[task.priority] = (priorityCount[task.priority] || 0) + 1;

//             // User task assignment
//             if (task.employeeName) {
//                 userTaskCount[task.employeeName] = (userTaskCount[task.employeeName] || 0) + 1;
//             }

//             // Completion over time
//             if (task.taskStatus === 'Completed' && task.dueDate) {
//                 const month = new Date(task.dueDate).toLocaleString('default', { month: 'short' });
//                 completionOverTime[month] = (completionOverTime[month] || 0) + 1;
//             }

//             // Category distribution (if available)
//             if (task.category) {
//                 categoryCount[task.category] = (categoryCount[task.category] || 0) + 1;
//             }
//         });

//         // Format data for Recharts
//         const statusData = Object.keys(statusCount).map(key => ({
//             name: key,
//             value: statusCount[key]
//         }));

//         const priorityData = Object.keys(priorityCount).map(key => ({
//             name: key,
//             value: priorityCount[key]
//         }));

//         const userData = users?.map(user => ({
//             name: user.name || user.username || user.email || 'Unknown', // Handle different user identifier cases
//             tasks: tasks.filter(t => t.employeeName === user.name || t.assignedTo === user.id).length,
//             completed: tasks.filter(t =>
//                 (t.employeeName === user.name || t.assignedTo === user.id) &&
//                 t.taskStatus === 'Completed'
//             ).length
//         })) || [];
//         const completionData = Object.keys(completionOverTime).map(key => ({
//             name: key,
//             completed: completionOverTime[key]
//         })).sort((a, b) => {
//             const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//             return months.indexOf(a.name) - months.indexOf(b.name);
//         });

//         const categoryData = Object.keys(categoryCount).map(key => ({
//             name: key,
//             value: categoryCount[key]
//         }));

//         return {
//             statusData,
//             priorityData,
//             userData,
//             completionData,
//             categoryData
//         };
//     };

//     const { statusData, priorityData, userData, completionData, categoryData } = processTaskData();

//     return (
//         <div className="p-4 space-y-8">
//             <h1 className="text-2xl font-bold mb-6">Task Management Analytics</h1>

//             {/* Task Status Distribution - Pie Chart */}
//             <div className="bg-white p-4 rounded-lg shadow">
//                 <h2 className="text-lg font-semibold mb-4">Task Status Distribution</h2>
//                 <div className="h-64">
//                     <ResponsiveContainer width="100%" height="100%">
//                         <PieChart>
//                             <Pie
//                                 data={statusData}
//                                 cx="50%"
//                                 cy="50%"
//                                 labelLine={false}
//                                 label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                                 outerRadius={80}
//                                 fill="#8884d8"
//                                 dataKey="value"
//                             >
//                                 {statusData.map((entry, index) => (
//                                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                 ))}
//                             </Pie>
//                             <Tooltip />
//                             <Legend />
//                         </PieChart>
//                     </ResponsiveContainer>
//                 </div>
//             </div>

//             {/* Task Priority Distribution - Bar Chart */}
//             <div className="bg-white p-4 rounded-lg shadow">
//                 <h2 className="text-lg font-semibold mb-4">Task Priority Distribution</h2>
//                 <div className="h-64">
//                     <ResponsiveContainer width="100%" height="100%">
//                         <BarChart
//                             data={priorityData}
//                             margin={{
//                                 top: 5,
//                                 right: 30,
//                                 left: 20,
//                                 bottom: 5,
//                             }}
//                         >
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="name" />
//                             <YAxis />
//                             <Tooltip />
//                             <Legend />
//                             <Bar dataKey="value" fill="#8884d8" name="Tasks" />
//                         </BarChart>
//                     </ResponsiveContainer>
//                 </div>
//             </div>

//             {/* User Task Assignment - Stacked Bar Chart */}
//             <div className="bg-white p-4 rounded-lg shadow">
//                 <h2 className="text-lg font-semibold mb-4">User Task Assignment</h2>
//                 <div className="h-64">
//                     <ResponsiveContainer width="100%" height="100%">
//                         <BarChart
//                             data={userData}
//                             margin={{
//                                 top: 20,
//                                 right: 30,
//                                 left: 20,
//                                 bottom: 5,
//                             }}
//                         >
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="name" />
//                             <YAxis />
//                             <Tooltip />
//                             <Legend />
//                             <Bar dataKey="tasks" stackId="a" fill="#8884d8" name="Total Tasks" />
//                             <Bar dataKey="completed" stackId="a" fill="#82ca9d" name="Completed" />
//                         </BarChart>
//                     </ResponsiveContainer>
//                 </div>
//             </div>

//             {/* Task Completion Over Time - Line Chart */}
//             <div className="bg-white p-4 rounded-lg shadow">
//                 <h2 className="text-lg font-semibold mb-4">Task Completion Over Time</h2>
//                 <div className="h-64">
//                     <ResponsiveContainer width="100%" height="100%">
//                         <LineChart
//                             data={completionData}
//                             margin={{
//                                 top: 5,
//                                 right: 30,
//                                 left: 20,
//                                 bottom: 5,
//                             }}
//                         >
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="name" />
//                             <YAxis />
//                             <Tooltip />
//                             <Legend />
//                             <Line type="monotone" dataKey="completed" stroke="#8884d8" activeDot={{ r: 8 }} name="Tasks Completed" />
//                         </LineChart>
//                     </ResponsiveContainer>
//                 </div>
//             </div>

//             {/* Task Categories - Radar Chart (if categories exist) */}
//             {categoryData.length > 0 && (
//                 <div className="bg-white p-4 rounded-lg shadow">
//                     <h2 className="text-lg font-semibold mb-4">Task Categories Overview</h2>
//                     <div className="h-64">
//                         <ResponsiveContainer width="100%" height="100%">
//                             <RadarChart cx="50%" cy="50%" outerRadius="80%" data={categoryData}>
//                                 <PolarGrid />
//                                 <PolarAngleAxis dataKey="name" />
//                                 <PolarRadiusAxis />
//                                 <Radar name="Tasks" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
//                                 <Tooltip />
//                             </RadarChart>
//                         </ResponsiveContainer>
//                     </div>
//                 </div>
//             )}

//             {/* Task Completion Rate - Area Chart */}
//             <div className="bg-white p-4 rounded-lg shadow">
//                 <h2 className="text-lg font-semibold mb-4">Task Completion Rate</h2>
//                 <div className="h-64">
//                     <ResponsiveContainer width="100%" height="100%">
//                         <AreaChart
//                             data={completionData}
//                             margin={{
//                                 top: 10,
//                                 right: 30,
//                                 left: 0,
//                                 bottom: 0,
//                             }}
//                         >
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="name" />
//                             <YAxis />
//                             <Tooltip />
//                             <Area type="monotone" dataKey="completed" stroke="#8884d8" fill="#8884d8" name="Tasks Completed" />
//                         </AreaChart>
//                     </ResponsiveContainer>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Charts;