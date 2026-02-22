import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload(); 
  };

  return (
    <div className="border-b border-slate-800 px-6 py-4 flex justify-between items-center bg-slate-950 text-white">
      
    
      <Link to="/" className="text-cyan-400 font-bold text-lg">
        CodeForge
      </Link>

      <div className="flex items-center gap-4">

        <a
          href="https://github.com/Sarvesh1811/codeforge"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-300 hover:text-white"
        >
          GitHub
        </a>

        {/* Editor */}
        <Link to="/editor" className="text-slate-300 hover:text-white">
          Editor
        </Link>

        {/* Auth Section */}
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="text-slate-300 hover:text-white"
            >
              Dashboard
            </Link>

            <div className="bg-slate-800 px-3 py-1 rounded-full text-sm">
              👤 User
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-cyan-500 px-3 py-1 rounded text-black font-semibold"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;