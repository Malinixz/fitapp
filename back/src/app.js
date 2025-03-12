const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const user = require("./routes/userRoutes");
const day = require("./routes/dayRoutes");
const meal = require("./routes/mealRoutes");

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rotas
app.use(user)
app.use(day)
app.use(meal)

module.exports = app;
