import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

function TextFieldGroup({
  name,
  placeholder,
  value,
  error,
  info,
  type,
  onChange,
  disabled,
}) {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="from-text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.string,
  placeholder: PropTypes.string,
};
TextFieldGroup.defaultProps = {
  type: "text",
};
export default TextFieldGroup;
