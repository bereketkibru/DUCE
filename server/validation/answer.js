const validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateQuestionInput(data) {
  let errors = {};

  data.answer = !isEmpty(data.answer) ? data.answer : "";

  if (!validator.isLength(data.answer, { min: 1, max: 30000 })) {
    errors.answer = "Answer must be between 1 and 1000 characters";
  }
  if (validator.isEmpty(data.answer)) {
    errors.answer = "Answer field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
