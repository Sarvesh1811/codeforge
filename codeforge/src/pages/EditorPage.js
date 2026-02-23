import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import Navbar from "../components/Navbar";

function EditorPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const [code, setCode] = useState(`function greet(name) {
  return "Hello " + name;
}`);

  const [review, setReview] = useState("");

  const handleReview = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://codeforge-backend-rdxj.onrender.com/review",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ code }),
        }
      );

      const data = await res.json();
      setReview(data.review);
    } catch {
      setReview("Error connecting to backend");
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col">
        
        <div className="border-b border-slate-800 px-4 py-3 flex flex-wrap gap-3 items-center justify-between">
          <h1 className="text-lg font-bold text-cyan-400">
            CodeForge Editor
          </h1>

          <button
            onClick={handleReview}
            className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-cyan-400"
          >
            AI Review
          </button>
        </div>

        
        <div className="flex flex-col lg:flex-row flex-1">
          
          <div className="flex-1 border-b lg:border-b-0 lg:border-r border-slate-800 p-3">
            <div className="bg-slate-900 rounded-lg overflow-hidden h-[55vh] md:h-[70vh]">
              <Editor
                height="100%"
                defaultLanguage="javascript"
                value={code}
                onChange={(value) => setCode(value)}
                theme="vs-dark"
              />
            </div>
          </div>

          
          <div className="w-full lg:w-[400px] bg-slate-900 p-4">
            <h2 className="font-semibold mb-3">AI Review</h2>

            <pre className="text-sm text-slate-300 whitespace-pre-wrap">
              {review || "Click AI Review to analyze code"}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditorPage;