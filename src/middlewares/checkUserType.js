const checkUserTypeFromBody = (req, res, next) => {
  try {
    if (!req.body.type === 'admin') {
      req.body.type = 'common';
    } else {
      if(req.appId)
      if (!req.headers.appidentificator)
        req.headers.appidentificator = '00000000-0000-0000-0000-000000000000';
    }
    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: e
    });
  }
};

export default checkUserTypeFromBody;
