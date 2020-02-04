const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userRoles = require('./../statics/userRoles');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please provide your email!'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    username: {
      type: String,
      unique: [true, 'The username speficied has been taken by another user'],
      default: ''
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false
    },
    photo: {
      type: String,
      default: 'default.jpg'
    },
    role: {
      type: String,
      enum: {
        values: [userRoles.user, userRoles.operator, userRoles.admin]
      },
      default: 'user'
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false
    }
  },
  {
    // Make sure to select the virtual properties as well when we have virtual properties
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false // prevent the id property to be returned
  }
);

// Mongoose Middlewares
userSchema.pre(/^find/, function(next) {
  // 'this' keyword points to current query

  // tell to exclude all inactiev users from all queries
  this.find({ active: { $ne: false } });
  this.select('-__v -passwordChangedAt');
  next();
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    // compute a new hash whenever a password changed.
    this.password = await bcrypt.hash(this.password, 12);
    if (!this.isNew) {
      this.passwordChangedAt = Date.now() - 1000;
    }
  }
  return next();
});

// Defining instance methods
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
