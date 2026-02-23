import { useState } from "react";
import {useNavigate, Link} from "react-router-dom";
import { useEffect } from "react";

function LoginPage(){

   useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) navigate("/editor");
}, [navigate]);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleLogin = async() => {

        try{
            const res = await fetch("https://codeforge-backend-rdxj.onrender.com/login", {

                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({email, password}),
            })

            const data = await res.json();

            if(data.token){
                localStorage.setItem("token", data.token);
                navigate("/editor");
            } else{
                alert(data.error);
            }


        }
        catch(error){
            alert("Login Failed")


        }
    }

    return(
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
            <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full"></div>
            <div className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
                <div className="space-y-4">
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
            onClick={handleLogin}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-lg transition duration-200 shadow-lg"
          >
            Login
          </button>

          <p className="text-center text-slate-400 text-sm">
            Don’t have an account?{" "}
            <Link  to="/signup" className="text-cyan-400 hover:underline">
            Signup
            </Link>
            </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;