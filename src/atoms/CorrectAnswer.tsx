import { useAtom, atom } from "jotai";
const correct_answer = atom<string>("");

export const CorrectAnswerFunction = () => {
  const [correctAnswer, setCorrectAnswer] = useAtom(correct_answer);

  function UpdateCorrectAnswer(answer: string) {
    setCorrectAnswer(answer);
  }

  return {
    correctAnswer,
    UpdateCorrectAnswer,
  };
};
