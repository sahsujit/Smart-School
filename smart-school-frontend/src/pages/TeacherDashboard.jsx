// import { useState, useEffect } from "react";
// import API from "../api/axios";
// import Card from "../components/Card";

// export default function TeacherDashboard() {
//   const [assignments, setAssignments] = useState([]);
//   const [studentsProgress, setStudentsProgress] = useState([]);
//   const [notices, setNotices] = useState([]);
//   const [assignment, setAssignment] = useState({ title: "", subject: "", dueDate: "" });
//   const [notice, setNotice] = useState({ title: "", description: "", category: "" });

//   // Fetch all data on mount
//   useEffect(() => {
//     fetchAssignments();
//     fetchStudentsProgress();
//     fetchNotices();
//   }, []);

//   // Fetch assignments
//   const fetchAssignments = async () => {
//     try {
//       const res = await API.get("/assignments/teacher");
//       setAssignments(res.data);
//     } catch (err) {
//       console.error("Error fetching assignments:", err);
//     }
//   };

//   // Fetch student progress
//   const fetchStudentsProgress = async () => {
//     try {
//       const res = await API.get("/admin/students-progress");
//       setStudentsProgress(res.data);
//     } catch (err) {
//       console.error("Error fetching student progress:", err);
//     }
//   };

//   // Fetch notices
//   const fetchNotices = async () => {
//     try {
//       const res = await API.get("/notices");
//       setNotices(res.data);
//     } catch (err) {
//       console.error("Error fetching notices:", err);
//     }
//   };

//   // Add assignment
//   const addAssignment = async () => {
//     if (!assignment.title || !assignment.subject || !assignment.dueDate) return;
//     try {
//       await API.post("/assignments", assignment);
//       setAssignment({ title: "", subject: "", dueDate: "" });
//       fetchAssignments();
//     } catch (err) {
//       console.error("Error adding assignment:", err);
//     }
//   };

//   // Add notice
//   const addNotice = async () => {
//     if (!notice.title || !notice.description || !notice.category) return;
//     try {
//       await API.post("/notices", notice);
//       setNotice({ title: "", description: "", category: "" });
//       fetchNotices();
//     } catch (err) {
//       console.error("Error adding notice:", err);
//     }
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h2 className="text-3xl font-bold mb-4">Teacher Dashboard</h2>

//       {/* Add Assignment */}
//       <h3 className="text-2xl font-semibold mb-2">Add Assignment</h3>
//       <div className="mb-6 flex gap-2 flex-wrap">
//         <input
//           type="text"
//           placeholder="Title"
//           value={assignment.title}
//           onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
//           className="border p-2 rounded w-40"
//         />
//         <input
//           type="text"
//           placeholder="Subject"
//           value={assignment.subject}
//           onChange={(e) => setAssignment({ ...assignment, subject: e.target.value })}
//           className="border p-2 rounded w-40"
//         />
//         <input
//           type="date"
//           value={assignment.dueDate}
//           onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
//           className="border p-2 rounded"
//         />
//         <button
//           onClick={addAssignment}
//           className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
//         >
//           Add
//         </button>
//       </div>

//       {/* Assignments List */}
//       <h3 className="text-2xl font-semibold mb-2">Your Assignments</h3>
//       {assignments.length === 0 && <p>No assignments yet.</p>}
//       {assignments.map((a) => (
//         <Card
//           key={a._id}
//           title={a.title}
//           description={`Subject: ${a.subject} | Due: ${new Date(a.dueDate).toLocaleDateString()}`}
//         />
//       ))}

//       {/* Add Notice */}
//       <h3 className="text-2xl font-semibold mt-6 mb-2">Add Notice</h3>
//       <div className="mb-6 flex gap-2 flex-wrap">
//         <input
//           type="text"
//           placeholder="Title"
//           value={notice.title}
//           onChange={(e) => setNotice({ ...notice, title: e.target.value })}
//           className="border p-2 rounded w-40"
//         />
//         <input
//           type="text"
//           placeholder="Category"
//           value={notice.category}
//           onChange={(e) => setNotice({ ...notice, category: e.target.value })}
//           className="border p-2 rounded w-40"
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={notice.description}
//           onChange={(e) => setNotice({ ...notice, description: e.target.value })}
//           className="border p-2 rounded w-80"
//         />
//         <button
//           onClick={addNotice}
//           className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition"
//         >
//           Add Notice
//         </button>
//       </div>

//       {/* All Notices */}
//       <h3 className="text-2xl font-semibold mt-6 mb-2">All Notices</h3>
//       {notices.length === 0 && <p>No notices yet.</p>}
//       {notices.map((n) => (
//         <Card
//           key={n._id}
//           title={n.title}
//           description={`${n.description} | Category: ${n.category} | By: ${n.teacher?.name || "Unknown"}`}
//         />
//       ))}

//       {/* Student Progress */}
//       <h3 className="text-2xl font-semibold mt-6 mb-2">Student Progress</h3>
//       {studentsProgress.length === 0 && <p>No student data yet.</p>}
//       {studentsProgress.map((s) => (
//         <Card
//           key={s.email}
//           title={s.student}
//           description={`Email: ${s.email} | Progress: ${s.progress}%`}
//         >
//           <div className="w-full bg-gray-300 rounded h-3 mt-1">
//             <div
//               className="bg-green-500 h-3 rounded transition-all"
//               style={{ width: `${s.progress}%` }}
//             />
//           </div>
//         </Card>
//       ))}
//     </div>
//   );
// }





























import { useState, useEffect } from "react";
import API from "../api/axios";
import Card from "../components/Card";

export default function TeacherDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [studentsProgress, setStudentsProgress] = useState([]);
  const [notices, setNotices] = useState([]);
  const [assignment, setAssignment] = useState({ title: "", subject: "", dueDate: "" });
  const [notice, setNotice] = useState({ title: "", description: "", category: "" });
  const [loading, setLoading] = useState(true);

  // ================= FETCH ALL DATA =================
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [assignRes, progressRes, noticesRes] = await Promise.all([
          API.get("/assignments/teacher"),
          API.get("/admin/students-progress"),
          API.get("/notices"),
        ]);

        setAssignments(assignRes.data || []);
        setStudentsProgress(progressRes.data || []);
        setNotices(noticesRes.data || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // ================= ADD ASSIGNMENT =================
  // const addAssignment = async () => {
  //   if (!assignment.title || !assignment.subject || !assignment.dueDate) {
  //     alert("Please fill all assignment fields");
  //     return;
  //   }

  //   try {
  //     await API.post("/assignments", assignment);
  //     setAssignment({ title: "", subject: "", dueDate: "" });
  //     // Refetch assignments
  //     const res = await API.get("/assignments/teacher");
  //     setAssignments(res.data || []);
  //   } catch (err) {
  //     console.error("Error adding assignment:", err);
  //   }
  // };


const addAssignment = async () => {
  if (!assignment.title || !assignment.subject || !assignment.dueDate) {
    alert("Please fill all assignment fields");
    return;
  }

  try {
    await API.post("/assignments", assignment); // now matches backend
    setAssignment({ title: "", subject: "", dueDate: "" });

    // Refetch assignments
    const res = await API.get("/assignments/teacher");
    setAssignments(res.data || []);
  } catch (err) {
    console.error("Error adding assignment:", err);
  }
};

  // ================= ADD NOTICE =================
  const addNotice = async () => {
    if (!notice.title || !notice.description || !notice.category) {
      alert("Please fill all notice fields");
      return;
    }

    try {
      await API.post("/notices", notice);
      setNotice({ title: "", description: "", category: "" });
      // Refetch notices
      const res = await API.get("/notices");
      setNotices(res.data || []);
    } catch (err) {
      console.error("Error adding notice:", err);
    }
  };

  // ================= LOADING STATE =================
  if (loading) {
    return <div className="p-6 text-center text-lg font-semibold">Loading Dashboard...</div>;
  }

  // ================= RENDER =================
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Teacher Dashboard</h2>

      {/* Add Assignment */}
      <h3 className="text-2xl font-semibold mb-2">Add Assignment</h3>
      <div className="mb-6 flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Title"
          value={assignment.title}
          onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
          className="border p-2 rounded w-40"
        />
        <input
          type="text"
          placeholder="Subject"
          value={assignment.subject}
          onChange={(e) => setAssignment({ ...assignment, subject: e.target.value })}
          className="border p-2 rounded w-40"
        />
        <input
          type="date"
          value={assignment.dueDate}
          onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
          className="border p-2 rounded"
        />
        <button
          onClick={addAssignment}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      {/* Assignments List */}
      <h3 className="text-2xl font-semibold mb-2">Your Assignments</h3>
      {assignments.length === 0 && <p>No assignments yet.</p>}
      {assignments.map((a) => (
        <Card
          key={a._id}
          title={a.title}
          description={`Subject: ${a.subject || "N/A"} | Due: ${
            a.dueDate ? new Date(a.dueDate).toLocaleDateString("en-GB") : "No due date"
          }`}
        />
      ))}

      {/* Add Notice */}
      <h3 className="text-2xl font-semibold mt-6 mb-2">Add Notice</h3>
      <div className="mb-6 flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Title"
          value={notice.title}
          onChange={(e) => setNotice({ ...notice, title: e.target.value })}
          className="border p-2 rounded w-40"
        />
        <input
          type="text"
          placeholder="Category"
          value={notice.category}
          onChange={(e) => setNotice({ ...notice, category: e.target.value })}
          className="border p-2 rounded w-40"
        />
        <input
          type="text"
          placeholder="Description"
          value={notice.description}
          onChange={(e) => setNotice({ ...notice, description: e.target.value })}
          className="border p-2 rounded w-80"
        />
        <button
          onClick={addNotice}
          className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition"
        >
          Add Notice
        </button>
      </div>

      {/* All Notices */}
      <h3 className="text-2xl font-semibold mt-6 mb-2">All Notices</h3>
      {notices.length === 0 && <p>No notices yet.</p>}
      {notices.map((n) => (
        <Card
          key={n._id}
          title={n.title}
          description={`${n.description} | Category: ${n.category} | By: ${n.teacher?.name || "Unknown"}`}
        />
      ))}

      {/* Student Progress */}
      <h3 className="text-2xl font-semibold mt-6 mb-2">Student Progress</h3>
      {studentsProgress.length === 0 && <p>No student data yet.</p>}
      {studentsProgress.map((s) => (
        <Card
          key={s.email}
          title={s.student}
          description={`Email: ${s.email} | Progress: ${s.progress}%`}
        >
          <div className="w-full bg-gray-300 rounded h-3 mt-1">
            <div
              className="bg-green-500 h-3 rounded transition-all"
              style={{ width: `${s.progress}%` }}
            />
          </div>
        </Card>
      ))}
    </div>
  );
}
