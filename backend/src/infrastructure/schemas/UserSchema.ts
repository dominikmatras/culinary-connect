import mongoose, { Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

interface UserDocument extends Document {
  id: string;
  name: string;
  email: string;
  role: "cooker" | "waiter" | "manager";
  password: string;
  passwordConfirm: string;
  correctPassword: (inputPassword: string, userPassword: string) => Promise<boolean>;
  createPasswordResetToken: () => string;
  changedPasswordAfter: (JWTTimestamp: number) => boolean;
  passwordChangedAt: Date | undefined;
  passwordResetToken: string | undefined;
  passwordResetExpires: Date | undefined;
}

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "A user must have an id"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  role: {
    type: String,
    enum: ["cooker", "waiter", "manager"],
    default: "waiter",
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: [8, "Password must have at least 8 characters!"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (this: any, el: string) {
        return this.password === el;
      },
      message: "Passwords must be the same",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});


userSchema.pre('save', function(next) {
  if(!this.isModified('password') || this.isNew) return next();
  //@ts-ignore
  this.passwordChangedAt = Date.now() - 1000;
  next();
})

userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
  if (this.passwordChangedAt) {
    //@ts-ignore
    const changedAt = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedAt;
  }
  return false;
};

userSchema.pre("save", async function (this: any, next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  inputPassword: string,
  userPassword: string
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
