"use client";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useTask } from "../contexts/TaskContext";
import Pagination from "./Pagination";

const TaskTable = () => {
  const {
    tasks,
    loading,
    deleteTask,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useTask();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              S.NO
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              NAME
            </th>
            <th className="max-w-[200px] px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              DESCRIPTION
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              CREATED DATE
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              STATUS
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="7" className="px-6 py-4 text-center text-gray-400">
                No tasks found
              </td>
            </tr>
          ) : (
            tasks.map((task, index) => (
              <tr key={task.id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {(currentPage - 1) * 10 + index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {task.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {task.name}
                </td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-300 break-words max-w-[200px]">
                  {task.description.length >= 150
                    ? `${task.description.substring(0, 150)}...`
                    : task.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {new Date(task.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      task.status === "Completed"
                        ? "bg-green-800 text-green-100"
                        : task.status === "In Progress"
                        ? "bg-yellow-800 text-yellow-100"
                        : "bg-red-800 text-red-100"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                    <Link
                      to={`/edit-task/${task.id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default TaskTable;
