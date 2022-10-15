const teams = require('../mocks/soccerTeams');

const existingId = (req, res, next) => {
    const { id } = req.params;
    if (teams.some((team) => team.id === Number(id))) return next();
    return res.sendStatus(404);
};

module.exports = existingId;
