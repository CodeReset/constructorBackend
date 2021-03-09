const applicationapi = (req, res, next) => {
  try {
    console.log('All headers', req.headers);
    const appId = req.headers.appidentificator;
    if (appId) {
      req.appid = appId;
      next();
    } else {
      res.status(400).json({
        message: 'Приложение не определено'
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: e
    });
  }
};

export default applicationapi;
