import { useAtom } from "jotai";
import { scoreAtom } from "../atoms/ScoreAtom";
import { useNavigate } from "@tanstack/react-router";
import ScoreDisplay from "../components/ScoreDisplay";

const ScoreFile = () => {
  const [, setScore] = useAtom(scoreAtom);
  const navigate = useNavigate();

  const handleRetake = () => {
    navigate({ to: "/" });
    setScore(0);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-purple-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-4">Quiz Completed!</h1>
        <ScoreDisplay />
        <button
          onClick={handleRetake}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
};

export default ScoreFile;
