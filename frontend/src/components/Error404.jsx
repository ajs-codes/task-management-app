import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center px-4">
      <h1 className="text-7xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4 mb-6">Page Not Found</p>
      <Link
        to="/"
        className="px-6 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default Error404;
