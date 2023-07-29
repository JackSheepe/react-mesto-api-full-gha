const jwt = require("jsonwebtoken");
const { CustomError } = require("./errorHandler");

const { NODE_ENV, JWT_SECRET } = process.env;

const extractBearerToken = (header) => header.replace("Bearer ", "");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    const customError = new CustomError(401, "Необходима авторизация");
    return next(customError);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
    );
  } catch (err) {
    const customError = new CustomError(401, "Токен неверен или истёк срок хранения");
    return next(customError);
  }

  req.user = payload;

  return next();
};
