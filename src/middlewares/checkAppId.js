const applicationapi = (req, res, next) => {
  console.log("All headers", req.headers);
  const appId = req.headers.appidentificator;
  if (appId) {
    req.appid = appId;
    next();
  } else {
    res.status(400).json({
      message: "Приложение не определено",
    });
  }
};

export default applicationapi;
