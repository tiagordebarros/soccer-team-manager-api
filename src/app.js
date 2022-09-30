const express = require('express');

const app = express();

app.get('/', (_req, res) => res.status(200).json({ message: 'Olá, mundo!' }));

module.exports = app;
