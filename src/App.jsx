import { Routes, Route } from "react-router-dom";
import Problem from "./components/AllProblem/Problem";
import FancyForm from "./components/FancyForm/FancyForm";
import Problem3 from "./components/AllProblem/Problem3";
import Problem1 from "./components/AllProblem/Problem1";
import Problem3Slove from "./components/AllProblem/Problem3Slove";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Problem />} />
      <Route path="/problem-1" element={<Problem1 />} />
      <Route path="/fancy-form" element={<FancyForm />} />
      <Route path="/problem-3" element={<Problem3 />} />
      <Route path="/Problem3Slove" element={<Problem3Slove />} />
      
    </Routes>
  );
}

export default App;
