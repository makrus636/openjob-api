const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  });
  if (error) {
    return res.status(400).json({
      status: 'failed',
      message: error.details[0].message,
    });
  }
  next();
};

export default validate;