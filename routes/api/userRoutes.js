const router = require("express").Router();
const {
  usersGetAll,
  userGetSingle,
  userCreate,
  userUpdate,
  userDelete,
  friendAdd,
  friendRemove,
} = require("../../controllers/userController");

router.route("/").get(usersGetAll).post(userCreate);

router.route("/:userId").get(userGetSingle).put(userUpdate).delete(userDelete);

router.route("/:userId/friends/:friendId").put(friendAdd).delete(friendRemove);

module.exports = router;