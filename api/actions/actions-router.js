// Write your "actions" router here!
const express = require("express");
const router = express.Router();
const Actions = require("./actions-model");
const { validateBody, validateFunction } = require("./actions-middlware");
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
router.get("/:id", validateFunction, (req, res, next) => {
  Actions.get(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});
router.post("/", validateBody, (req, res, next) => {
  Actions.insert(req.body)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error",
      });
    });
});
router.put("/:id", validateBody, validateFunction, (req, res) => {
  Actions.update(req.params.id, req.body)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating",
        error: err.message,
      });
    });
  // Actions.get(req.params.id)
  //   .then((resp) => {
  //     if (resp) {
  //       Actions.update(req.params.id, req.body)
  //         .then((innerResp) => {
  //           res.status(200).json(innerResp);
  //         })
  //         .catch((error) => {
  //           res.status(500).json({ message: "Server Error: could not update" });
  //         });
  //     } else {
  //       res
  //         .status(404)
  //         .json({ message: "could not find an action with that id" });
  //     }
  //   })
  //   .catch((error) => {
  //     res.status(500).json({ message: "Server Error: could not update" });
  //   });
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
