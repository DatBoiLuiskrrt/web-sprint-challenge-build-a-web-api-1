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
module.exports = { validateFunctionID, validateUser };
