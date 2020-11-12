const express = require("express");
const router = express.Router();
const Hobbits = require("./hobbits-model");

router.get("/", async (req, res, next) => {
  try {
    res.json(await Hobbits.find());
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateID, async (req, res, next) => {
  res.json(req.hobbit);
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).json(await Hobbits.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", validateID, async (req, res, next) => {
  const { id } = req.params;
  try {
    res.json(await Hobbits.remove(id));
  } catch (err) {
    next(err);
  }
});

async function validateID(req, res, next) {
  const { id } = req.params;
  try {
    const hobbit = await Hobbits.findById(id);
    if (!hobbit) {
      res.status(404).json({ message: "no hobbit found with that ID" });
    }

    req.hobbit = hobbit;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = router;
