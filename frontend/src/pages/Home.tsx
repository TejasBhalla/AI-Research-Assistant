import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "../components/ui/button"
import ParticleBackground from "../components/ParticleBackground.tsx"
import {
  Upload,
  MessageCircle,
  FileSearch,
  Sparkles,
} from "lucide-react"

const features = [
  {
    icon: Upload,
    title: "Upload Documents",
    desc: "Upload multiple PDFs, research papers, or notes in one place.",
  },
  {
    icon: MessageCircle,
    title: "Ask Anything",
    desc: "Ask natural language questions and get instant AI answers.",
  },
  {
    icon: FileSearch,
    title: "Cited Answers",
    desc: "Every answer comes with exact document citations.",
  },
]

const stats = [
  { label: "PDFs Supported", value: "100+" },
  { label: "Answer Speed", value: "< 2s" },
  { label: "Accuracy Focused", value: "AI + Sources" },
]

const Home = () => {
  return (
    
    <div className="relative min-h-screen w-full bg-gradient-to-b from-slate-50 via-indigo-50 to-white px-6 text-slate-800">
      <ParticleBackground />
      {/* HERO SECTION */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center pt-20">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          AI Research Assistant
        </motion.h1>

        <motion.p
          className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Upload documents, ask questions, and get accurate AI answers
          with exact citations — powered by advanced document understanding.
        </motion.p>

        <motion.div
          className="flex gap-4 mt-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Link to="/upload">
            <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-5 text-lg hover:scale-105 hover:shadow-xl transition">
              Upload Documents
            </Button>
          </Link>

          <Link to="/ask">
            <Button className="bg-gradient-to-r from-violet-600 to-cyan-500 text-white px-6 py-5 text-lg hover:scale-105 hover:shadow-xl transition">
              Ask a Question
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* FEATURES */}
      <div className="max-w-6xl mx-auto mt-28 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, i) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-slate-200/60"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white mb-4">
                <Icon size={26} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-800">
                {feature.title}
              </h3>
              <p className="text-slate-600">{feature.desc}</p>
            </motion.div>
          )
        })}
      </div>

      {/* HOW IT WORKS */}
      <div className="max-w-4xl mx-auto mt-28 text-center">
        <motion.h2
          className="text-4xl font-bold mb-10 text-slate-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {["Upload PDFs", "AI Indexing", "Ask Questions", "Get Citations"].map(
            (step, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-md border border-slate-200/50"
              >
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  {i + 1}
                </div>
                <p className="font-medium text-slate-700">{step}</p>
              </motion.div>
            )
          )}
        </div>
      </div>

      {/* STATS */}
      <div className="relative z-10 max-w-5xl mx-auto mt-28 grid grid-cols-1 md:grid-cols-3 gap-8 pb-28">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            className="bg-gradient-to-r from-indigo-600 to-violet-700 text-white rounded-2xl p-8 shadow-xl text-center"
          >
            <div className="text-4xl font-extrabold mb-2">
              {stat.value}
            </div>
            <div className="opacity-90">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* FLOATING DECOR */}
      <motion.div
        className="fixed top-24 right-20 text-indigo-400 opacity-30"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <Sparkles size={60} />
      </motion.div>
    </div>
  )
}

export default Home
