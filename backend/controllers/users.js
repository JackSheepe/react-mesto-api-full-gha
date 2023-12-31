const { isValidObjectId } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BadRequestErr, NotFoundErr, ConflictErr } = require("../middlewares/customErrors");
const User = require("../models/user");

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    const customError = new BadRequestErr("Неверный формат _id");
    return next(customError);
  }

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundErr("Пользователь по указанному _id не найден");
      }
      return res.status(200).json(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const userData = {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      };
      return res.status(201).send(userData);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictErr("Пользователь с таким Email уже существует"));
      } else if (err.name === "ValidationError") {
        next(new BadRequestErr(`${Object.values(err.errors).map((error) => error.message).join(", ")}`));
      } else {
        next(err);
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundErr("Пользователь с указанным _id не найден");
      }
      const userData = {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      };
      return res.status(200).json(userData);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestErr("Переданны некорректные данные"));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundErr("Пользователь с указанным _id не найден");
      }
      const userData = {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      };
      return res.status(200).json(userData);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestErr("Переданны некорректные данные"));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { password, email } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === "production" ? JWT_SECRET : "dev-secret", { expiresIn: "7d" });

      // res
      //   .cookie("jwt", token, {
      //     maxAge: 3600000,
      //     httpOnly: true,
      //     sameSite: true,
      //   })
      //   .send({ message: "Авторизация прошла успешно!" });

      res.status(200).send({ token });
    })
    .catch(next);
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundErr("Пользователь не найден");
      }
      return res.send(user);
    })
    .catch(next);
};
