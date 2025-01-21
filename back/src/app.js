const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const user = require("./routes/userRoutes");

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rotas
app.use(user)

module.exports = app;
