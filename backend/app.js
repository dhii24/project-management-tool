const express = require("express");
const cors = require("cors");

const app = express();

const homeRoutes = require("./routes/homeRoutes");
const userRoutes = require("./routes/userRoutes");
const workspaceRoutes = require("./routes/workspaceRoutes");
const boardRoutes = require("./routes/boardRoutes");
const listRoutes = require("./routes/listRoutes");
const cardRoutes = require("./routes/cardRoutes");
const commentRoutes = require("./routes/commentRoutes");
const attachmentRoutes = require("./routes/attachmentRoutes");
const activityRoutes = require("./routes/activityRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");


// while developing.
app.use(cors());


// Check Axios
// If you're using cookies/JWT in cookies:
// axios.post(
//     "http://localhost:5000/api/auth/register",
//     data,
//     {
//         withCredentials: true,
//     }
// );
// If you're not using cookies, you don't need withCredentials.
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true,
// }));


app.use(express.json());

app.use("/", homeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/attachments", attachmentRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/analytics", analyticsRoutes);

module.exports = app;