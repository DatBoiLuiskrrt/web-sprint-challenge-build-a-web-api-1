// add middlewares here related to projects
const Projects = require("./projects-model");

const validateFunctionID = (req, res, next) => {
  Projects.get(req.params.id)
    .then((projects) => {
      if (!projects) {
        res.status(404).json({
          message: "No projects found",
        });
      } else {
        req.projects = projects;
        next({
          status: 404,
          message: "User not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error occured, project not found",
      });
    });
};
function validateUser(req, res, next) {
  const { name, description, completed } = req.body;

  if (!name || !description || completed === undefined) {
    next({
      status: 400,
      message: "Missing required name and description fields",
    });
  } else {
    next();
  }
}

const validateBody = (req, res, next) => {
  if (
    req.body.completed == null ||
    req.body.name == null ||
    req.body.description == null
  ) {
    res.status(400).json({
      message:
        "Could not load due to missing name or description or completed is false",
    });
  } else {
    Projects.update(req.params.id, req.body).then((projects) => {
      res.status(200).json(projects);
    });
  }
};

const validateId = (req, res, next) => {
  Projects.get(req.params.id).then((projects) => {
    if (projects) {
      next();
    } else {
      res.status(404).json({ message: "could not find id" });
    }
  });
};

module.exports = { validateFunctionID, validateUser, validateBody, validateId };
