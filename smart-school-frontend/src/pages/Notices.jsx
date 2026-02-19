// import { useState, useEffect } from "react";
// import API from "../api/axios";
// import Card from "../components/Card";

// export default function Notices() {
//   const [notices, setNotices] = useState([]);
//   const [notice, setNotice] = useState({
//     title: "",
//     description: "",
//     category: "",
//   });

//   const role = localStorage.getItem("role"); // student or teacher

//   const fetchNotices = async () => {
//     try {
//       const res = await API.get("/notices");
//       setNotices(res.data || []);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchNotices();
//   }, []);

//   const addNotice = async () => {
//     if (!notice.title) return;

//     try {
//       await API.post("/notices", notice);
//       setNotice({ title: "", description: "", category: "" });
//       fetchNotices();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold mb-4">Notices</h2>

//       {/* ✅ Only Teacher Can See Create Form */}
//       {role === "teacher" && (
//         <div className="mb-6 flex gap-2 flex-wrap">
//           <input
//             type="text"
//             placeholder="Title"
//             value={notice.title}
//             onChange={(e) =>
//               setNotice({ ...notice, title: e.target.value })
//             }
//             className="border p-2 rounded w-40"
//           />
//           <input
//             type="text"
//             placeholder="Category"
//             value={notice.category}
//             onChange={(e) =>
//               setNotice({ ...notice, category: e.target.value })
//             }
//             className="border p-2 rounded w-40"
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             value={notice.description}
//             onChange={(e) =>
//               setNotice({ ...notice, description: e.target.value })
//             }
//             className="border p-2 rounded w-80"
//           />
//           <button
//             onClick={addNotice}
//             className="bg-green-600 text-white px-4 py-2 rounded"
//           >
//             Add Notice
//           </button>
//         </div>
//       )}

//       {/* All Users Can See Notices */}
//       {notices.length === 0 ? (
//         <p>No notices yet.</p>
//       ) : (
//         notices.map((n) => (
//           <Card
//             key={n._id}
//             title={n.title}
//             description={`${n.description || ""} | Category: ${
//               n.category || "General"
//             } | By: ${n.teacher?.name || "Teacher"}`}
//           />
//         ))
//       )}
//     </div>
//   );
// }









import { useState, useEffect } from "react";
import API from "../api/axios";
import Card from "../components/Card";

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [notice, setNotice] = useState({
    title: "",
    description: "",
    category: "",
  });

  const role = localStorage.getItem("role"); // student or teacher

  const fetchNotices = async () => {
    try {
      const res = await API.get("/notices");
      setNotices(res.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const addNotice = async () => {
    if (!notice.title) return;

    try {
      await API.post("/notices", notice);
      setNotice({ title: "", description: "", category: "" });
      fetchNotices();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Notices</h2>

      {/* ✅ Only Teacher Can See Create Form */}
      {role === "teacher" && (
        <div className="mb-6 flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Title"
            value={notice.title}
            onChange={(e) =>
              setNotice({ ...notice, title: e.target.value })
            }
            className="border p-2 rounded w-40"
          />
          <input
            type="text"
            placeholder="Category"
            value={notice.category}
            onChange={(e) =>
              setNotice({ ...notice, category: e.target.value })
            }
            className="border p-2 rounded w-40"
          />
          <input
            type="text"
            placeholder="Description"
            value={notice.description}
            onChange={(e) =>
              setNotice({ ...notice, description: e.target.value })
            }
            className="border p-2 rounded w-80"
          />
          <button
            onClick={addNotice}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Notice
          </button>
        </div>
      )}

      {/* All Users Can See Notices */}
      {notices.length === 0 ? (
        <p>No notices yet.</p>
      ) : (
        notices.map((n) => (
          <Card
            key={n._id}
            title={n.title}
            description={`${n.description || ""} | Category: ${
              n.category || "General"
            } | By: ${n.teacher?.name || "Teacher"}`}
          />
        ))
      )}
    </div>
  );
}
