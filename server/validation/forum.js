const validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateForumInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!validator.isLength(data.text, { min: 1, max: 30000 })) {
    errors.text = "Forum must be between 10 and 300 characters";
  }
  if (validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
