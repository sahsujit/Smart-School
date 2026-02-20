

import { useState, useEffect } from "react";
import API from "../api/axios";

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [notice, setNotice] = useState({ title: "", description: "", category: "" });
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");

  const fetchNotices = async () => {
    try {
      const res = await API.get("/notices");
      setNotices(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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

  const categoryColor = (cat) => {
    const map = {
      exam: "bg-red-100 text-red-600",
      holiday: "bg-green-100 text-green-600",
      event: "bg-purple-100 text-purple-600",
      general: "bg-blue-100 text-blue-600",
    };
    return map[(cat || "").toLowerCase()] || "bg-gray-100 text-gray-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading Notices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">🔔 Notices</h2>
          <p className="text-gray-500 mt-1">Stay updated with the latest school announcements</p>
          <div className="h-1 w-20 bg-green-500 rounded mt-3" />
        </div>

        {/* ── Add Notice Form (Teacher Only) ── */}
        {role === "teacher" && (
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <span className="bg-green-100 text-green-600 p-1.5 rounded-lg">📢</span>
              Post a New Notice
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="Notice Title"
                value={notice.title}
                onChange={(e) => setNotice({ ...notice, title: e.target.value })}
                className="border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
              />
              <input
                type="text"
                placeholder="Category (e.g. Exam, Holiday)"
                value={notice.category}
                onChange={(e) => setNotice({ ...notice, category: e.target.value })}
                className="border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Description"
                value={notice.description}
                onChange={(e) => setNotice({ ...notice, description: e.target.value })}
                className="border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 flex-1"
              />
              <button
                onClick={addNotice}
                className="bg-green-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 active:scale-95 transition-all whitespace-nowrap"
              >
                + Post Notice
              </button>
            </div>
          </section>
        )}

        {/* ── Notices Count ── */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700">All Notices</h3>
          <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
            {notices.length} {notices.length === 1 ? "notice" : "notices"}
          </span>
        </div>

        {/* ── Empty State ── */}
        {notices.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-16 text-center">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-gray-500 font-medium">No notices posted yet.</p>
            {role === "teacher" && (
              <p className="text-gray-400 text-sm mt-1">Use the form above to post your first notice.</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {notices.map((n, index) => (
              <div
                key={n._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    {/* Index badge */}
                    <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <h4 className="font-semibold text-gray-800 text-base">{n.title}</h4>
                  </div>
                  {/* Category badge */}
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${categoryColor(n.category)}`}>
                    {n.category || "General"}
                  </span>
                </div>

                {/* Description */}
                {n.description && (
                  <p className="text-gray-600 text-sm mt-3 ml-12 leading-relaxed">{n.description}</p>
                )}

                {/* Footer */}
                <div className="mt-3 ml-12 flex items-center gap-2 text-xs text-gray-400">
                  <span>👤</span>
                  <span>Posted by <span className="font-medium text-gray-600">{n.teacher?.name || "Teacher"}</span></span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}