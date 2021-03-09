const checkAdminTypeFromBody = (req, res, next) => {
  try {
    if (req.body.type != 'admin') {
      return res.status(403).json({
        message: 'You are not admin'
      });
    }
    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: e
    });
  }
};

export default checkAdminTypeFromBody;
