import jwt from 'jsonwebtoken';

const checkAuthFromToken = (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      const { userid } = jwt.verify(bearerToken, process.env.JWT_SECRET);
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
