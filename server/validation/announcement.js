const validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateAnnInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";
  data.title = !isEmpty(data.title) ? data.title : "";

  if (!validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Announcement must be between 10 and 300 characters";
  }
  if (validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }
  if (!validator.isLength(data.title, { min: 2, max: 40 })) {
    errors.title = "title must be between 2 and 40 characters";
  }
  if (validator.isEmpty(data.title)) {
    errors.title = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};