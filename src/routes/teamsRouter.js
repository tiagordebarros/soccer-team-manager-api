const express = require('express');

const validateTeam = require('../middlewares/validateTeam');
const apiCredentials = require('../middlewares/apiCredentials');

const router = express.Router();

router.use(apiCredentials);

const teams = [
  {
    id: 1,
    name: 'São Paulo Futebol Clube',
    initials: 'SPF',
  },
  {
    id: 2,
    name: 'Clube Atlético Mineiro',
    initials: 'CAM',
  },
];

const existingId = (req, res, next) => {
  const { id } = req.params;
  if (teams.some((team) => team.id === Number(id))) return next();
  return res.sendStatus(404);
};

router.get('/', (_req, res) => res.status(200).json({ teams }));

router.post('/', validateTeam, (req, res) => {
  if (
    !req.teams.teams.includes(req.body.initials)
    && teams.every((team) => team.initials !== req.body.initials)
  ) {
    return res.sendStatus(401);
  }
  const newTeam = { ...req.body };
  teams.push(newTeam);
  return res.status(201).json({ teams: newTeam });
});

router.put('/:id', existingId, validateTeam, (req, res) => {
  const { id } = req.params;
  const { name, initials } = req.body;

  let updatedTeam;

  for (let i = 0; i < teams.length; i += 1) {
    const team = teams[i];

    if (team.id === Number(id)) {
      team.name = name;
      team.initials = initials;
      updatedTeam = team;
    }
  }

  res.status(200).json({ updatedTeam });
});

router.get('/:id', existingId, (req, res) => {
  const { id } = req.params;

  const filterId = teams.filter((team) => team.id === Number(id));

  return res.status(200).json(filterId);
});

router.delete('/:id', existingId, (req, res) => {
  const { id } = req.params;

  const deleteId = teams.filter((team) => team.id !== Number(id));

  return res.status(200).json(deleteId);
});

module.exports = router;
