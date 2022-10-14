const express = require('express');
require('express-async-errors');
const apiCredentials = require('./middlewares/apiCredentials');
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

app.use(express.static('./images'));
app.use(express.json());
app.use(apiCredentials);

app.use((req, _res, next) => {
  console.log('req.method:', req.method);
  console.log('req.path:', req.path);
  console.log('req.params:', req.params);
  console.log('req.query:', req.query);
  console.log('req.headers:', req.headers);
  console.log('req.body:', req.body);
  next();
});

const existingId = (req, res, next) => {
  const { id } = req.params;
  if (teams.some((team) => team.id === Number(id))) return next();
  return res.sendStatus(404);
};

app.get('/', (_req, res) => res.status(200).json({ message: 'Olá, mundo!' }));

app.get('/teams', (_req, res) => res.status(200).json({ teams }));

app.post('/teams', validateTeam, (req, res) => {
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

app.use((_req, res) => res.sendStatus(404));

module.exports = {
  app,
  teams,
};
