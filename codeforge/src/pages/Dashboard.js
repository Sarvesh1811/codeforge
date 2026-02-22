import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("https://codeforge-backend-rdxj.onrender.com/history", {
        headers: { Authorization: token },
      });

      const data = await res.json();
      setHistory(data);
    };

    fetchHistory();
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <Navbar />

      <div className="bg-slate-950 min-h-screen text-white px-4 sm:px-6 py-6">

       
        <div className="max-w-4xl mx-auto mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">
            Your AI Review History
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            All your past AI code reviews in one place.
          </p>
        </div>

       
        <div className="space-y-4 max-w-4xl mx-auto">

          {history.length === 0 && (
            <p className="text-slate-400 text-sm">No reviews yet.</p>
          )}

          {history.map((item) => (
            <div
              key={item._id}
              className="bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-800 shadow-sm"
            >
             
              <p className="text-xs text-slate-500 mb-2">
                {new Date(item.createdAt).toLocaleString()}
              </p>

              
              <div className="bg-black/30 rounded-lg p-3 mb-3 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-green-400 whitespace-pre">
                  {item.code}
                </pre>
              </div>

             
              <pre className="text-xs sm:text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                {item.review}
              </pre>

             
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => copyText(item.review)}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black px-3 py-1.5 rounded text-xs sm:text-sm font-semibold"
                >
                  Copy Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;