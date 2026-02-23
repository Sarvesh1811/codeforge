import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/editor");
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch(
        "https://codeforge-backend-rdxj.onrender.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/editor");
      } else {
        alert(data.error);
      }
    } catch {
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 overflow-x-hidden">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome Back
        </h2>

        <div className="space-y-4">
          <input
            placeholder="Email"
            className="w-full p-3 bg-slate-800 rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-slate-800 rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-cyan-500 text-black py-3 rounded-lg font-semibold"
          >
            Login
          </button>

          <p className="text-center text-sm text-slate-400">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-cyan-400">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;