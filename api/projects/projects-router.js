// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const Projects = require("../projects/projects-model");
const {
  validateFunctionID,
  validateUser,
  validateBody,
  validateId,
} = require("./projects-middleware");
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
      if (projects) {
        res.status(201).json(projects);
      } else {
        res.status(404).json({
          message: "Could find project with the given id",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Problem retrieving the project" });
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
router.put("/:id", validateBody, (req, res) => {});

router.delete("/:id", validateId, (req, res) => {
  Projects.remove(req.params.id)
    .then((projects) => {
      res.status(200).json({ message: deleted });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Could not delte",
      });
    });
});

router.get("/:id/actions", validateId, (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Could not get",
      });
    });
});

module.exports = router;
