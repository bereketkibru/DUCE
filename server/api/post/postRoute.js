var router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require("multer");
//Post model
const Post = require("./postModel");
//Profile model
const Profile = require("../profile/profileModel");
//validation
const validatePostInput = require("../../validation/post");
//permission
const {
  canCreatePost,
  canDeletePost,
} = require("../../permission/postPermission");

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".mp4") {
      return cb(res.status(400).end("only jpg, png, mp4 is allowed"), false);
    }
    cb(null, true);
  },
});
const upload = multer({ storage: storage }).single("file");

//@route   GET api/post/test
//@desc    Test post route
//@access  Public
router.get("/test", (req, res) => res.send("hello from post"));

//@route   GET api/post/uploadfiles
//@desc    Upload files
//@access
router.post("/uploadfiles", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

//@route   POST api/posts
//@desc    Get post
//@access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json("No posts found"));
});
//@route   POST api/posts/:id
//@desc    Get  post
//@access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});
//@route   POST api/posts
//@desc    Create post
//@access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (canCreatePost(req.user)) {
      const { errors, isValid } = validatePostInput(req.body);
      //check validation
      if (!isValid) {
        //If any errors,send 400 with errors object
        return res.status(400).json(errors);
      }
      const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
      });
      newPost.save().then((post) => res.json(post));
    } else {
      return res.status(401).json({ notauthorized: "User not authorized" });
    }
  }
);

//@route   DELETE api/posts/:id
//@desc    Delete post
//@access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          //Check for post owner or Admin
          if (canDeletePost(req.user, post)) {
            //Delete
            post.remove().then(() => res.json({ success: true }));
          } else {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })
        );
    });
  }
);
//@route   POST api/posts/like/:id
//@desc    Like post
//@access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }
          //Add user id to likes array
          post.likes.unshift({ user: req.user.id });
          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })
        );
    });
  }
);
//@route   POST api/posts/unlike/:id
//@desc    Unlike post
//@access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this post" });
          }
          //Add user id to likes array
          const removeIndex = post.likes
            .map((item) => item.user.toString())
            .indexOf(req.user.id);
          //Splice out of array
          post.likes.splice(removeIndex, 1);
          //save
          post.save().then((post = res.json(post)));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })
        );
    });
  }
);

//@route   POST api/posts/comment/:id
//@desc    Add comment to post
//@access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    //check validation
    if (!isValid) {
      //If any errors,send 400 with errors object
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };
        //Add to comments array
        post.comments.unshift(newComment);
        //save
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
  }
);

//@route   DELETE api/posts/comment/:id/:comment_id
//@desc    Remove comment from post
//@access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        //Chck to see if comment exists
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Commetn does not exist" });
        }
        //Get remove index
        const removeIndex = post.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);

        //Splice comment out of array
        post.comments.splice(removeIndex, 1);
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
