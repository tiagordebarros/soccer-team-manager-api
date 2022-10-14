const validateTeam = (req, res, next) => {
    const requiredProperties = ['name', 'initials'];
    if (requiredProperties.every((property) => property in req.body)) return next();
    return res.sendStatus(400);
  };

module.exports = validateTeam;
