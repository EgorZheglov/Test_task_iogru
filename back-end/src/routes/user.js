const router = require("express").Router();
const {
  getUsersController,
  deleteUserController,
  createUserController,
  updateUserController,
} = require("../controllers/user");

router.get("/", (req, res) => {
  const result = getUsersController();

  if (Array.isArray(result)) {
    res.status(201).send(result);
  }
});

router.delete("/:id", (req, res) => {
  deleteUserController(req.params.id);
  return res.status(204).send({ message: "deleted" });
});

router.post("/", (req, res) => {
  createUserController(req.body);
  res.status(201).send({ message: "created" });
});

router.put("/", (req, res) => {
  updateUserController(req.body);
  res.status(203).send({ message: "updated" });
});

module.exports = router;
