import * as z from "zod";

export const SignUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(4, "Name must contain at least 4 characters")
      .max(50),
    email: z.string().trim().email("Invalid email address"),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters")
      .max(20),
    retypepassword: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters")
      .max(20),
  })
  .refine((data) => data.password === data.retypepassword, {
    message: "Password do not match",
    path: ["retypepassword"],
  });

export type SignUpType = z.infer<typeof SignUpSchema>;

export const LogInSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .max(20),
});

export type LogInType = z.infer<typeof LogInSchema>;
