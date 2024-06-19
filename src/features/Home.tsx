import { useEffect, useRef, useState } from "react";
import { GetQuiz } from "../services/GetQuiz";
import { QuizResponse } from "../types/question-type";
import QuizForm from "../components/QuizForm";
import { useNavigate } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { scoreAtom } from "../atoms/ScoreAtom";

const Home = () => {
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState<QuizResponse | undefined>(
    undefined,
  );
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [questionCount, setQuestionCount] = useState<number>(0);
  const [isValueSubmitted, setIsValueSubmitted] = useState<boolean>(false);
  const [isSelectedAnswerCorrect, setIsSelectedAnswerCorrect] =
    useState<boolean>(false);
  const [useScore, setScore] = useAtom(scoreAtom);
  const correctAnswerRef = useRef<string>("");

  const { data, isLoading, error, refetch, isRefetching } = GetQuiz();

  useEffect(() => {
    if (questionCount === 10) {
      navigate({ to: "/score" });
    }
  }, [questionCount, navigate]);

  useEffect(() => {
    if (data && data.length > 0) {
      const currentQuestion = data[0];
      setQuestionData(currentQuestion);
      setOptions(
        [
          currentQuestion.correct_answer,
          ...currentQuestion.incorrect_answers,
        ].sort(() => Math.random() - 0.5),
      );
      setCorrectAnswer(currentQuestion.correct_answer);
    }
  }, [data]);

  useEffect(() => {
    correctAnswerRef.current = correctAnswer;
  }, [correctAnswer]);

  const handleSubmit = (selectedOption: string) => {
    if (selectedOption === correctAnswerRef.current) {
      setIsSelectedAnswerCorrect(true);
      setScore((prevScore) => prevScore + 1);
    } else {
      setIsSelectedAnswerCorrect(false);
    }

    setIsValueSubmitted(true);
    setQuestionCount((prevCount) => prevCount + 1);
  };

  const handleNext = () => {
    if (!isValueSubmitted) {
      alert("Please Submit The Value First");
      return;
    }

    refetch();
    setIsValueSubmitted(false);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-purple-100 p-4">
        <progress className="progress w-1/2"></progress>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-between items-center">
        Error fetching data
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-purple-100 p-4">
      {isRefetching ? (
        <span className="loading loading-bars loading-md"></span>
      ) : (
        <>
          <div className="text-2xl mb-4">
            <span>
              Score:{" "}
              <span className="font-bold text-green-600">{useScore}</span>
            </span>
          </div>
          {questionData && (
            <QuizForm
              options={options}
              correct_answer={questionData.correct_answer}
              question={questionData.question}
              submitValues={handleSubmit}
              nextButton={handleNext}
            />
          )}
          {isValueSubmitted && (
            <div
              className={`mt-4 text-lg p-4 rounded-lg ${isSelectedAnswerCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
            >
              {isSelectedAnswerCorrect ? (
                <span>Selected Answer is correct</span>
              ) : (
                <span>
                  Selected Answer is incorrect. The correct answer is{" "}
                  <strong>{correctAnswer}</strong>
                </span>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
