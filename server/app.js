const express = require("express");

const app = express();

const homeRoutes = require("./routes/homeRoutes");
const userRoutes = require("./routes/userRoutes");
const workspaceRoutes = require("./routes/workspaceRoutes");
const boardRoutes = require("./routes/boardRoutes");
const listRoutes = require("./routes/listRoutes");
const cardRoutes = require("./routes/cardRoutes");
const commentRoutes = require("./routes/commentRoutes");
const attachmentRoutes = require("./routes/attachmentRoutes");

app.use(express.json());

app.use("/", homeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/attachments", attachmentRoutes);

module.exports = app;