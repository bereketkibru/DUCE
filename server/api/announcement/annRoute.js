var router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");

const {
  canCreateAnn,
  canDeleteAnn,
} = require("../../permission/annPermission");
//Post model
const Ann = require("./annModel");
//Post model
const Profile = require("../profile/profileModel");
//validation
const validateAnnInput = require("../../validation/announcement");

//@route   GET api/post/test
//@desc    Test post route
//@access  Public
router.get("/test", (req, res) => res.send("hello from Announcement"));

//@route   POST api/announcement
//@desc    Get Announcement
//@access  Public
router.get("/", (req, res) => {
  Ann.find()
    .sort({ date: -1 })
    .then((anns) => res.json(anns))
    .catch((err) => res.status(404).json("No posts found"));
});
//@route   POST api/posts
//@desc    Create post
//@access  Public
router.get("/:id", (req, res) => {
  Ann.findById(req.params.id)
    .then((ann) => res.json(ann))
    .catch((err) =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

//@route   POST api/announcement
//@desc    Create post
//@access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    if (canCreateAnn(req.user)) {
      const { errors, isValid } = validateAnnInput(req.body);
      //check validation
      if (!isValid) {
        //If any errors,send 400 with errors object
        return res.status(400).json(errors);
      }
      const newAnn = new Ann({
        title: req.body.title,
        text: req.body.text,
        link: req.body.link,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
        status: req.body.status,
      });
      newAnn.save().then((ann) => res.json(ann));
    } else {
      return res.status(401).json({ notauthorized: "User not authorized" });
    }
  }
);

//@route   DELETE api/announcement/:id
//@desc    Delete Announcement
//@access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Ann.findById(req.params.id)
        .then((ann) => {
          //Check for announcement owner

          if (canDeleteAnn(req.user, ann)) {
            //Delete
            ann.remove().then(() => res.json({ success: true }));
          } else {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
        })

        .catch((err) =>
          res.status(404).json({ announcementnotfound: "No post found" })
        );
    });
  }
);

module.exports = router;
