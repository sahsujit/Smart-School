export default function Card({ title, description, children }) {
  return (
    <div className="bg-white dark:bg-gray-700 text-black dark:text-white p-4 mb-4 rounded shadow">
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-2">{description}</p>
      <div className="flex gap-2">{children}</div>
    </div>
  );
}
