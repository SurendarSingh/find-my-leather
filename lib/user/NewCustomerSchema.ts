import * as z from "zod";

export const NewCustomerSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(4, "Name must contain at least 4 characters")
    .max(20, "Name must contain at most 20 characters")
    .transform((name) => name.replace(/\b\w/g, (char) => char.toUpperCase())),
  customerEmail: z.string().trim().email("Invalid email address"),
});

export type NewCustomerType = z.infer<typeof NewCustomerSchema>;
