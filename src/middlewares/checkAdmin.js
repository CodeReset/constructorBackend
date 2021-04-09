const checkAdminTypeFromBody = (req, res, next) => {
  try {
    if (req.body.type != 'admin') {
      return res.status(403).json({
        message: 'You are not admin'
      });
    }
    if(req.body.appId) req.appid = req.body.appId;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: e
    });
  }
};

export default checkAdminTypeFromBody;
