const validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateAnnInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";
  data.title = !isEmpty(data.title) ? data.title : "";
  data.link = !isEmpty(data.link) ? data.link : "";

  if (!validator.isLength(data.text, { min: 10, max: 3000 })) {
    errors.text = "Announcement must be between 10 and 3000 characters";
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
  if (!isEmpty(data.link)) {
    if (!validator.isURL(data.link)) {
      errors.link = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
