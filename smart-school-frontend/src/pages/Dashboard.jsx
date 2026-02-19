import { useState, useEffect } from "react";
import API from "../api/axios";
import Card from "../components/Card";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [teacherAssignments, setTeacherAssignments] = useState([]);
  const [task, setTask] = useState({ title: "", subject: "", dueDate: "" });
  const [loading, setLoading] = useState(true);


  const fetchAllData = async () => {
    try {
      setLoading(true);

      const [tasksRes] = await Promise.all([
        API.get("/tasks"),
        // API.get("/assignments"),
       
      ]);

      setTasks(tasksRes.data || []);
   
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };


const fetchAssignments = async () => {
  try {
    const res = await API.get("/assignments/public"); // ensure student token is present
    setTeacherAssignments(res.data);
  } catch (error) {
    console.log("Error fetching assignments:", error);
  }
};







  useEffect(() => {
    fetchAllData();
    fetchAssignments();

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

 const deleteTask = async (id) => {
  try {
    const res = await API.delete(`/tasks/${id}`);
    alert(res.data.message); // Shows "Task removed"
    fetchAllData();
  } catch (error) {
    if (error.response) {
      alert(`Error: ${error.response.data.message}`);
    } else {
      alert("Something went wrong!");
    }
  }
};

  // ================= PROGRESS =================

  const progress =
    tasks.length === 0
      ? 0
      : Math.round(
          (tasks.filter((t) => t.completed).length / tasks.length) * 100
        );

  // ================= UI =================

  if (loading) {
    return (
      <div className="p-6 text-center text-lg font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Student Dashboard</h2>

      {/* ================= ADD TASK ================= */}
      <div className="mb-6 flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="border p-2 rounded w-40"
        />
        <input
          type="text"
          placeholder="Subject"
          value={task.subject}
          onChange={(e) => setTask({ ...task, subject: e.target.value })}
          className="border p-2 rounded w-40"
        />
        <input
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          className="border p-2 rounded"
        />
        <button
        type="button"
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </div>

      {/* ================= PROGRESS BAR ================= */}
      <div className="mb-6">
        <p className="mb-1 font-semibold">Progress: {progress}%</p>
        <div className="bg-gray-300 rounded h-4">
          <div
            className="bg-blue-600 h-4 rounded transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ================= STUDENT TASKS ================= */}
      <h3 className="text-2xl font-semibold mb-2">Your Tasks</h3>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((t) => (
          <Card
            key={t._id}
            title={t.title}
            description={`Subject: ${t.subject || "N/A"} | Due: ${
              t.dueDate
                ? new Date(t.dueDate).toLocaleDateString()
                : "No due date"
            }`}
          >
            <button
              onClick={() => toggleComplete(t._id, t.completed)}
              className="text-sm underline mr-2"
            >
              {t.completed ? "Undo" : "Complete"}
            </button>

            <button
              onClick={() => deleteTask(t._id)}
              className="text-sm text-red-500 underline"
            >
              Delete
            </button>
          </Card>
        ))
      )}

      {/* ================= TEACHER ASSIGNMENTS ================= */}
      <h3 className="text-2xl font-semibold mt-8 mb-2">
        Teacher Assignments
      </h3>

      {teacherAssignments.length === 0 ? (
        <p>No assignments yet.</p>
      ) : (
        teacherAssignments.map((a) => (
          <Card
            key={a._id}
            title={a.title}
            description={`Subject: ${a.subject || "N/A"} | Due: ${
              a.dueDate
                ? new Date(a.dueDate).toLocaleDateString()
                : "No due date"
            } | Posted by: ${a.teacher?.name || "Teacher"}`}
          >
            <span className="text-sm italic text-gray-500">
              Read-only
            </span>
          </Card>
        ))
      )}

    
    
    </div>
  );
}



















