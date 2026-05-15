function validate(schema, source = 'body') {
  return function validationMiddleware(req, res, next) {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      return res.status(400).json({ errors: result.error.flatten() });
    }

    req[source] = result.data;
    return next();
  };
}

module.exports = validate;
