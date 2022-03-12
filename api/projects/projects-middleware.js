// add middlewares here related to projects
const Projects = require("./projects-model");

const validateFunction = (req, res, next) => {
  Projects.get(req.params.id)
    .then((projects) => {
      if (!projects) {
        res.status(404).json({
          message: "No projects found",
        });
      } else {
        req.projects = projects;
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error occured, project not found",
      });
    });
};

module.exports = validateFunction;
