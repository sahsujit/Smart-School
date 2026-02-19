export default function Footer() {
  return (
    <footer className="bg-indigo-900 text-white py-6 mt-20">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h3 className="text-xl font-semibold mb-2">
          Smart School Management System
        </h3>

        <p className="text-sm mb-4 text-gray-300">
          A modern MERN-based platform for students and teachers to manage
          assignments, notices, and academic progress efficiently.
        </p>

        <div className="flex justify-center gap-6 text-sm text-gray-400">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Contact</span>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          © {new Date().getFullYear()} Smart School Management System. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
