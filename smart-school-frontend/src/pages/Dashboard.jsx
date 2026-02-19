// import { useState, useEffect } from "react";
// import API from "../api/axios";
// import Card from "../components/Card";

// export default function Dashboard() {
//   const [tasks, setTasks] = useState([]);
//   const [teacherAssignments, setTeacherAssignments] = useState([]);
//   const [task, setTask] = useState({ title: "", subject: "", dueDate: "" });
//   const [loading, setLoading] = useState(true);


//   const fetchAllData = async () => {
//     try {
//       setLoading(true);

//       const [tasksRes] = await Promise.all([
//         API.get("/tasks"),
//         // API.get("/assignments"),
       
//       ]);

//       setTasks(tasksRes.data || []);
   
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };


// const fetchAssignments = async () => {
//   try {
//     const res = await API.get("/assignments/public"); // ensure student token is present
//     setTeacherAssignments(res.data);
//   } catch (error) {
//     console.log("Error fetching assignments:", error);
//   }
// };




//   useEffect(() => {
//     fetchAllData();
//     fetchAssignments();

//   }, []);


//   const addTask = async () => {
//     if (!task.title) return;

//     try {
//       await API.post("/tasks", task);
//       setTask({ title: "", subject: "", dueDate: "" });
//       fetchAllData();
//     } catch (error) {
//       console.error("Error adding task:", error);
//     }
//   };

//   const toggleComplete = async (id, completed) => {
//     try {
//       await API.put(`/tasks/${id}`, { completed: !completed });
//       fetchAllData();
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//  const deleteTask = async (id) => {
//   try {
//     const res = await API.delete(`/tasks/${id}`);
//     alert(res.data.message); // Shows "Task removed"
//     fetchAllData();
//   } catch (error) {
//     if (error.response) {
//       alert(`Error: ${error.response.data.message}`);
//     } else {
//       alert("Something went wrong!");
//     }
//   }
// };

//   // ================= PROGRESS =================

//   const progress =
//     tasks.length === 0
//       ? 0
//       : Math.round(
//           (tasks.filter((t) => t.completed).length / tasks.length) * 100
//         );

//   // ================= UI =================

//   if (loading) {
//     return (
//       <div className="p-6 text-center text-lg font-semibold">
//         Loading Dashboard...
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h2 className="text-3xl font-bold mb-4">Student Dashboard</h2>

//       {/* ================= ADD TASK ================= */}
//       <div className="mb-6 flex gap-2 flex-wrap">
//         <input
//           type="text"
//           placeholder="Title"
//           value={task.title}
//           onChange={(e) => setTask({ ...task, title: e.target.value })}
//           className="border p-2 rounded w-40"
//         />
//         <input
//           type="text"
//           placeholder="Subject"
//           value={task.subject}
//           onChange={(e) => setTask({ ...task, subject: e.target.value })}
//           className="border p-2 rounded w-40"
//         />
//         <input
//           type="date"
//           value={task.dueDate}
//           onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
//           className="border p-2 rounded"
//         />
//         <button
//         type="button"
//           onClick={addTask}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           Add Task
//         </button>
//       </div>

//       {/* ================= PROGRESS BAR ================= */}
//       <div className="mb-6">
//         <p className="mb-1 font-semibold">Progress: {progress}%</p>
//         <div className="bg-gray-300 rounded h-4">
//           <div
//             className="bg-blue-600 h-4 rounded transition-all"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//       </div>

//       {/* ================= STUDENT TASKS ================= */}
//       <h3 className="text-2xl font-semibold mb-2">Your Tasks</h3>

//       {tasks.length === 0 ? (
//         <p>No tasks yet.</p>
//       ) : (
//         tasks.map((t) => (
//           <Card
//             key={t._id}
//             title={t.title}
//             description={`Subject: ${t.subject || "N/A"} | Due: ${
//               t.dueDate
//                 ? new Date(t.dueDate).toLocaleDateString()
//                 : "No due date"
//             }`}
//           >
//             <button
//               onClick={() => toggleComplete(t._id, t.completed)}
//               className="text-sm underline mr-2"
//             >
//               {t.completed ? "Undo" : "Complete"}
//             </button>

//             <button
//               onClick={() => deleteTask(t._id)}
//               className="text-sm text-red-500 underline"
//             >
//               Delete
//             </button>
//           </Card>
//         ))
//       )}

//       {/* ================= TEACHER ASSIGNMENTS ================= */}
//       <h3 className="text-2xl font-semibold mt-8 mb-2">
//         Teacher Assignments
//       </h3>

//       {teacherAssignments.length === 0 ? (
//         <p>No assignments yet.</p>
//       ) : (
//         teacherAssignments.map((a) => (
//           <Card
//             key={a._id}
//             title={a.title}
//             description={`Subject: ${a.subject || "N/A"} | Due: ${
//               a.dueDate
//                 ? new Date(a.dueDate).toLocaleDateString()
//                 : "No due date"
//             } | Posted by: ${a.teacher?.name || "Teacher"}`}
//           >
//             <span className="text-sm italic text-gray-500">
//               Read-only
//             </span>
//           </Card>
//         ))
//       )}

    
    
//     </div>
//   );
// }


















// import { useState, useEffect } from "react";
// import API from "../api/axios";

// export default function Dashboard() {
//   const [tasks, setTasks] = useState([]);
//   const [teacherAssignments, setTeacherAssignments] = useState([]);
//   const [task, setTask] = useState({ title: "", subject: "", dueDate: "" });
//   const [loading, setLoading] = useState(true);

//   const fetchAllData = async () => {
//     try {
//       setLoading(true);
//       const [tasksRes] = await Promise.all([API.get("/tasks")]);
//       setTasks(tasksRes.data || []);
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAssignments = async () => {
//     try {
//       const res = await API.get("/assignments/public");
//       setTeacherAssignments(res.data);
//     } catch (error) {
//       console.log("Error fetching assignments:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAllData();
//     fetchAssignments();
//   }, []);

//   const addTask = async () => {
//     if (!task.title) return;
//     try {
//       await API.post("/tasks", task);
//       setTask({ title: "", subject: "", dueDate: "" });
//       fetchAllData();
//     } catch (error) {
//       console.error("Error adding task:", error);
//     }
//   };

//   const toggleComplete = async (id, completed) => {
//     try {
//       await API.put(`/tasks/${id}`, { completed: !completed });
//       fetchAllData();
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   const deleteTask = async (id) => {
//     try {
//       const res = await API.delete(`/tasks/${id}`);
//       alert(res.data.message);
//       fetchAllData();
//     } catch (error) {
//       if (error.response) {
//         alert(`Error: ${error.response.data.message}`);
//       } else {
//         alert("Something went wrong!");
//       }
//     }
//   };

//   const completed = tasks.filter((t) => t.completed).length;
//   const progress = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);
//   const progressColor = progress === 100 ? "bg-green-500" : progress >= 50 ? "bg-blue-500" : "bg-yellow-400";

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
//           <p className="text-gray-500 font-medium">Loading Dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-8">
//       <div className="max-w-5xl mx-auto">

//         {/* ── Header ── */}
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold text-gray-800">🎓 Student Dashboard</h2>
//           <p className="text-gray-500 mt-1">Track your tasks and stay on top of assignments</p>
//           <div className="h-1 w-20 bg-blue-500 rounded mt-3" />
//         </div>

//         {/* ── Stats Row ── */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
//             <p className="text-2xl font-bold text-blue-600">{tasks.length}</p>
//             <p className="text-xs text-gray-500 mt-1">Total Tasks</p>
//           </div>
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
//             <p className="text-2xl font-bold text-green-600">{completed}</p>
//             <p className="text-xs text-gray-500 mt-1">Completed</p>
//           </div>
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
//             <p className="text-2xl font-bold text-yellow-500">{tasks.length - completed}</p>
//             <p className="text-xs text-gray-500 mt-1">Pending</p>
//           </div>
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
//             <p className="text-2xl font-bold text-purple-600">{teacherAssignments.length}</p>
//             <p className="text-xs text-gray-500 mt-1">Assignments</p>
//           </div>
//         </div>

//         {/* ── Progress Bar ── */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8">
//           <div className="flex items-center justify-between mb-2">
//             <p className="font-semibold text-gray-700">Overall Progress</p>
//             <span className={`text-sm font-bold px-3 py-1 rounded-full ${
//               progress === 100 ? "bg-green-100 text-green-700" :
//               progress >= 50 ? "bg-blue-100 text-blue-700" :
//               "bg-yellow-100 text-yellow-700"
//             }`}>
//               {progress}%
//             </span>
//           </div>
//           <div className="bg-gray-100 rounded-full h-3">
//             <div
//               className={`${progressColor} h-3 rounded-full transition-all duration-500`}
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//           {progress === 100 && (
//             <p className="text-green-600 text-sm mt-2 font-medium">🎉 All tasks completed!</p>
//           )}
//         </div>

//         {/* ── Add Task ── */}
//         <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
//             <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg">✏️</span>
//             Add New Task
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//             <input
//               type="text"
//               placeholder="Task Title"
//               value={task.title}
//               onChange={(e) => setTask({ ...task, title: e.target.value })}
//               className="border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
//             />
//             <input
//               type="text"
//               placeholder="Subject"
//               value={task.subject}
//               onChange={(e) => setTask({ ...task, subject: e.target.value })}
//               className="border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
//             />
//             <input
//               type="date"
//               value={task.dueDate}
//               onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
//               className="border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
//             />
//             <button
//               type="button"
//               onClick={addTask}
//               className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all"
//             >
//               + Add Task
//             </button>
//           </div>
//         </section>

//         {/* ── Your Tasks ── */}
//         <section className="mb-8">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
//               <span className="bg-indigo-100 text-indigo-600 p-1.5 rounded-lg">📋</span>
//               Your Tasks
//             </h3>
//             <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
//               {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
//             </span>
//           </div>

//           {tasks.length === 0 ? (
//             <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-14 text-center">
//               <p className="text-4xl mb-3">📝</p>
//               <p className="text-gray-500 font-medium">No tasks yet.</p>
//               <p className="text-gray-400 text-sm mt-1">Add your first task using the form above.</p>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {tasks.map((t) => (
//                 <div
//                   key={t._id}
//                   className={`bg-white rounded-2xl border shadow-sm p-4 transition-all hover:shadow-md ${
//                     t.completed ? "border-green-200 bg-green-50" : "border-gray-100"
//                   }`}
//                 >
//                   <div className="flex items-start justify-between gap-3 flex-wrap">
//                     <div className="flex items-center gap-3">
//                       {/* Completion indicator */}
//                       <div className={`w-4 h-4 rounded-full flex-shrink-0 border-2 ${
//                         t.completed ? "bg-green-500 border-green-500" : "border-gray-300"
//                       }`} />
//                       <div>
//                         <p className={`font-semibold text-gray-800 ${t.completed ? "line-through text-gray-400" : ""}`}>
//                           {t.title}
//                         </p>
//                         <p className="text-xs text-gray-500 mt-0.5">
//                           {t.subject && <span className="mr-2">📘 {t.subject}</span>}
//                           {t.dueDate && <span>📅 {new Date(t.dueDate).toLocaleDateString()}</span>}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Actions */}
//                     <div className="flex items-center gap-2 ml-auto">
//                       <button
//                         onClick={() => toggleComplete(t._id, t.completed)}
//                         className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
//                           t.completed
//                             ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                             : "bg-green-100 text-green-700 hover:bg-green-200"
//                         }`}
//                       >
//                         {t.completed ? "↩ Undo" : "✓ Complete"}
//                       </button>
//                       <button
//                         onClick={() => deleteTask(t._id)}
//                         className="text-xs px-3 py-1.5 rounded-lg font-medium bg-red-100 text-red-600 hover:bg-red-200 transition-all"
//                       >
//                         🗑 Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>

//         {/* ── Teacher Assignments ── */}
//         <section className="mb-8">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
//               <span className="bg-orange-100 text-orange-600 p-1.5 rounded-lg">📚</span>
//               Teacher Assignments
//             </h3>
//             <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
//               {teacherAssignments.length} {teacherAssignments.length === 1 ? "assignment" : "assignments"}
//             </span>
//           </div>

//           {teacherAssignments.length === 0 ? (
//             <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-14 text-center">
//               <p className="text-4xl mb-3">📭</p>
//               <p className="text-gray-500 font-medium">No assignments posted yet.</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {teacherAssignments.map((a) => (
//                 <div
//                   key={a._id}
//                   className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow"
//                 >
//                   <div className="flex items-start justify-between gap-2 flex-wrap">
//                     <h4 className="font-semibold text-gray-800">{a.title}</h4>
//                     <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-full">
//                       {a.subject || "General"}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-500 mt-2">
//                     📅 Due: <span className="font-medium text-gray-700">
//                       {a.dueDate ? new Date(a.dueDate).toLocaleDateString() : "No due date"}
//                     </span>
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     👤 By: <span className="font-medium text-gray-700">{a.teacher?.name || "Teacher"}</span>
//                   </p>
//                   <span className="inline-block mt-3 text-xs italic text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
//                     🔒 Read-only
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>

//       </div>
//     </div>
//   );
// }










































// import { useState, useEffect } from "react";
// import API from "../api/axios";

// // ── Confirmation Modal Component ──
// function DeleteConfirmModal({ task, onConfirm, onCancel }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//         onClick={onCancel}
//       />

//       {/* Modal */}
//       <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-bounce-in">
//         {/* Icon */}
//         <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mx-auto mb-4">
//           <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//           </svg>
//         </div>

//         {/* Text */}
//         <h3 className="text-xl font-bold text-gray-800 text-center mb-1">Delete Task?</h3>
//         <p className="text-gray-500 text-sm text-center mb-1">You're about to delete:</p>
//         <p className="text-blue-600 font-semibold text-center text-sm bg-blue-50 rounded-lg px-3 py-2 mb-5">
//           "{task?.title}"
//         </p>
//         <p className="text-gray-400 text-xs text-center mb-6">
//           This action cannot be undone.
//         </p>

//         {/* Buttons */}
//         <div className="flex gap-3">
//           <button
//             onClick={onCancel}
//             className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 active:scale-95 transition-all"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm active:scale-95 transition-all shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//             </svg>
//             Yes, Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Dashboard() {
//   const [tasks, setTasks] = useState([]);
//   const [teacherAssignments, setTeacherAssignments] = useState([]);
//   const [task, setTask] = useState({ title: "", subject: "", dueDate: "" });
//   const [loading, setLoading] = useState(true);

//   // ── Modal state ──
//   const [taskToDelete, setTaskToDelete] = useState(null); // holds the task object

//   const fetchAllData = async () => {
//     try {
//       setLoading(true);
//       const [tasksRes] = await Promise.all([API.get("/tasks")]);
//       setTasks(tasksRes.data || []);
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAssignments = async () => {
//     try {
//       const res = await API.get("/assignments/public");
//       setTeacherAssignments(res.data);
//     } catch (error) {
//       console.log("Error fetching assignments:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAllData();
//     fetchAssignments();
//   }, []);

//   const addTask = async () => {
//     if (!task.title) return;
//     try {
//       await API.post("/tasks", task);
//       setTask({ title: "", subject: "", dueDate: "" });
//       fetchAllData();
//     } catch (error) {
//       console.error("Error adding task:", error);
//     }
//   };

//   const toggleComplete = async (id, completed) => {
//     try {
//       await API.put(`/tasks/${id}`, { completed: !completed });
//       fetchAllData();
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   // ── Step 1: open modal ──
//   const confirmDelete = (task) => {
//     setTaskToDelete(task);
//   };

//   // ── Step 2: user confirmed → actually delete ──
//   const handleDeleteConfirmed = async () => {
//     try {
//       await API.delete(`/tasks/${taskToDelete._id}`);
//       setTaskToDelete(null);
//       fetchAllData();
//     } catch (error) {
//       if (error.response) {
//         alert(`Error: ${error.response.data.message}`);
//       } else {
//         alert("Something went wrong!");
//       }
//       setTaskToDelete(null);
//     }
//   };

//   // ── Step 3: user cancelled ──
//   const handleDeleteCancelled = () => {
//     setTaskToDelete(null);
//   };

//   const completed = tasks.filter((t) => t.completed).length;
//   const progress = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);
//   const progressColor = progress === 100 ? "bg-green-500" : progress >= 50 ? "bg-blue-500" : "bg-yellow-400";

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
//           <p className="text-gray-500 font-medium">Loading Dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-8">

//       {/* ── Delete Confirmation Modal ── */}
//       {taskToDelete && (
//         <DeleteConfirmModal
//           task={taskToDelete}
//           onConfirm={handleDeleteConfirmed}
//           onCancel={handleDeleteCancelled}
//         />
//       )}

//       <div className="max-w-5xl mx-auto">

//         {/* ── Header ── */}
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold text-gray-800">🎓 Student Dashboard</h2>
//           <p className="text-gray-500 mt-1">Track your tasks and stay on top of assignments</p>
//           <div className="h-1 w-20 bg-blue-500 rounded mt-3" />
//         </div>

//         {/* ── Stats Row ── */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
//             <p className="text-2xl font-bold text-blue-600">{tasks.length}</p>
//             <p className="text-xs text-gray-500 mt-1">Total Tasks</p>
//           </div>
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
//             <p className="text-2xl font-bold text-green-600">{completed}</p>
//             <p className="text-xs text-gray-500 mt-1">Completed</p>
//           </div>
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
//             <p className="text-2xl font-bold text-yellow-500">{tasks.length - completed}</p>
//             <p className="text-xs text-gray-500 mt-1">Pending</p>
//           </div>
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
//             <p className="text-2xl font-bold text-purple-600">{teacherAssignments.length}</p>
//             <p className="text-xs text-gray-500 mt-1">Assignments</p>
//           </div>
//         </div>

//         {/* ── Progress Bar ── */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8">
//           <div className="flex items-center justify-between mb-2">
//             <p className="font-semibold text-gray-700">Overall Progress</p>
//             <span className={`text-sm font-bold px-3 py-1 rounded-full ${
//               progress === 100 ? "bg-green-100 text-green-700" :
//               progress >= 50 ? "bg-blue-100 text-blue-700" :
//               "bg-yellow-100 text-yellow-700"
//             }`}>
//               {progress}%
//             </span>
//           </div>
//           <div className="bg-gray-100 rounded-full h-3">
//             <div
//               className={`${progressColor} h-3 rounded-full transition-all duration-500`}
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//           {progress === 100 && (
//             <p className="text-green-600 text-sm mt-2 font-medium">🎉 All tasks completed!</p>
//           )}
//         </div>

//         {/* ── Add Task ── */}
//         <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
//             <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg">✏️</span>
//             Add New Task
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//             <input
//               type="text"
//               placeholder="Task Title"
//               value={task.title}
//               onChange={(e) => setTask({ ...task, title: e.target.value })}
//               className="border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
//             />
//             <input
//               type="text"
//               placeholder="Subject"
//               value={task.subject}
//               onChange={(e) => setTask({ ...task, subject: e.target.value })}
//               className="border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
//             />
//             <input
//               type="date"
//               value={task.dueDate}
//               onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
//               className="border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
//             />
//             <button
//               type="button"
//               onClick={addTask}
//               className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all"
//             >
//               + Add Task
//             </button>
//           </div>
//         </section>

//         {/* ── Your Tasks ── */}
//         <section className="mb-8">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
//               <span className="bg-indigo-100 text-indigo-600 p-1.5 rounded-lg">📋</span>
//               Your Tasks
//             </h3>
//             <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
//               {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
//             </span>
//           </div>

//           {tasks.length === 0 ? (
//             <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-14 text-center">
//               <p className="text-4xl mb-3">📝</p>
//               <p className="text-gray-500 font-medium">No tasks yet.</p>
//               <p className="text-gray-400 text-sm mt-1">Add your first task using the form above.</p>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {tasks.map((t) => (
//                 <div
//                   key={t._id}
//                   className={`bg-white rounded-2xl border shadow-sm p-4 transition-all hover:shadow-md ${
//                     t.completed ? "border-green-200 bg-green-50" : "border-gray-100"
//                   }`}
//                 >
//                   <div className="flex items-start justify-between gap-3 flex-wrap">
//                     <div className="flex items-center gap-3">
//                       <div className={`w-4 h-4 rounded-full flex-shrink-0 border-2 ${
//                         t.completed ? "bg-green-500 border-green-500" : "border-gray-300"
//                       }`} />
//                       <div>
//                         <p className={`font-semibold text-gray-800 ${t.completed ? "line-through text-gray-400" : ""}`}>
//                           {t.title}
//                         </p>
//                         <p className="text-xs text-gray-500 mt-0.5">
//                           {t.subject && <span className="mr-2">📘 {t.subject}</span>}
//                           {t.dueDate && <span>📅 {new Date(t.dueDate).toLocaleDateString()}</span>}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Actions */}
//                     <div className="flex items-center gap-2 ml-auto">
//                       <button
//                         onClick={() => toggleComplete(t._id, t.completed)}
//                         className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
//                           t.completed
//                             ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                             : "bg-green-100 text-green-700 hover:bg-green-200"
//                         }`}
//                       >
//                         {t.completed ? "↩ Undo" : "✓ Complete"}
//                       </button>

//                       {/* 🗑 Delete now opens modal instead of deleting directly */}
//                       <button
//                         onClick={() => confirmDelete(t)}
//                         className="text-xs px-3 py-1.5 rounded-lg font-medium bg-red-100 text-red-600 hover:bg-red-200 transition-all flex items-center gap-1"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                         </svg>
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>

//         {/* ── Teacher Assignments ── */}
//         <section className="mb-8">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
//               <span className="bg-orange-100 text-orange-600 p-1.5 rounded-lg">📚</span>
//               Teacher Assignments
//             </h3>
//             <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
//               {teacherAssignments.length} {teacherAssignments.length === 1 ? "assignment" : "assignments"}
//             </span>
//           </div>

//           {teacherAssignments.length === 0 ? (
//             <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-14 text-center">
//               <p className="text-4xl mb-3">📭</p>
//               <p className="text-gray-500 font-medium">No assignments posted yet.</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {teacherAssignments.map((a) => (
//                 <div
//                   key={a._id}
//                   className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow"
//                 >
//                   <div className="flex items-start justify-between gap-2 flex-wrap">
//                     <h4 className="font-semibold text-gray-800">{a.title}</h4>
//                     <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-full">
//                       {a.subject || "General"}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-500 mt-2">
//                     📅 Due: <span className="font-medium text-gray-700">
//                       {a.dueDate ? new Date(a.dueDate).toLocaleDateString() : "No due date"}
//                     </span>
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     👤 By: <span className="font-medium text-gray-700">{a.teacher?.name || "Teacher"}</span>
//                   </p>
//                   <span className="inline-block mt-3 text-xs italic text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
//                     🔒 Read-only
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>

//       </div>
//     </div>
//   );
// }

























import { useState, useEffect } from "react";
import API from "../api/axios";

// ── Confirmation Modal ──
function DeleteConfirmModal({ task, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
        <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 text-center mb-1">Delete Task?</h3>
        <p className="text-gray-500 text-sm text-center mb-1">You're about to delete:</p>
        <p className="text-blue-600 font-semibold text-center text-sm bg-blue-50 rounded-lg px-3 py-2 mb-3">
          "{task?.title}"
        </p>
        <p className="text-gray-400 text-xs text-center mb-6">This action cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 active:scale-95 transition-all">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm active:scale-95 transition-all shadow-lg shadow-red-500/30 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Progress Bar Component ──
function ProgressBar({ label, value, color, icon, sublabel }) {
  const barColor =
    value === 100 ? "bg-green-500" :
    value >= 50   ? color :
                    "bg-yellow-400";

  const badgeColor =
    value === 100 ? "bg-green-100 text-green-700" :
    value >= 50   ? "bg-blue-100 text-blue-700"   :
                    "bg-yellow-100 text-yellow-700";

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <p className="font-medium text-gray-700 text-sm flex items-center gap-1.5">
          <span>{icon}</span> {label}
          {sublabel && <span className="text-gray-400 font-normal text-xs ml-1">{sublabel}</span>}
        </p>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${badgeColor}`}>
          {value}%
        </span>
      </div>
      <div className="bg-gray-100 rounded-full h-2.5">
        <div
          className={`${barColor} h-2.5 rounded-full transition-all duration-700`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [teacherAssignments, setTeacherAssignments] = useState([]);
  const [completedAssignments, setCompletedAssignments] = useState(new Set());
  const [task, setTask] = useState({ title: "", subject: "", dueDate: "" });
  const [loading, setLoading] = useState(true);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [tasksRes] = await Promise.all([API.get("/tasks")]);
      setTasks(tasksRes.data || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignments = async () => {
    try {
      const res = await API.get("/assignments/public");
      setTeacherAssignments(res.data);
    } catch (error) {
      console.log("Error fetching assignments:", error);
    }
  };

  useEffect(() => {
    fetchAllData();
    fetchAssignments();
    // Load saved completed assignments from localStorage
    const saved = localStorage.getItem("completedAssignments");
    if (saved) setCompletedAssignments(new Set(JSON.parse(saved)));
  }, []);

  const addTask = async () => {
    if (!task.title) return;
    try {
      await API.post("/tasks", task);
      setTask({ title: "", subject: "", dueDate: "" });
      fetchAllData();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await API.put(`/tasks/${id}`, { completed: !completed });
      fetchAllData();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Toggle assignment completion (local state + localStorage)
  const toggleAssignmentComplete = (id) => {
    setCompletedAssignments((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) updated.delete(id);
      else updated.add(id);
      localStorage.setItem("completedAssignments", JSON.stringify([...updated]));
      return updated;
    });
  };

  const confirmDelete = (task) => setTaskToDelete(task);

  const handleDeleteConfirmed = async () => {
    try {
      await API.delete(`/tasks/${taskToDelete._id}`);
      setTaskToDelete(null);
      fetchAllData();
    } catch (error) {
      alert(error.response ? `Error: ${error.response.data.message}` : "Something went wrong!");
      setTaskToDelete(null);
    }
  };

  // ── Progress Calculations ──
  const completedTasks = tasks.filter((t) => t.completed).length;
  const taskProgress = tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);

  const completedAssignmentsCount = teacherAssignments.filter((a) => completedAssignments.has(a._id)).length;
  const assignmentProgress = teacherAssignments.length === 0 ? 0 : Math.round((completedAssignmentsCount / teacherAssignments.length) * 100);

  const overallProgress = tasks.length === 0 && teacherAssignments.length === 0
    ? 0
    : Math.round((taskProgress + assignmentProgress) / 2);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">

      {/* ── Delete Modal ── */}
      {taskToDelete && (
        <DeleteConfirmModal
          task={taskToDelete}
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setTaskToDelete(null)}
        />
      )}

      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">🎓 Student Dashboard</h2>
          <p className="text-gray-500 mt-1">Track your tasks and stay on top of assignments</p>
          <div className="h-1 w-20 bg-blue-500 rounded mt-3" />
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{tasks.length}</p>
            <p className="text-xs text-gray-500 mt-1">Total Tasks</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
            <p className="text-xs text-gray-500 mt-1">Tasks Done</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{teacherAssignments.length}</p>
            <p className="text-xs text-gray-500 mt-1">Assignments</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-orange-500">{completedAssignmentsCount}</p>
            <p className="text-xs text-gray-500 mt-1">Assignments Done</p>
          </div>
        </div>

        {/* ── Progress Section ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-5 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg">📊</span>
            Progress Overview
          </h3>

          <div className="flex flex-col gap-5">

            {/* Task Progress */}
            <ProgressBar
              label="My Tasks"
              value={taskProgress}
              color="bg-blue-500"
              icon="📋"
              sublabel={`${completedTasks} / ${tasks.length} completed`}
            />

            {/* Assignment Progress */}
            <ProgressBar
              label="Assignments"
              value={assignmentProgress}
              color="bg-purple-500"
              icon="📚"
              sublabel={`${completedAssignmentsCount} / ${teacherAssignments.length} completed`}
            />

            {/* Divider */}
            <div className="h-px bg-gray-100" />

            {/* Overall */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="font-semibold text-gray-800 flex items-center gap-1.5">
                  <span>🏆</span> Overall Progress
                  <span className="text-gray-400 font-normal text-xs ml-1">(average of both)</span>
                </p>
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                  overallProgress === 100 ? "bg-green-100 text-green-700" :
                  overallProgress >= 50  ? "bg-blue-100 text-blue-700"   :
                                           "bg-yellow-100 text-yellow-700"
                }`}>
                  {overallProgress}%
                </span>
              </div>
              <div className="bg-gray-100 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all duration-700 ${
                    overallProgress === 100 ? "bg-green-500" :
                    overallProgress >= 50  ? "bg-blue-500"  :
                                             "bg-yellow-400"
                  }`}
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              {overallProgress === 100 && (
                <p className="text-green-600 text-sm mt-2 font-medium">🎉 Everything completed! Great work!</p>
              )}
            </div>
          </div>
        </div>

        {/* ── Add Task ── */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg">✏️</span>
            Add New Task
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="Task Title"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              className="border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            />
            <input
              type="text"
              placeholder="Subject"
              value={task.subject}
              onChange={(e) => setTask({ ...task, subject: e.target.value })}
              className="border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            />
            <input
              type="date"
              value={task.dueDate}
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
              className="border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            />
            <button
              type="button"
              onClick={addTask}
              className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all"
            >
              + Add Task
            </button>
          </div>
        </section>

        {/* ── Your Tasks ── */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-600 p-1.5 rounded-lg">📋</span>
              Your Tasks
            </h3>
            <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
            </span>
          </div>

          {tasks.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-14 text-center">
              <p className="text-4xl mb-3">📝</p>
              <p className="text-gray-500 font-medium">No tasks yet.</p>
              <p className="text-gray-400 text-sm mt-1">Add your first task using the form above.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {tasks.map((t) => (
                <div
                  key={t._id}
                  className={`bg-white rounded-2xl border shadow-sm p-4 transition-all hover:shadow-md ${
                    t.completed ? "border-green-200 bg-green-50" : "border-gray-100"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full flex-shrink-0 border-2 ${
                        t.completed ? "bg-green-500 border-green-500" : "border-gray-300"
                      }`} />
                      <div>
                        <p className={`font-semibold text-gray-800 ${t.completed ? "line-through text-gray-400" : ""}`}>
                          {t.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {t.subject && <span className="mr-2">📘 {t.subject}</span>}
                          {t.dueDate && <span>📅 {new Date(t.dueDate).toLocaleDateString()}</span>}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      <button
                        onClick={() => toggleComplete(t._id, t.completed)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                          t.completed
                            ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        {t.completed ? "↩ Undo" : "✓ Complete"}
                      </button>
                      <button
                        onClick={() => confirmDelete(t)}
                        className="text-xs px-3 py-1.5 rounded-lg font-medium bg-red-100 text-red-600 hover:bg-red-200 transition-all flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Teacher Assignments ── */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
              <span className="bg-orange-100 text-orange-600 p-1.5 rounded-lg">📚</span>
              Teacher Assignments
            </h3>
            <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
              {teacherAssignments.length} {teacherAssignments.length === 1 ? "assignment" : "assignments"}
            </span>
          </div>

          {teacherAssignments.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-14 text-center">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-gray-500 font-medium">No assignments posted yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teacherAssignments.map((a) => {
                const isDone = completedAssignments.has(a._id);
                return (
                  <div
                    key={a._id}
                    className={`bg-white rounded-2xl border shadow-sm p-4 hover:shadow-md transition-shadow ${
                      isDone ? "border-green-200 bg-green-50" : "border-gray-100"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <h4 className={`font-semibold ${isDone ? "line-through text-gray-400" : "text-gray-800"}`}>
                        {a.title}
                      </h4>
                      <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-full">
                        {a.subject || "General"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      📅 Due: <span className="font-medium text-gray-700">
                        {a.dueDate ? new Date(a.dueDate).toLocaleDateString() : "No due date"}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      👤 By: <span className="font-medium text-gray-700">{a.teacher?.name || "Teacher"}</span>
                    </p>

                    {/* Mark as done button */}
                    <button
                      onClick={() => toggleAssignmentComplete(a._id)}
                      className={`mt-3 text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                        isDone
                          ? "bg-gray-100 text-gray-500 hover:bg-gray-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {isDone ? "↩ Mark Incomplete" : "✓ Mark as Done"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}