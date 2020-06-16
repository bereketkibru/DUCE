const validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateQuestionInput(data) {
  let errors = {};

  data.question = !isEmpty(data.question) ? data.question : "";

  if (!validator.isLength(data.question, { min: 5, max: 3000 })) {
    errors.question = "Question must be between 5 and 1000 characters";
  }
  if (validator.isEmpty(data.question)) {
    errors.question = "Question field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
