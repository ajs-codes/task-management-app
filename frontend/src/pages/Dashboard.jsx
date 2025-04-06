import { Link } from "react-router-dom";
import { useTask } from "../contexts/TaskContext";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import TaskTable from "../components/TaskTable";
import StatusBar from "../components/StatusBar";
import { FaPlus } from "react-icons/fa";

const Dashboard = () => {
  const { searchTerm, setSearchTerm, status, setStatus } = useTask();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Task List</h1>

          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <div className="">
              <StatusBar status={status} setStatus={setStatus} />
            </div>
            <div className="w-full md:w-64">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>

            <Link
              to="/add-task"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center w-full md:w-auto"
            >
              Create <FaPlus className="ml-2" />
            </Link>
          </div>
        </div>

        <TaskTable />
      </div>
    </div>
  );
};

export default Dashboard;
