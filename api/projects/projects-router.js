// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const Projects = require("../projects/projects-model");
const server = require("../server");

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Could not load projects",
        error: err.message,
      });
    });
});
router.get("/:id", (req, res, next) => {
  Projects.get(req.params.id)
    .then((projects) => {
      if (!projects) {
        res.status(404).json({
          message: "error",
        });
      } else {
        res.status(200).json(projects);
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: "Could not load with the given id",
        error: err.message,
      });
    });
});
router.post("/", (req, res, next) => {
  Projects.insert(req.body)
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(400).json({
        message: "Could not load with the given id",
        error: err.message,
      });
    });
});
router.put("/:id", (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then((projects) => {
      if (!req.body.name || !req.body.description || req.body.completed) {
        res.status(400).json({
          message: "Could not update",
          error: err.message,
        });
      } else {
        res.status(200).json(projects);
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: "Could not update",
        error: err.message,
      });
    });
});
router.delete("/id:", (req, res, next) => {
  Projects.remove(req.params.id)
    .then((projects) => {
      res.json(projects);
    })
    .catch((err) => {
      res.status(500).res.json({
        message: "Could not delete",
        error: err.message,
      });
    });
});

router.get("/:id/actions", (req, res, next) => {
  Projects.getProjectActions(re.params.id)
    .then((actions) => {
      res.status(200).res.json(actions);
    })
    .catch((err) => {
      res.status(404).json({
        message: "Could not get actions with that ID",
        error: err.message,
      });
    });
});
module.exports = router;
