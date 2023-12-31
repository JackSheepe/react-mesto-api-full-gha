const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { UnauthorizedErr } = require("../middlewares/customErrors");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Жак-Ив Кусто",
      minlength: [2, "Минимальная длина поля name - 2"],
      maxlength: [30, "Максимальная длина поля name - 30"],
    },
    about: {
      type: String,
      default: "Исследователь",
      minlength: [2, "Минимальная длина поля name - 2"],
      maxlength: [30, "Максимальная длина поля name - 30"],
    },
    avatar: {
      type: String,
      default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
      validate: {
        validator: (v) => validator.isURL(v),
        message: "Некорректный URL",
      },
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Email не верен",
      },
    },
    password: {
      type: String,
      minlength: [8, "Минимальная длина поля пароль - 8"],
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function FUBC(email, password) {
  return this.findOne({ email }).select("+password")
    .then((user) => {
      if (!user) {
        throw new UnauthorizedErr("Неправильные почта или пароль");
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedErr("Неправильные почта или пароль");
          }

          return user;
        });
    });
};

module.exports = mongoose.model("user", userSchema);
