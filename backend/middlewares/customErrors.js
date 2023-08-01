class BadRequestErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class UnauthorizedErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class NotFoundErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ForbiddenErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class ConflictErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = {
  BadRequestErr,
  NotFoundErr,
  ForbiddenErr,
  ConflictErr,
  UnauthorizedErr,
};
