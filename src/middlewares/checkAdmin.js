const checkAdminTypeFromBody = (req, res, next) => {
  try {
    if (req.body.type != 'admin') {
      return res.status(403).json({
        message: 'You are not admin'
      });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err
    });
  }
};

export default checkAdminTypeFromBody;
