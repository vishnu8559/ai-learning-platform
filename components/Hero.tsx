"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl px-6"
      >
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
          Your <span className="text-blue-600">AI Mentor</span> for
          <br /> Coding & Placements
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Track your coding progress, identify weak areas, and take
          AI-generated tests tailored just for you.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/login"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium shadow-sm"
          >
            Get Started
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#features"
            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700"
          >
            See How It Works
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
