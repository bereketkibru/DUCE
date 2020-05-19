var router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");
//forum model
const Qanda = require("./QandAmodel");
//profile model
const Profile = require("../profile/profileModel");
//validation
const validateQuestionInput = require("../../validation/question");
const validateAnswerInput = require("../../validation/answer");

//@route   GET api/qanda/test
//@desc    Test Q&A route
//@access  Public
router.get("/test", (req, res) => res.send("hello from Q&A"));

//@route   GET api/qadns
//@desc    Get forums
//@access  Public
router.get("/", (req, res) => {
  Qanda.find()
    .sort({ date: -1 })
    .then((qandas) => res.json(qandas))
    .catch((err) => res.status(404).json("No Question found"));
});
//@route   GET api/qandas/:id
//@desc    Get a Q&A
//@access  Public
router.get("/:id", (req, res) => {
  Qanda.findById(req.params.id)
    .then((qanda) => res.json(qanda))
    .catch((err) =>
      res.status(404).json({ noquetionfound: "No question found with that ID" })
    );
});
//@route   forum api/qands
//@desc    Create Question
//@access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateQuestionInput(req.body);
    //check validation
    if (!isValid) {
      //If any errors,send 400 with errors object
      return res.status(400).json(errors);
    }
    const newQanda = new Qanda({
      question: req.body.question,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    });
    newQanda.save().then((qanda) => res.json(qanda));
  }
);

//@route   DELETE api/qands/:id
//@desc    Delete Question
//@access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Qanda.findById(req.params.id)
        .then((qanda) => {
          //Check for question owner
          if (qanda.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          //Delete
          qanda.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ questionnotfound: "No question found" })
        );
    });
  }
);

//@route   POST api/qandas/:id
//@desc    Add answer
//@access  Private
router.post(
  "/answer/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAnswerInput(req.body);
    //check validation
    if (!isValid) {
      //If any errors,send 400 with errors object
      return res.status(400).json(errors);
    }
    Qanda.findById(req.params.id)
      .then((qanda) => {
        const newAnswer = {
          answer: req.body.answer,
          name: req.body.name,
          avatar: req.body.id,
          user: req.user.id,
        };
        //Add to answer array
        qanda.answers.unshift(newAnswer);
        //save
        qanda.save().then((qanda) => res.json(qanda));
      })
      .catch((err) =>
        res.status(404).json({ questionnotfound: "No question found" })
      );
  }
);

//@route   DELETE api/qandas/answer/:id/:answer_id
//@desc    Remove answer from question
//@access  Private
router.delete(
  "/answer/:id/:answer_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Qanda.findById(req.params.id)
      .then((qanda) => {
        //Check to see if question and answer exists
        if (
          qanda.answers.filter(
            (answer) => answer._id.toString() === req.params.answer_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ answernotexists: "Thread does not exist" });
        }
        //Get remove index
        const removeIndex = qanda.answers
          .map((item) => item._id.toString())
          .indexOf(req.params.answer_id);

        //Splice answer out of array
        qanda.answers.splice(removeIndex, 1);
        qanda.save().then((qanda) => res.json(qanda));
      })
      .catch((err) =>
        res.status(404).json({ questionnotfound: "No forum found" })
      );
  }
);
//@route   POST api/qandas/lock/:id/
//@desc    Lock answer and question
//@access  Private
router.post(
  "/lock/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Qanda.findById(req.params.id)
        .then((qanda) => {
          //Check for question owner
          if (qanda.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          //Lock
          qanda.lock = true;
          qanda.save().then((qanda) => res.json(qanda));
        })
        .catch((err) =>
          res.status(404).json({ questionnotfound: "No question found" })
        );
    });
  }
);
//@route   POST api/qandas/accept/:id/:answer_id
//@desc    Lock answer and question
//@access  Private
router.post(
  "/accept/:id/:answer_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Qanda.findById(req.params.id)
        .then((qanda) => {
          //Check for question owner
          if (qanda.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          //Get update index
          const updateIndex = qanda.answers
            .map((item) => item._id.toString())
            .indexOf(req.params.answer_id);
          //accept

          qanda.answers[updateIndex].status = true;
          //accept
          qanda.save().then((qanda) => res.json(qanda));
        })
        .catch((err) =>
          res.status(404).json({ questionnotfound: "No question found" })
        );
    });
  }
);

module.exports = router;
