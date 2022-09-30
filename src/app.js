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

app.get('/', (_req, res) => res.status(200).json({ message: 'Olá, mundo!' }));

app.get('/teams', (_req, res) => res.status(200).json({ teams }));

module.exports = app;
