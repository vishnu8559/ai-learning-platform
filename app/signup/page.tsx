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

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    roll: "",
    name: "",
    email: "",
    leetcode: "",
    codeforces: "",
    codechef: "",
    password: "",
  });

  const [drops, setDrops] = useState<Drop[]>([]);

  // ✅ Client-only animation generation
  useEffect(() => {
    const generated = Array.from({ length: 35 }).map(() => ({
      x: Math.random() * 100,
      delay: Math.random() * 6,
      char: chars[Math.floor(Math.random() * chars.length)],
      size: Math.random() * 14 + 16,
      duration: Math.random() * 6 + 10,
    }));
    setDrops(generated);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    if (!form.roll || !form.name || !form.email || !form.password) {
      alert("Please fill all required fields");
      return;
    }

    // Demo save
    localStorage.setItem("user", JSON.stringify(form));
    router.push("/login");
  };

  const inputClass =
    "border border-gray-300 px-4 py-3 rounded-xl text-lg font-medium " +
    "text-gray-900 placeholder-gray-500 " +
    "focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none";

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

      {/* 🔹 FALLING SYMBOL BACKGROUND */}
      {drops.map((d, i) => (
        <motion.span
          key={i}
          className="absolute top-0 font-mono select-none pointer-events-none"
          style={{
            left: `${d.x}%`,
            fontSize: d.size,
            color: "rgba(156,163,175,0.35)",
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

      {/* 🔹 SIGNUP CARD */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-90px)]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg border"
        >
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Student Signup
          </h2>

          <p className="text-center text-gray-600 text-lg mt-1 mb-8">
            Create your CodeTrack account
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="roll"
              placeholder="College Roll Number"
              className={inputClass}
              onChange={handleChange}
            />

            <input
              name="name"
              placeholder="Full Name"
              className={inputClass}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Email ID"
              className={inputClass}
              onChange={handleChange}
            />

            <input
              name="leetcode"
              placeholder="LeetCode Username"
              className={inputClass}
              onChange={handleChange}
            />

            <input
              name="codeforces"
              placeholder="Codeforces Handle"
              className={inputClass}
              onChange={handleChange}
            />

            <input
              name="codechef"
              placeholder="CodeChef Username"
              className={inputClass}
              onChange={handleChange}
            />
          </div>

          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`${inputClass} w-full mt-4`}
            onChange={handleChange}
          />

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSignup}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold text-lg mt-6"
          >
            Create Account
          </motion.button>

          <p className="text-base text-center mt-6 text-gray-700">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
