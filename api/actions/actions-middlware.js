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

module.exports = validateFunction;
