const checkUserTypeFromBody = (req, res, next) => {
  try {
    if (!req.body.type) req.body.type = 'common';
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err
    });
  }
};

export default checkUserTypeFromBody;
