import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function LandingPage() {
  return (
    <>
  <Navbar />
  

    <div className="bg-slate-950 text-slate-100 min-h-screen">

      <div className="max-w-6xl mx-auto px-6">

       
        <nav className="flex items-center justify-between py-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">CodeForge</h1>

          <div className="hidden md:flex items-center gap-6 text-slate-300">
            <a href="#features" className="hover:text-white transition">Features</a>
            
         

            <Link
            to="/login"
              className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-semibold"
                 >
                 Login
             </Link>
          </div>
        </nav>

        {/* HERO */}
        <section className="py-16 md:py-24">

          <div className="flex flex-col lg:flex-row items-center gap-10">

            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                AI-Powered Code Reviews in Seconds
              </h2>

              <p className="text-slate-400 mt-6 text-lg">
                Write code, get instant AI feedback, and ship better software
                with intelligent automated reviews built for developers.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

  
         <Link
       to="/signup"
        className="bg-cyan-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-cyan-400 transition"
      >
        Get Started
       </Link>


                  <Link
          to="/demo"
        className="border border-slate-700 px-6 py-3 rounded-xl hover:border-cyan-400 transition"
        >
        View Demo
       </Link>

       </div>
            </div>

          
            <div className="flex-1 w-full">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">

                <pre className="text-green-400 text-sm font-mono">
                 {`function sum(arr) {
               return arr.reduce((a,b)=> a+b, 0);
              }`}
                </pre>

                <div className="mt-4 bg-slate-800 p-3 rounded-lg text-sm text-slate-300">
                   AI Review: Consider adding input validation for empty arrays.
                </div>

              </div>
            </div>

          </div>

        </section>

      </div>

      {/* Features Section */}

     <section id="features" className="py-16 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl md:text-3xl font-bold text-center"> Built for Modern Developers </h3>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

           <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500 hover:-translate-y-1 transition duration-300">
              <h4 className="text-lg font-semibold">AI Code Reviews</h4>
              <p className="text-slate-400 mt-3 text-sm">
                Get instant feedback on bugs, improvements, and best practices powered by AI.
              </p>
            </div>


            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500 hover:-translate-y-1 transition duration-300">
              <h4 className="text-lg font-semibold">Code Explanation</h4>
              <p className="text-slate-400 mt-3 text-sm">Understand complex code instantly with AI-powered breakdowns and insights.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500 hover:-translate-y-1 transition duration-300">
              <h4 className="text-lg font-semibold">Smart Suggestions</h4>
              <p className="text-slate-400 mt-3 text-sm">Improve readability and performance with intelligent refactoring suggestions.</p>
            </div>


          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-10 mt-16 text-center text-slate-400 text-sm">
     Built with MERN + AI • CodeForge © 2026
    </footer>
    </div>
     </>
  );
}

export default LandingPage;