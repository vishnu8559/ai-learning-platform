"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ProgressForm from "@/components/ProgressForm";

export default function Home() {
  const router = useRouter();

  // 🔐 Auth Guard
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-xl"
      >
        {/* Dashboard Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Personalized AI Dashboard
          </h1>

          <p className="text-sm text-gray-600 text-center mb-6">
            Track your progress, identify weak areas, and take adaptive tests.
          </p>

          <ProgressForm />
        </div>
      </motion.div>
    </main>
  );
}
