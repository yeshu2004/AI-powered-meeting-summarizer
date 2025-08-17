function notFound(_req, _res, next) {
  const err = new Error("Route not found");
  err.status = 404;
  next(err);
}

function errorHandler(err, _req, res, _next) {
  const status = err.status || 500;
  res.status(status).json({
    ok: false,
    error: {
      message: err.message || "Internal Server Error",
      code: err.code || "ERR_GENERIC"
    }
  });
}

module.exports = {errorHandler, notFound}
