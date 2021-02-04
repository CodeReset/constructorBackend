const applicationapi = (req, res, next) => {
  console.log("All headers", req.headers);
  const appidentificatorHeader = req.headers.appidentificator;

  if (appidentificatorHeader) {
    if (!appidentificatorHeader) {
      return res.status(400).json({
        message: "Приложение не определено",
      });
    }

    req.appid = appidentificatorHeader;
    next();
  } else {
    res.status(400).json({
      message: "Приложение не определено",
    });
  }
};

export default applicationapi;
