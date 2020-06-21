const validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validatePostInput(data) {
  let errors = {};

  data.content = !isEmpty(data.content) ? data.content : "";

  if (!validator.isLength(data.content, { min: 1, max: 30000 })) {
    errors.content = "Post must be between 10 and 300 characters";
  }
  if (validator.isEmpty(data.content)) {
    errors.content = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
