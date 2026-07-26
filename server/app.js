const express = require("express");

const app = express();

const homeRoutes = require("./routes/homeRoutes");
const userRoutes = require("./routes/userRoutes");
const workspaceRoutes = require("./routes/workspaceRoutes");

app.use(express.json());

app.use("/", homeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/workspaces", workspaceRoutes);

module.exports = app;