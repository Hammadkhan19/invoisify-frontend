import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-red-600">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          We're sorry, but the page you are looking for doesn't exist.
        </p>
        <h3 className="text-xl text-gray-700 mt-4">Are you lost?</h3>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition duration-300"
        >
          Go back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
