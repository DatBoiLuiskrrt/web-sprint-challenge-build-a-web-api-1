// add middlewares here related to actions
const Actions = require("./actions-model");

const validateFunction = (req, res, next) => {
  Actions.get(req.params.id)
    .then((actions) => {
      if (!actions) {
        res.status(404).json({
          message: "No actions found",
        });
      } else {
        req.actions = actions;
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error occured, project was not found",
      });
    });
};

const validateBody = (req, res, next) => {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json({
      message: "Missing project id or description or notes",
    });
  } else {
    next();
  }
};

module.exports = { validateFunction, validateBody };
