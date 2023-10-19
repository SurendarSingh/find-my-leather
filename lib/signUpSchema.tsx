import * as z from "zod";

const SignUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must contain at least 2 characters")
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

export default SignUpSchema;

export type SignUpType = z.infer<typeof SignUpSchema>;
