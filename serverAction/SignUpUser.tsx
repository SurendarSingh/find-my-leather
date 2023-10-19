"use server";

import getErrorMessage from "@/lib/getErrorMessage";
import SignUpSchema, { SignUpType } from "@/lib/signUpSchema";

export async function SignUpUser(data: SignUpType) {
  const result = SignUpSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: result.error.format() };
  }

  try {
    const newUser = "New User Added";

    return { success: true, data: newUser };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
