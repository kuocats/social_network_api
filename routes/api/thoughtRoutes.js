const router = require('express').Router();
const {
  thoughtsGetAll,
  thoughtGetSingle,
  thoughtCreate,
  thoughtDelete,
  thoughtUpdate,
  reactionCreate,
  reactionRemove
} = require("../../controllers/thoughtController");

router.route("/").get(thoughtsGetAll).post(thoughtCreate);

router.route("/:thoughtId").get(thoughtGetSingle).delete(thoughtDelete).put(thoughtUpdate);

router.route("/:thoughtId/reactions").post(reactionCreate);

router.route("/:thoughtId/reactions/:reactionId").delete(reactionRemove);

module.exports = router;