import * as z from "zod"


export const loginSchema = () => {
  return z.object({
    email: z.string().trim().email({
      message:"Not valid email",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be 6 characters at least" })
      .max(40, { message: "Passord length must be less than 40 characters"}),
  });
};

export const signUpSchema = () => {
  return z
    .object({
      name: z
        .string()
        .trim()
        .min(1, { message: "Name is required" }),
      email: z.string().trim().email({
        message: "not valid email",
      }),
      password: z
        .string()
        .min(6, { message: "Password must be 6 characters at least "})
        .max(40, { message: "Passord length must be less than 40 characters" }),
      confirmPassword: z
        .string()
        .min(6, { message: "Password confirm is required"}),
    })
    .refine((data: { password: string; confirmPassword: string; }) => data.password === data.confirmPassword, {
      message: "Passwords not matches" ,
      path: ["confirmPassword"],
    });
};

export type ValidationErrors =
  | {
      [key: string]: string[];
    }
  | undefined;