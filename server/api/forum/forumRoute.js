var router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");
//forum model
const Forum = require("./forumModel");
//profile model
const Profile = require("../profile/profileModel");
//validation
const validateForumInput = require("../../validation/forum");
const validateThreadInput = require("../../validation/theread");

//@route   GET api/forum/test
//@desc    Test forum route
//@access  Public
router.get("/test", (req, res) => res.send("hello from Forum"));

//@route   GET api/forums
//@desc    Get forums
//@access  Public
router.get("/", (req, res) => {
  Forum.find()
    .sort({ date: -1 })
    .then((forums) => res.json(forums))
    .catch((err) => res.status(404).json("No Forum found"));
});
//@route   GET api/forums
//@desc    Get a forum
//@access  Public
router.get("/:id", (req, res) => {
  Forum.findById(req.params.id)
    .then((forum) => res.json(forum))
    .catch((err) =>
      res.status(404).json({ noforumfound: "No forum found with that ID" })
    );
});
//@route   forum api/forums
//@desc    Create Fourms
//@access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateForumInput(req.body);
    //check validation
    if (!isValid) {
      //If any errors,send 400 with errors object
      return res.status(400).json(errors);
    }
    const newForum = new Forum({
      text: req.body.text,
      title: req.body.title,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    });
    newForum.save().then((forum) => res.json(forum));
  }
);

//@route   DELETE api/forums/:id
//@desc    Delete forum
//@access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Forum.findById(req.params.id)
        .then((forum) => {
          //Check for forum owner
          if (forum.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          //Delete
          forum.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ forumnotfound: "No forum found" })
        );
    });
  }
);
//@route   POST api/forums/upvote/:id
//@desc    vote for forum
//@access  Private
router.post(
  "/vote/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Forum.findById(req.params.id)
        .then((forum) => {
          if (
            forum.votes.filter((vote) => vote.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyvoted: "User already voted this forum" });
          }
          //Add user id to likes array
          forum.votes.unshift({ user: req.user.id });
          forum.save().then((forum) => res.json(forum));
        })
        .catch((err) =>
          res.status(404).json({ forumnotfound: "No forum found" })
        );
    });
  }
);
//@route   POST api/forums/unvote/:id
//@desc    unvote forum
//@access  Private
router.post(
  "/unvote/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Forum.findById(req.params.id)
        .then((forum) => {
          if (
            forum.votes.filter((vote) => vote.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notvoted: "You have not yet voted for this forum" });
          }
          //Add user id to votes array
          const removeIndex = forum.votes
            .map((item) => item.user.toString())
            .indexOf(req.user.id);
          //Splice out of array
          forum.votes.splice(removeIndex, 1);
          //save
          forum.save().then((forum = res.json(forum)));
        })
        .catch((err) =>
          res.status(404).json({ forumnotfound: "No forum found" })
        );
    });
  }
);

//@route   POST api/forums/thread/:id
//@desc    Add thread to forum
//@access  Private
router.post(
  "/thread/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateThreadInput(req.body);
    //check validation
    if (!isValid) {
      //If any errors,send 400 with errors object
      return res.status(400).json(errors);
    }
    Forum.findById(req.params.id)
      .then((forum) => {
        const newThread = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };
        //Add to thread array
        forum.threads.unshift(newThread);
        //save
        forum.save().then((forum) => res.json(forum));
      })
      .catch((err) =>
        res.status(404).json({ forumnotfound: "No forum found" })
      );
  }
);

//@route   DELETE api/fourms/thread/:id/:thread_id
//@desc    Remove thread from forum
//@access  Private
router.delete(
  "/thread/:id/:thread_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Forum.findById(req.params.id)
      .then((forum) => {
        //Check to see if forum exists
        if (
          forum.threads.filter(
            (thread) => thread._id.toString() === req.params.thread_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Thread does not exist" });
        }
        //Get remove index
        const removeIndex = forum.threads
          .map((item) => item._id.toString())
          .indexOf(req.params.thread_id);

        //Splice comment out of array
        forum.threads.splice(removeIndex, 1);
        forum.save().then((forum) => res.json(forum));
      })
      .catch((err) =>
        res.status(404).json({ forumnotfound: "No forum found" })
      );
  }
);

module.exports = router;
