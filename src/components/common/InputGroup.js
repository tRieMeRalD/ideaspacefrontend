import React from "react";
import PropTypes from "prop-types";

const InputGroup = ({
  divClassName,
  labelClassName,
  forAttr,
  labelTitle,
  inputClassName,
  id,
  type,
  placeholder,
  name,
  value,
  onChange
}) => {
  return (
    <div className={divClassName}>
      <label className={labelClassName} htmlFor={forAttr}>
        {labelTitle}
      </label>

      <input
        className={inputClassName}
        id={id}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

InputGroup.propTypes = {
  labelClassName: PropTypes.string.isRequired,
  forAttr: PropTypes.string.isRequired,
  labelTitle: PropTypes.string.isRequired,
  inputClassName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
