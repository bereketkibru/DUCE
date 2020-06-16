import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

function SelectListGroup({ name, value, error, info, onChange, options }) {
  const selectOptions = options.map((option) => (
    <option key={option.lable} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="from-text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.array.isRequired,
};

export default SelectListGroup;
