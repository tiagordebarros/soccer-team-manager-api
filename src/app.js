const express = require('express');
const validateTeam = require('./middlewares/validateTeam');

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

const app = express();

app.use(express.json());

const existingId = (req, res, next) => {
  const { id } = req.params;
  if (teams.some((team) => team.id === Number(id))) return next();
  return res.sendStatus(404);
};

app.get('/', (_req, res) => res.status(200).json({ message: 'Olá, mundo!' }));

app.get('/teams', (_req, res) => res.status(200).json({ teams }));

app.post('/teams', validateTeam, (req, res) => {
    const newTeam = { ...req.body };
    teams.push(newTeam);
    res.status(201).json({ teams: newTeam });
});

app.put('/teams/:id', existingId, validateTeam, (req, res) => {
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

app.get('/teams/:id', existingId, (req, res) => {
    const { id } = req.params;

    const filterId = teams.filter((team) => team.id === Number(id));

    return res.status(200).json(filterId);
});

app.delete('/teams/:id', existingId, (req, res) => {
    const { id } = req.params;

    const deleteId = teams.filter((team) => team.id !== Number(id));

    return res.status(200).json(deleteId);
});

module.exports = {
  app,
  teams,
};
