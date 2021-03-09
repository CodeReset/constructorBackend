import userService from '../services/user/userService';

const checkAdminRulesUserId = async (req, res, next) => {
  try {
    const { userId, type } = req.body;
    const admin = await userService.getProfileById(userId, type);
    if (!admin.dataValues.options.applications.includes(req.appid))
      return res.status(403).json({ message: 'No rules for this application' });
    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: e
    });
  }
};

export default checkAdminRulesUserId;
