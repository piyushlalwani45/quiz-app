import { useQuery } from "@tanstack/react-query";
import { QuizResponse } from "../types/question-type";
import axios from "axios";

export const GetQuiz = () => {
  return useQuery<QuizResponse[]>({
    queryKey: ["GetQuiz"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=1",
        );
        return response.data.results as QuizResponse[];
      } catch (error) {
        console.log(error, "error");
        return [];
      }
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
