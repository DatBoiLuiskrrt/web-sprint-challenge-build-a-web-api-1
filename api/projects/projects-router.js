// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const Projects = require("../projects/projects-model");
const { validateFunctionID, validateUser } = require("./projects-middleware");
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
router.get("/:id", validateFunctionID, (req, res, next) => {
  res.json(req.projects);
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
  const { id } = req.params;
  const { name, description, completed } = req.body;
  Projects.update(id, req.body)
    .then((project) => {
      if (!req.body || !name || !description || completed == true) {
        res.status(400).json({
          message: "error",
        });
      } else {
        res.status(200).json(project);
      }
    })
    .catch(next);
});

router.delete("/:id", validateFunctionID, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteProj = await Projects.remove(id);
    res.json(deleteProj);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/actions", (req, res, next) => {
  Projects.getProjectActions(re.params.id)
    .then((actions) => {
      if (!req.params.id) {
        res.json([]);
      } else {
        res.status(200).json(actions);
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: "Could not get actions with that ID",
        error: err.message,
      });
    });
});

module.exports = router;
