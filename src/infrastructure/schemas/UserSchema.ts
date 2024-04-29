import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, 'A user must have an id'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'A user must have a name'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  role: {
    type: String,
    enum: ['cooker', 'waiter', 'manager'],
    default: 'waiter'
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: [8, 'Password must have at least 8 characters!'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
    validator: function(this: any, el: string) {
        return this.password === el;
      },
      message: "Passwords must be the same"
    }
  },
});

userSchema.pre('save', async function(this: any, next) {
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function(inputPassword: string, userPassword: string) {
  return await bcrypt.compare(inputPassword, userPassword)
}

export const UserModel = mongoose.model("User", userSchema);
