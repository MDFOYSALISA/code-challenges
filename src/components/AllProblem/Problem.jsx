import { useNavigate } from "react-router-dom";

function Problem() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen space-x-4 flex items-center justify-center">
      <button
        onClick={() => navigate("/problem-1")}
        className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700"
      >
        Problem-1
      </button>
      <button
        onClick={() => navigate("/fancy-form")}
        className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700"
      >
        Open Fancy Form
      </button>
      <button
        onClick={() => navigate("/problem-3")}
        className="bg-indigo-600 text-white px-6 py-3 rounded"
      >
        Open Problem 3
      </button>
    </div>
  );
}

export default Problem;
