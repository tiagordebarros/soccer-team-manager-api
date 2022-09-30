const express = require('express');

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

app.get('/', (_req, res) => res.status(200).json({ message: 'Olá, mundo!' }));

app.get('/teams', (_req, res) => res.status(200).json({ teams }));

app.post('/teams', (req, res) => {
    const newTeam = { ...req.body };
    teams.push(newTeam);
    res.status(201).json({ teams: newTeam });
});

module.exports = app;
