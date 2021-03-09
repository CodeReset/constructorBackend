const checkUserTypeFromBody = (req, res, next) => {
  try {
    if (!req.body.type === 'admin') req.body.type = 'common';
    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: e
    });
  }
};

export default checkUserTypeFromBody;
