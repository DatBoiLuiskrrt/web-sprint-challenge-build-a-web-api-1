// Write your "actions" router here!
const express = require("express");
const router = express.Router();
const Actions = require("./actions-model");

router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Could not load users",
        error: err.message,
      });
    });
});
router.get("/:id", (req, res, next) => {
  Actions.get(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(404).json({
        message: "Could not load users",
        error: err.message,
      });
    });
});
router.post("/", (req, res, next) => {
  Actions.insert(req.body)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(404).json({
        message: "Could not load users",
        error: err.message,
      });
    });
});
router.put("/:id", (req, res, next) => {
  Actions.update(req.params.id, req.body)

    .then((actions) => {
      if (!req.body) {
        res.status(400).json({
          message: "There must be a body in the request",
        });
      } else {
        res.status(200).json(actions);
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: "Could not load users",
        error: err.message,
      });
    });
});
router.delete("/:id", (req, res, next) => {
  Actions.remove(req.params.id)

    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(404).json({
        message: "Could not delete",
        error: err.message,
      });
    });
});

module.exports = router;
