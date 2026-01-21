"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type Drop = {
  x: number;
  delay: number;
  char: string;
  size: number;
  duration: number;
};

const chars = ["0", "1", "{", "}", "(", ")", "+", "-", "*", "/", "<", ">"];

export default function LoginPage() {
  const router = useRouter();
  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");
  const [drops, setDrops] = useState<Drop[]>([]);

  // ✅ Generate falling symbols ONLY on client
  useEffect(() => {
    const generated = Array.from({ length: 35 }).map(() => ({
      x: Math.random() * 100,
      delay: Math.random() * 6,
      char: chars[Math.floor(Math.random() * chars.length)],
      size: Math.random() * 14 + 16, // font size
      duration: Math.random() * 6 + 10, // fall speed
    }));
    setDrops(generated);
  }, []);

  const handleLogin = () => {
    if (roll === "21CS001" && password === "demo123") {
      localStorage.setItem("user", JSON.stringify({ roll }));
      router.push("/");
    } else {
      alert("Use demo credentials: 21CS001 / demo123");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      
      {/* 🔹 NAVBAR */}
      <nav className="relative z-20 flex items-center justify-between px-12 py-5 bg-white/90 backdrop-blur border-b">
        <h1 className="text-3xl font-extrabold tracking-wide text-gray-900">
          Code<span className="text-blue-600">Track</span>
        </h1>

        <div className="flex gap-10 text-gray-800 text-lg font-semibold">
          <span className="cursor-pointer hover:text-blue-600 transition">
            Track Data
          </span>
          <span className="cursor-pointer hover:text-blue-600 transition">
            Coding Profiles
          </span>
          <span className="cursor-pointer hover:text-blue-600 transition">
            Profile
          </span>
        </div>
      </nav>

      {/* 🔹 FALLING BACKGROUND SYMBOLS */}
      {drops.map((d, i) => (
        <motion.span
          key={i}
          className="absolute top-0 font-mono select-none pointer-events-none"
          style={{
            left: `${d.x}%`,
            fontSize: d.size,
            color: "rgba(156,163,175,0.35)", // subtle gray
          }}
          initial={{ y: "-10%" }}
          animate={{ y: "110%" }}
          transition={{
            duration: d.duration,
            repeat: Infinity,
            ease: "linear",
            delay: d.delay,
          }}
        >
          {d.char}
        </motion.span>
      ))}

      {/* 🔹 LOGIN CARD */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-90px)]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border"
        >
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Student Login
          </h2>

          <p className="text-center text-gray-600 text-lg mt-1 mb-8">
            Continue your learning journey
          </p>

          <input
            placeholder="College Roll Number"
            className="w-full border border-gray-300 px-4 py-3 rounded-xl mb-4 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 px-4 py-3 rounded-xl mb-6 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold text-lg"
          >
            Login
          </motion.button>

          <p className="text-base text-center mt-6 text-gray-700">
            New user?{" "}
            <a href="/signup" className="text-blue-600 font-semibold hover:underline">
              Sign up
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
