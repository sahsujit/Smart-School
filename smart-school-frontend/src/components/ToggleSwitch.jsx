export default function ToggleSwitch() {
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="bg-gray-200 dark:bg-gray-700 p-2 rounded transition-colors"
    >
      🌙 / ☀️
    </button>
  );
}
