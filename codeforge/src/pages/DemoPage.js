import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function DemoPage() {
  const [code, setCode] = useState(`function add(a,b){ return a+b }`);
  const [review, setReview] = useState("");
  const [reviewCount, setReviewCount] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const maxReviews = 3;

  const handleReview = async () => {
    if (reviewCount >= maxReviews) {
      setShowUpgrade(true);
      return;
    }

    try {
      const res = await fetch("https://codeforge-backend-rdxj.onrender.com/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      setReview(data.review);
      setReviewCount((prev) => prev + 1);
    } catch {
      setReview("Error connecting to AI");
    }
  };

  return (
    <>
    <Navbar />
    <div className="bg-slate-950 text-white min-h-screen flex flex-col relative">

      

      
      <div className="border-b border-slate-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-cyan-400 font-bold text-lg">CodeForge Demo</h1>

        <Link
          to="/signup"
          className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-semibold"
        >
          Sign up to unlock
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row flex-1">

       
        <div className="flex-1 p-4">
          <div className="bg-slate-900 rounded-xl h-full">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={code}
              onChange={(v) => setCode(v)}
              theme="vs-dark"
            />
          </div>
        </div>

        <div className="w-full lg:w-[400px] bg-slate-900 p-4 border-l border-slate-800">

          <button
            onClick={handleReview}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-2 rounded-lg mb-4"
          >
            AI Review ({maxReviews - reviewCount} left)
          </button>

          <pre className="text-sm text-slate-300 whitespace-pre-wrap min-h-[150px]">
            {review || "Try AI code review without signing up 👀"}
          </pre>

          
          <div className="mt-6 relative">

            <div className="blur-sm pointer-events-none opacity-60">
              <div className="bg-slate-800 p-4 rounded-lg">
                <h3 className="font-semibold">Saved Review History</h3>
                <p className="text-sm text-slate-400">
                  View and manage your past AI reviews.
                </p>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <Link
                to="/signup"
                className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-semibold shadow-lg"
              >
                Unlock with account
              </Link>
            </div>
          </div>

        </div>
      </div>

      {showUpgrade && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 p-8 rounded-2xl max-w-sm text-center shadow-2xl border border-slate-700">
            <h2 className="text-xl font-bold mb-4">Demo Limit Reached 🚀</h2>
            <p className="text-slate-400 mb-6">
              You’ve used all 3 free AI reviews.  
              Create an account to continue using CodeForge.
            </p>

            <div className="flex gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-semibold"
              >
                Upgrade Now
              </Link>

              <button
                onClick={() => setShowUpgrade(false)}
                className="border border-slate-600 px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default DemoPage;