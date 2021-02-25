import jwt from 'jsonwebtoken';

const checkAuthFromToken = (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      let token;
      req.body.type === 'admin' ? token = process.env.JWT_SECRET_ADMIN : token = process.env.JWT_SECRET;
      const { userid } = jwt.verify(bearerToken, token);
      if (userid) {
        req.body.userId = userid;
        next();
      } else {
        res.sendStatus(403);
      }
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err
    });
  }
};

export default checkAuthFromToken;
