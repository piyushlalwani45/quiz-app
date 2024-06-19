import { useForm } from "@felte/react";
import { validator } from "@felte/validator-zod";
import { QuizSchema } from "../schemas/QuizFormSchema";
import { z } from "zod";
import { useState } from "react";

type QuizCardProps = {
  options: string[];
  correct_answer: string;
  question: string;
  submitValues: (value: string, answer: string) => void;
  nextButton: () => void;
};

const QuizForm = ({
  question,
  options,
  submitValues,
  nextButton,
  correct_answer,
}: QuizCardProps) => {
  const [isValueSubmitted, setIsValueSubmitted] = useState<boolean>(false);
  const { errors, form } = useForm<z.TypeOf<typeof QuizSchema>>({
    onSubmit: (values) => {
      submitValues(values.options, correct_answer);
      setIsValueSubmitted(!isValueSubmitted);
    },
    extend: [validator({ schema: QuizSchema })],
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <div className="text-lg font-semibold mb-4">{question}</div>
      <form ref={form}>
        <div className="mt-4 space-y-2">
          {errors && errors().options && (
            <div className="text-red-500 text-lg">{errors().options}</div>
          )}
          {options.map((option) => (
            <label
              key={option}
              className="w-full bg-gray-100 p-3 rounded-lg border border-gray-300 cursor-pointer flex items-center"
            >
              <input
                type="radio"
                name="options"
                value={option}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
        <div className="mt-6 flex justify-between">
          <button
            type="submit"
            className={` ${isValueSubmitted ? "bg-blue-100" : "bg-blue-500"}  text-white px-4 py-2 rounded`}
            disabled={isValueSubmitted}
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={nextButton}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizForm;
