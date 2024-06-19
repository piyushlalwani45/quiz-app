import { z } from "zod";
export const QuizSchema = z.object({
  options: z.string({ message: "Please Select The Option" }),
});
