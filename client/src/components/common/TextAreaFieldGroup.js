import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

function TextAreaFieldGroup({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
}) {
  return (
    <div className="form-group">
      <textarea
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="from-text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string,
};

export default TextAreaFieldGroup;
