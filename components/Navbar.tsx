"use client";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 border-b bg-white">
      <div className="text-xl font-bold text-gray-900">
        AI<span className="text-blue-600">Learn</span>
      </div>

      <div className="flex gap-6 items-center">
        <a className="text-gray-600 hover:text-gray-900">Features</a>
        <a className="text-gray-600 hover:text-gray-900">About</a>
        <a
          href="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Login
        </a>
      </div>
    </nav>
  );
}
