import { Link, useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import { LayoutDashboard, Upload, MessageSquareText } from "lucide-react"

const Navbar = () => {
  const location = useLocation()

  const isActive = (path) =>
    location.pathname === path

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-slate-200/50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/">
          <h1 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500">
            AI Research Assistant
          </h1>
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-2">

          <Link to="/">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              className={`
                flex gap-2
                ${isActive("/") 
                  ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md" 
                  : "text-slate-700 hover:bg-slate-100"}
              `}
            >
              <LayoutDashboard size={18} />
              Home
            </Button>
          </Link>

          <Link to="/upload">
            <Button
              variant={isActive("/upload") ? "default" : "ghost"}
              className={`
                flex gap-2
                ${isActive("/upload") 
                  ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md" 
                  : "text-slate-700 hover:bg-slate-100"}
              `}
            >
              <Upload size={18} />
              Upload
            </Button>
          </Link>

          <Link to="/ask">
            <Button
              variant={isActive("/ask") ? "default" : "ghost"}
              className={`
                flex gap-2
                ${isActive("/ask") 
                  ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md" 
                  : "text-slate-700 hover:bg-slate-100"}
              `}
            >
              <MessageSquareText size={18} />
              Ask
            </Button>
          </Link>

        </div>
      </nav>
    </header>
  )
}

export default Navbar
