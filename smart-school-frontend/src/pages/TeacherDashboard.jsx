
import { useState, useEffect } from "react";
import API from "../api/axios";

export default function TeacherDashboard() {
  const [assignments, setAssignments]         = useState([]);
  const [studentsProgress, setStudentsProgress] = useState([]);
  const [notices, setNotices]                 = useState([]);
  const [assignment, setAssignment]           = useState({ title: "", subject: "", dueDate: "" });
  const [notice, setNotice]                   = useState({ title: "", description: "", category: "" });
  const [loading, setLoading]                 = useState(true);

  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        let assignRes   = { data: [] };
        let progressRes = { data: [] };
        let noticesRes  = { data: [] };

        try { assignRes   = await API.get("/assignments/teacher"); }       catch { console.warn("Assignments API failed"); }
        try { progressRes = await API.get("/admin/students-progress"); }   catch { console.warn("Progress API failed"); }
        try { noticesRes  = await API.get("/notices"); }                   catch { console.warn("Notices API failed"); }

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

  const addAssignment = async () => {
    if (!assignment.title || !assignment.subject || !assignment.dueDate) {
      alert("Please fill all assignment fields");
      return;
    }
    try {
      await API.post("/assignments", assignment);
      setAssignment({ title: "", subject: "", dueDate: "" });
      const res = await API.get("/assignments/teacher");
      setAssignments(res.data || []);
    } catch { alert("Failed to add assignment"); }
  };

  const addNotice = async () => {
    if (!notice.title || !notice.description || !notice.category) {
      alert("Please fill all notice fields");
      return;
    }
    try {
      await API.post("/notices", notice);
      setNotice({ title: "", description: "", category: "" });
      const res = await API.get("/notices");
      setNotices(res.data || []);
    } catch { alert("Failed to add notice"); }
  };

  // ── Class-wide averages ──
  const totalStudents       = studentsProgress.length;
  const avgTaskProgress     = totalStudents === 0 ? 0 : Math.round(studentsProgress.reduce((s, x) => s + (x.progress ?? 0), 0) / totalStudents);
  const avgAssignmentProgress = totalStudents === 0 ? 0 : Math.round(studentsProgress.reduce((s, x) => s + (x.assignmentProgress ?? 0), 0) / totalStudents);
  const avgOverall          = Math.round((avgTaskProgress + avgAssignmentProgress) / 2);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-semibold text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">👨‍🏫 Teacher Dashboard</h2>
          <p className="text-gray-500 mt-1">Manage assignments, notices, and track student progress</p>
          <div className="h-1 w-20 bg-blue-500 rounded mt-3" />
        </div>

        {/* ── Class Overview Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{totalStudents}</p>
            <p className="text-xs text-gray-500 mt-1">Total Students</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{assignments.length}</p>
            <p className="text-xs text-gray-500 mt-1">Assignments</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-yellow-500">{notices.length}</p>
            <p className="text-xs text-gray-500 mt-1">Notices</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{avgOverall}%</p>
            <p className="text-xs text-gray-500 mt-1">Class Average</p>
          </div>
        </div>

        {/* ── Class Progress Overview ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-5 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg">📊</span>
            Class Progress Overview
          </h3>
          <div className="flex flex-col gap-5">

            {/* Avg Task Progress */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                  <span>📋</span> Avg Task Completion
                  <span className="text-gray-400 text-xs font-normal ml-1">across all students</span>
                </p>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  avgTaskProgress >= 75 ? "bg-green-100 text-green-700" :
                  avgTaskProgress >= 40 ? "bg-blue-100 text-blue-700" :
                  "bg-yellow-100 text-yellow-700"
                }`}>{avgTaskProgress}%</span>
              </div>
              <div className="bg-gray-100 rounded-full h-2.5">
                <div className={`h-2.5 rounded-full transition-all duration-700 ${
                  avgTaskProgress >= 75 ? "bg-green-500" :
                  avgTaskProgress >= 40 ? "bg-blue-500" : "bg-yellow-400"
                }`} style={{ width: `${avgTaskProgress}%` }} />
              </div>
            </div>

            {/* Avg Assignment Progress */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                  <span>📚</span> Avg Assignment Completion
                  <span className="text-gray-400 text-xs font-normal ml-1">across all students</span>
                </p>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  avgAssignmentProgress >= 75 ? "bg-green-100 text-green-700" :
                  avgAssignmentProgress >= 40 ? "bg-purple-100 text-purple-700" :
                  "bg-yellow-100 text-yellow-700"
                }`}>{avgAssignmentProgress}%</span>
              </div>
              <div className="bg-gray-100 rounded-full h-2.5">
                <div className={`h-2.5 rounded-full transition-all duration-700 ${
                  avgAssignmentProgress >= 75 ? "bg-green-500" :
                  avgAssignmentProgress >= 40 ? "bg-purple-500" : "bg-yellow-400"
                }`} style={{ width: `${avgAssignmentProgress}%` }} />
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            {/* Overall Class Average */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="font-semibold text-gray-800 flex items-center gap-1.5">
                  <span>🏆</span> Overall Class Average
                  <span className="text-gray-400 text-xs font-normal ml-1">(average of both)</span>
                </p>
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                  avgOverall >= 75 ? "bg-green-100 text-green-700" :
                  avgOverall >= 40 ? "bg-blue-100 text-blue-700" :
                  "bg-yellow-100 text-yellow-700"
                }`}>{avgOverall}%</span>
              </div>
              <div className="bg-gray-100 rounded-full h-4">
                <div className={`h-4 rounded-full transition-all duration-700 ${
                  avgOverall >= 75 ? "bg-green-500" :
                  avgOverall >= 40 ? "bg-blue-500" : "bg-yellow-400"
                }`} style={{ width: `${avgOverall}%` }} />
              </div>
              {avgOverall === 100 && (
                <p className="text-green-600 text-sm mt-2 font-medium">🎉 Entire class completed everything!</p>
              )}
            </div>
          </div>
        </div>

        {/* ── Add Assignment ── */}
        {role === "teacher" && (
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg">📝</span>
              Add Assignment
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <input type="text" placeholder="Title" value={assignment.title}
                onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
                className="border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" />
              <input type="text" placeholder="Subject" value={assignment.subject}
                onChange={(e) => setAssignment({ ...assignment, subject: e.target.value })}
                className="border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" />
              <input type="date" value={assignment.dueDate}
                onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
                className="border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" />
              <button onClick={addAssignment}
                className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all">
                + Add Assignment
              </button>
            </div>
          </section>
        )}

        {/* ── Assignments List ── */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span className="bg-purple-100 text-purple-600 p-1.5 rounded-lg">📚</span>
            All Assignments
            <span className="ml-auto text-sm font-normal bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">{assignments.length} total</span>
          </h3>
          {assignments.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-10 text-center text-gray-400">No assignments yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assignments.map((a) => (
                <div key={a._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-gray-800 text-base">{a.title}</h4>
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">{a.subject}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">📅 Due: <span className="font-medium text-gray-700">{new Date(a.dueDate).toLocaleDateString()}</span></p>
                  <p className="text-sm text-gray-500">👤 By: <span className="font-medium text-gray-700">{a.teacher?.name || "Unknown"}</span></p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Add Notice ── */}
        {role === "teacher" && (
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <span className="bg-green-100 text-green-600 p-1.5 rounded-lg">📢</span>
              Add Notice
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <input type="text" placeholder="Title" value={notice.title}
                onChange={(e) => setNotice({ ...notice, title: e.target.value })}
                className="border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 w-full" />
              <input type="text" placeholder="Category" value={notice.category}
                onChange={(e) => setNotice({ ...notice, category: e.target.value })}
                className="border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 w-full" />
              <input type="text" placeholder="Description" value={notice.description}
                onChange={(e) => setNotice({ ...notice, description: e.target.value })}
                className="border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 w-full" />
              <button onClick={addNotice}
                className="bg-green-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 active:scale-95 transition-all">
                + Add Notice
              </button>
            </div>
          </section>
        )}

        {/* ── All Notices ── */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span className="bg-yellow-100 text-yellow-600 p-1.5 rounded-lg">🔔</span>
            All Notices
            <span className="ml-auto text-sm font-normal bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full">{notices.length} total</span>
          </h3>
          {notices.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-10 text-center text-gray-400">No notices yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notices.map((n) => (
                <div key={n._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-gray-800 text-base">{n.title}</h4>
                    <span className="text-xs bg-yellow-50 text-yellow-600 px-2 py-1 rounded-full">{n.category}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{n.description}</p>
                  <p className="text-sm text-gray-500 mt-1">👤 By: <span className="font-medium text-gray-700">{n.teacher?.name || "Unknown"}</span></p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Individual Student Progress ── */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span className="bg-red-100 text-red-500 p-1.5 rounded-lg">👥</span>
            Individual Student Progress
            <span className="ml-auto text-sm font-normal bg-red-100 text-red-600 px-2.5 py-1 rounded-full">{studentsProgress.length} students</span>
          </h3>
          {studentsProgress.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-10 text-center text-gray-400">No student data yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studentsProgress.map((s) => {
                const studentName   = s.student?.name  || s.student  || "Unknown";
                const studentEmail  = s.student?.email || s.email    || "N/A";
                const taskProg      = s.progress           ?? 0;
                const assignProg    = s.assignmentProgress ?? 0;
                const overallProg   = s.overallProgress    ?? Math.round((taskProg + assignProg) / 2);

                // Detail counts from backend
                const taskDone      = s.taskStats?.completed       ?? "—";
                const taskTotal     = s.taskStats?.total           ?? "—";
                const assignDone    = s.assignmentStats?.completed ?? "—";
                const assignTotal   = s.assignmentStats?.total     ?? "—";

                const badgeColor =
                  overallProg >= 75 ? "bg-green-100 text-green-700" :
                  overallProg >= 40 ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-600";

                return (
                  <div key={studentEmail} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">

                    {/* Student Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {studentName.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 truncate">{studentName}</p>
                        <p className="text-xs text-gray-500 truncate">{studentEmail}</p>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${badgeColor}`}>
                        {overallProg}%
                      </span>
                    </div>

                    {/* Task Progress */}
                    <div className="mb-2">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <span>📋</span> Tasks
                          <span className="text-gray-400 ml-1">({taskDone}/{taskTotal})</span>
                        </p>
                        <p className="text-xs font-semibold text-gray-600">{taskProg}%</p>
                      </div>
                      <div className="bg-gray-100 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full transition-all duration-500 ${
                          taskProg >= 75 ? "bg-green-500" :
                          taskProg >= 40 ? "bg-blue-500" : "bg-yellow-400"
                        }`} style={{ width: `${taskProg}%` }} />
                      </div>
                    </div>

                    {/* Assignment Progress */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <span>📚</span> Assignments
                          <span className="text-gray-400 ml-1">({assignDone}/{assignTotal})</span>
                        </p>
                        <p className="text-xs font-semibold text-gray-600">{assignProg}%</p>
                      </div>
                      <div className="bg-gray-100 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full transition-all duration-500 ${
                          assignProg >= 75 ? "bg-green-500" :
                          assignProg >= 40 ? "bg-purple-500" : "bg-yellow-400"
                        }`} style={{ width: `${assignProg}%` }} />
                      </div>
                    </div>

                    {/* Overall */}
                    <div className="border-t border-gray-100 pt-3">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                          <span>🏆</span> Overall
                        </p>
                        <p className="text-xs font-bold text-gray-700">{overallProg}%</p>
                      </div>
                      <div className="bg-gray-100 rounded-full h-2.5">
                        <div className={`h-2.5 rounded-full transition-all duration-500 ${
                          overallProg >= 75 ? "bg-green-500" :
                          overallProg >= 40 ? "bg-blue-500" : "bg-red-400"
                        }`} style={{ width: `${overallProg}%` }} />
                      </div>
                    </div>

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