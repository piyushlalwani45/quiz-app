import { useAtom } from "jotai";
import { scoreAtom } from "../atoms/ScoreAtom";

const ScoreDisplay = () => {
  const [useScore] = useAtom(scoreAtom);
  return (
    <div>
      <p className="text-xl mb-4">Your Score:</p>
      <div className="text-5xl font-bold mb-6 text-green-600">
        {useScore} / 10
      </div>
      <div className="text-lg mb-2">
        <span className="font-semibold">Total Questions:</span> 10
      </div>
      <div className="text-lg mb-2">
        <span className="font-semibold">Correct Answers:</span> {useScore}
      </div>
      <div className="text-lg mb-6">
        <span className="font-semibold">Incorrect Answers:</span>{" "}
        {10 - useScore}
      </div>
    </div>
  );
};

export default ScoreDisplay;
