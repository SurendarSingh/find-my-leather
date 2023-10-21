"use server";

import getErrorMessage from "@/lib/getErrorMessage";
import { SignUpSchema, SignUpType } from "@/lib/AuthSchema";
import { connectMongoDB } from "@/lib/MongoDB";
import UserModel from "@/lib/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function SignUpUser(data: SignUpType) {
  const result = SignUpSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: result.error.format() };
  }

  try {
    const { name, email, password } = result.data;

    if (!name || !email || !password) {
      return { success: false, error: "Please fill all the fields" };
    }

    await connectMongoDB();

    // Check if user already exist
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return {
        success: false,
        code: "USER_ALREADY_EXIST",
        error: "You have already registered",
        message: "Please login to your account",
      };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    // Save user
    const savedUser = await newUser.save();

    // Send verification email
    // await sendVerificationEmail(savedUser);

    // Create and assign a token

    if (!process.env.TOKEN_SECRET) {
      throw new Error("TOKEN_SECRET not found in .env, Please contact Admin!");
    }

    const token = await jwt.sign(
      { _id: savedUser._id, email: savedUser.email },
      process.env.TOKEN_SECRET!
    );

    cookies().set("auth-token", token, { httpOnly: true });

    const responseData = {
      _id: savedUser._id.toString(),
      name: savedUser.name,
      email: savedUser.email,
    };

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
      message: getErrorMessage(error),
    };
  }
}
