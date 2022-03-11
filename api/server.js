const express = require("express");
const server = express();
const ActionsRouter = require("./actions/actions-router");
const ProjectsRouter = require("./projects/projects-router");
server.use(express.json());
server.use("/api/actions", ActionsRouter);
server.use("/api/projects", ProjectsRouter);
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
