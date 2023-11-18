import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'This email already exists!'],
    required: [true, 'Please, enter your email!'],
  },
  username: {
    type: String,
    max: [20, "Username shouldn't be more than 20 characters"],
    required: [true, 'Please enter your username'],
    unique: [true, 'This username already exists'],
  },
  password: {
    type: String,
    min: [6, 'Password should be 6 characters and no more than 25 characters'],
    max: [25, 'Password should be 6 characters and no more than 25 characters'],
    required: [true, 'Please, enter your password'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please, confirm your password!'],
    validate: {
      // This validation only works on .save() and .create()
      validator: function (el: any) {
        // @ts-ignore
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  image: String,
  status: {
    type: String,
    max: [100, 'Too many characters for the status!'],
  },
  socials: {
    instagram: { type: String, lowercase: true, trim: true },
    twitter: { type: String, lowercase: true, trim: true },
    youtube: { type: String, lowercase: true, trim: true },
    facebook: { type: String, lowercase: true, trim: true },
  },
});

// === Middlewares ===
userSchema.pre('save', async function (next) {
  // Only run this function when password is created or modified
  if (!this.isModified('password')) {
    return next();
  }

  // Hash the password
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm
  // @ts-ignore
  this.passwordConfirm = undefined;
  next();
});

const User = models.User || model('User', userSchema);

export default User;
