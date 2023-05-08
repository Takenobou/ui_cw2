import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center mb-4">404</h2>
                <p className="text-xl text-center mb-8">Oops! Page not found.</p>
                <Link
                    to="/"
                    className="w-full block text-center py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md focus:outline-none hover:bg-indigo-700"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;