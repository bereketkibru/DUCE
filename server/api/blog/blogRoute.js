const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
//Blog model
const { Blog } = require("./blogModel");
//Profile model
const Profile = require("../profile/profileModel");
//validation
const validatePostInput = require("../../validation/post");
const validateForumInput = require("../../validation/forum");
//Permission
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

//=================================
//             Blog
//=================================

// fieldname: 'file',
// originalname: 'React.png',
// encoding: '7bit',
// mimetype: 'image/png',
// destination: 'uploads/',
// filename: '1573656172282_React.png',
// path: 'uploads/1573656172282_React.png',
// size: 24031

//@route   GET api/post/test
//@desc    Test post route
//@access  Public
router.get("/test", (req, res) => res.send("hello from Blog"));

//@route   GET api/blog/uploadfiles
//@desc    Test post route
//@access  Public
router.post(
  "/uploadfiles",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);
//@route   GET api/blog/createPost
//@desc    Test post route
//@access  Private

router.post(
  "/createPost",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (canCreatePost(req.user)) {
      const { errors, isValid } = validatePostInput(req.body);
      //check validation
      if (!isValid) {
        //If any errors,send 400 with errors object
        return res.status(400).json(errors);
      }
      let blog = new Blog({
        content: req.body.content,
        writer: req.body.userID,
        name: req.body.name,
        avatar: req.body.avatar,
      });

      blog.save((err, postInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, postInfo });
      });
    } else {
      return res.status(401).json({ notauthorized: "User not authorized" });
    }
  }
);

//@route   GET api/blog/getBlogs
//@desc    Test post route
//@access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Blog.find()
      .populate("writer")
      .sort({ createdAt: -1 })
      .then((posts) => res.json(posts))
      .catch((err) => res.status(404).json("No posts found"));
  }
);
//@route   GET api/blog/getPost
//@desc    Test post route
//@access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Blog.findById(req.params.id)
      .populate("writer")
      .then((post) => res.json(post))
      .catch((err) =>
        res.status(404).json({ nopostfound: "No post found with that ID" })
      );
  }
);
//@route   DELETE api/blog/:id
//@desc    Delete post
//@access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Blog.findById(req.params.id)
        .then((post) => {
          //Check for post owner or Admin
          console.log(req.user, post.writer);
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
//@route   POST api/blog/like/:id
//@desc    Like post
//@access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Blog.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }
          //Add user id to likes array and save
          post.likes.unshift({ user: req.user.id });
          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })
        );
    });
  }
);
//@route   POST api/blog/unlike/:id
//@desc    Unlike post
//@access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Blog.findById(req.params.id)
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

//@route   POST api/blog/comment/:id
//@desc    Add comment to post
//@access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateForumInput(req.body);
    //check validation
    if (!isValid) {
      //If any errors,send 400 with errors object
      return res.status(400).json(errors);
    }
    Blog.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.user.name,
          avatar: req.user.avatar,
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

//@route   DELETE api/blog/comment/:id/:comment_id
//@desc    Remove comment from post
//@access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Blog.findById(req.params.id)
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
