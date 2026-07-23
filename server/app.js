const express = require("express");

const app = express();

const homeRoutes = require("./routes/homeRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());

app.use("/", homeRoutes);
app.use("/api/users", userRoutes);

module.exports = app;