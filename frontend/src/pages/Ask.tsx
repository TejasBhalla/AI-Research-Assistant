import React, { useState } from "react"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { useUploadStore } from "../store/fileStore"
import { Send, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const Ask = () => {
  const questions = useUploadStore((state) => state.questions)
  const answers = useUploadStore((state) => state.answers)
  const askquestion = useUploadStore((state) => state.askquestion)
  const isuploading = useUploadStore((state) => state.isuploading)

  const [text, setText] = useState("")

  const handleSubmit = async () => {
    if (!text.trim()) return
    await askquestion(text)
    setText("")
  }

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-slate-50 via-indigo-50 to-white flex flex-col items-center px-6">
      {/* PAGE TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-16 mb-6 text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500"
      >
        Ask Your Documents
      </motion.h2>

      {/* CHAT CARD */}
      <Card className="w-full max-w-4xl h-[70vh] bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-2xl rounded-2xl flex flex-col overflow-hidden">
        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-transparent">
          {questions.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-slate-500">
              <Sparkles className="w-8 h-8 mb-3 text-indigo-400" />
              <p className="text-sm">
                Ask a question about your uploaded documents
              </p>
            </div>
          )}

          <AnimatePresence>
            {questions.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-3"
              >
                {/* USER MESSAGE */}
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-2 rounded-2xl max-w-[70%] shadow">
                    {q}
                  </div>
                </div>

                {/* AI MESSAGE */}
                {answers[i] && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 px-4 py-3 rounded-2xl max-w-[75%] text-slate-800 shadow-sm">
                      <p className="text-sm leading-relaxed">
                        {answers[i].answer}
                      </p>

                      {answers[i]?.sources && (
                        <div className="mt-2 text-xs text-slate-500">
                          Sources:{" "}
                          {Object.entries(answers[i].sources)
                            .map(([k]) => `[${k}]`)
                            .join(", ")}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* INPUT BAR */}
        <div className="border-t border-slate-200/60 px-4 py-4 bg-white/70">
          <div className="flex gap-3">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask a question..."
              className="rounded-full px-5 focus:ring-2 focus:ring-indigo-400"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />

            <Button
              onClick={handleSubmit}
              disabled={isuploading}
              className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 hover:scale-105 transition"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Ask
