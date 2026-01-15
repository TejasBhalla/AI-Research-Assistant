import React, { useState } from "react"
import { useUploadStore } from "../store/fileStore.js"
import { Input } from "../components/ui/input.js"
import { Button } from "../components/ui/button.js"
import { File, UploadCloud, Trash2 } from "lucide-react"
import { Card } from "../components/ui/card.js"
import { motion, AnimatePresence } from "framer-motion"

const Upload = () => {
  const uploadedfiles = useUploadStore((state) => state.uploadedfiles)
  const isuploading = useUploadStore((state) => state.isuploading)
  const adduploadedfiles = useUploadStore((state) => state.adduploadedfiles)
  const clearuploadedfiles = useUploadStore(
    (state) => state.clearuploadedfiles
  )

  const [files, setFiles] = useState([])
  const MotionCard = motion(Card)

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files))
  }

  const handleUpload = async () => {
    if (!files.length) return
    await adduploadedfiles(files)
    setFiles([])
  }

  return (
    <>
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-slate-50 via-indigo-50 to-white">
      {/* MAIN CARD */}
      <MotionCard
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-xl rounded-2xl bg-white/80 backdrop-blur-xl shadow-2xl border border-slate-200/60 p-8"
      >
        {/* HEADER */}
        <h1 className="text-3xl font-extrabold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500">
          Upload Documents
        </h1>
        <p className="text-center text-slate-600 mb-8">
          Add PDFs or research files to build your AI knowledge base
        </p>

        {/* DROP ZONE */}
        <label className="group flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-indigo-300 rounded-2xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/60 transition-all duration-300 mb-6">
          <Input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <UploadCloud className="w-12 h-12 text-indigo-400 group-hover:text-indigo-600 mb-3 transition" />
          <span className="font-medium text-slate-700">
            Click or drag & drop files
          </span>
          <span className="text-sm text-slate-400 mt-1">
            PDF, DOCX, TXT supported
          </span>
        </label>

        {/* FILE LIST */}
        <AnimatePresence>
          {uploadedfiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3 mb-6"
            >
              {uploadedfiles.map((file, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-slate-200/60"
                >
                  <File className="w-5 h-5 text-indigo-500" />
                  <span className="text-sm font-medium text-slate-700 truncate">
                    {file.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACTIONS */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={clearuploadedfiles}
            className="text-slate-500 hover:text-red-500"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>

          <Button
            onClick={handleUpload}
            disabled={isuploading || !files.length}
            className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-5 hover:scale-105 hover:shadow-xl transition"
          >
            {isuploading ? "Uploading..." : "Upload Files"}
          </Button>
        </div>
      </MotionCard>
    </div>
    </>
  )
}

export default Upload
