const crypto = require('crypto'); //buit-in module

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email!'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please enter a valid email address'],
  },
  photo: { type: String, default: 'default.jpg' },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'guide', 'lead-guide', 'admin'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    select: false,
    validate: {
      // this only works on CREATE & SAVE!!!!!! so whenever you want to udate the user you will always have to use SAVE as well
      validator: function (el) {
        return el === this.password;
      },
      message: 'password are not the same',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordTokenExpiresIn: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually not modified
  if (this.isModified('password')) {
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
  }
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000; // sometimes this property set after token issued-timestamp bcz of internet speed
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

//access this method, difined on Schema, from everywhere throughout your node application
userSchema.methods.isPasswordCorrect = async function (
  candidatePass,
  userPass
) {
  return await bcrypt.compare(candidatePass, userPass);
};

//

userSchema.methods.checkPasswordChanged = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const passChangedTime = parseInt(this.passwordChangedAt / 1000, 10);
    return JWTTimestamp < passChangedTime;
  }
  return false;
};

//

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordTokenExpiresIn = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

//

const User = mongoose.model('user', userSchema); // by convention model variable are always whit a capital letter
module.exports = User;
