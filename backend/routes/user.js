const express = require("express");
const { getUserController, updateUserController, followUserController, unfollowUserController, blockUserController, unblockUserController, getBlockedUsersController, deleteUserController, searchUserController, uploadProfilePictureController, uploadCoverPictureController } = require("../controller/userController");

const router = express.Router();
const upload=require("../middleware/upload")
// GET USER
router.get("/:userId", getUserController);
router.put("/update/:userId", updateUserController);

router.post("/follow/:userId",followUserController);

router.post("/unfollow/:userId",unfollowUserController);

router.post("/block/:userId",blockUserController);

router.post("/unblock/:userId",unblockUserController);

router.get("/blocked/:userId",getBlockedUsersController);

router.delete("/delete/:userId",deleteUserController)

router.get("/search/:query",searchUserController)

//UPDATE PROFILE PICTURE
router.put("/update-profile-picture/:userId",upload.single("profilePicture"),uploadProfilePictureController)

//UPDATE PROFILE PICTURE
router.put("/update-cover-picture/:userId",upload.single("coverPicture"),uploadCoverPictureController)

module.exports = router;
