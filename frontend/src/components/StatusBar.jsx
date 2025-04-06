"use client";

const StatusBar = ({ status, setStatus }) => {
  return (
    <div className="w-fit">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="appearance-none bg-gray-800 text-white py-2 px-4 pr-8 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
      >
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default StatusBar;
