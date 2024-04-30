const express=require("express")
const { createCommentController,createCommentReplyController,
    updateCommentController,updateReplyCommentController,
    getCommentsByPostController,deleteCommentController,
    deleteReplyCommentController,likeCommentController,
    dislikeCommentController,likeReplyCommentController,
    dislikeReplyCommentController } = require("../controller/commentController")
const router=express.Router()


router.post("/create",createCommentController)


router.post("/create/reply/:commentId",createCommentReplyController)


router.put("/update/:commentId",updateCommentController)

router.put("/update/:commentId/replies/:replyId",updateReplyCommentController)

router.get("/post/:postId",getCommentsByPostController)


router.delete("/delete/:commentId",deleteCommentController)


router.delete("/delete/:commentId/replies/:replyId",deleteReplyCommentController)

router.post("/like/:commentId/",likeCommentController)

router.post("/dislike/:commentId/",dislikeCommentController)


router.post("/:commentId/replies/like/:replyId",likeReplyCommentController)

router.post("/:commentId/replies/dislike/:replyId",dislikeReplyCommentController)


module.exports=router