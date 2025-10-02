
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-gray-600 mt-4">Page not found</p>
      <a
        href="/login"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md"
      >
        Back to Login
      </a>
    </div>
  );
}
