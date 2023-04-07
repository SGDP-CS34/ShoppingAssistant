export default function Avatar({ name }) {
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {firstLetter}
      </span>
    </div>
  );
}
