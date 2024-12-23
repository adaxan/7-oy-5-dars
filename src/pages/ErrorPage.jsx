import React from "react";

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-8">Oops! Page not found.</p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Go Back Home
      </a>
    </div>
  );
}

export default ErrorPage;