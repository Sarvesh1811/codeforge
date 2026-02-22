import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignupPage(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        const res = await fetch("https://codeforge-backend-rdxj.onrender.com/signup", {
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({name , email, password}),
        });

        const data = await res.json();

        if(data.message){
            alert("Signup successful!");
            navigate("/login")
        } else{
            alert(data.error)
        }
    }

      return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">

      
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full"></div>

      
      <div className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account 
        </h2>

        <div className="space-y-4">

          <input
            placeholder="Full Name"
            className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-cyan-400 outline-none transition"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-cyan-400 outline-none transition"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-cyan-400 outline-none transition"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSignup}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-lg transition duration-200 shadow-lg"
          >
            Sign Up
          </button>

          <p className="text-center text-slate-400 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
