import mongoose from "mongoose";

const UserModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
      minlength: [4, "Name must be at least 4 characters long"],
      maxlength: [20, "Name must be at most 20 characters long"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      dropDups: true,
      trim: true,
      lowercase: true,
      index: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [
        function (this: any) {
          return this.isPasswordSet;
        },
        "Please enter your password",
      ],
    },
    isPasswordSet: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "customer", "seller", "agent", "admin", "superAdmin"],
      default: "user",
    },
    linkedCustomers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: undefined,
    },
    image: {
      type: String,
      default: "",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    accountCreationMode: {
      type: String,
      enum: ["invited", "signup"],
      required: true,
    },
    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    invitedByRole: {
      type: String,
      enum: ["agent", "seller", "customer", "admin"],
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    passwordResetToken: String,
    passwordResetTokenExpiry: Date,
  },
  { timestamps: true }
);

const UserModel =
  mongoose.models.User || mongoose.model("User", UserModelSchema);

export default UserModel;
