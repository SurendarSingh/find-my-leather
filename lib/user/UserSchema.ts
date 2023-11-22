import * as z from "zod";

export const SignUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(4, "Name must contain at least 4 characters")
      .max(20, "Name must contain at most 20 characters"),
    email: z
      .string()
      .trim()
      .email("Invalid email address")
      .transform((email) => email.toLowerCase()),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters"),
    retypepassword: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters"),
  })
  .refine((data) => data.password === data.retypepassword, {
    message: "Password do not match",
    path: ["retypepassword"],
  });

export type SignUpType = z.infer<typeof SignUpSchema>;

export const LogInSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .transform((email) => email.toLowerCase()),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .max(20),
});

export type LogInType = z.infer<typeof LogInSchema>;

export const InviteCustomerSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(4, "Name must contain at least 4 characters")
    .max(20, "Name must contain at most 20 characters")
    .transform((name) => name.replace(/\b\w/g, (char) => char.toUpperCase())),
  customerEmail: z
    .string()
    .trim()
    .email("Invalid email address")
    .transform((email) => email.toLowerCase()),
});

export type InviteCustomerType = z.infer<typeof InviteCustomerSchema>;
