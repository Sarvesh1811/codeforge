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
    <div className="border-b border-slate-800 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        
        <Link to="/" className="text-cyan-400 font-bold text-lg">
          CodeForge
        </Link>

        <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
          <a
            href="https://github.com/Sarvesh1811/codeforge"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-white"
          >
            GitHub
          </a>

          <Link to="/editor" className="text-slate-300 hover:text-white">
            Editor
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" className="text-slate-300 hover:text-white">
                Dashboard
              </Link>

              <div className="bg-slate-800 px-3 py-1 rounded-full text-xs">
                👤 User
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded text-xs"
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
    </div>
  );
}

export default Navbar;