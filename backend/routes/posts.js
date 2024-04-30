const express=require("express")
const router=express.Router()
const Post = require('../models/post');
const upload = require('../middleware/upload');
const { createPostWithImagesController,
    updatePostController,getPostsController,
    getUserPostsController,deletePostController,
    likePostController,dislikePostController } = require("../controller/postController")
const { createPostController } = require('../controller/postController');
//CREATE POST
router.post('/create', upload.single('image'), createPostController);

//CREATE POST WITH IMAGES
router.post("/create/:userId",upload.array("image",5),createPostWithImagesController)

//UPDATE POST
router.put("/update/:postId",updatePostController)

//GET ALL POSTS
router.get("/all/:userId",getPostsController)

router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'username fullName profilePicture');
        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//GET USER POSTS
router.get("/user/:userId",getUserPostsController)

//DELETE POST
router.delete("/delete/:postId",deletePostController)

//LIKE POST 
router.post("/like/:postId",likePostController)

//DISLIKE POST
router.post("/dislike/:postId",dislikePostController)

module.exports=router