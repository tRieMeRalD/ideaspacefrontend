import React from "react";
import PropTypes from "prop-types";

const TextAreaGroup = ({
  divClassName,
  labelClassName,
  forAttr,
  labelTitle,
  textAreaClassName,
  id,
  type,
  rows,
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
      <textarea
        className={textAreaClassName}
        name={name}
        id={id}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        style={{ whiteSpace: "pre-wrap" }}
      />
    </div>
  );
};

TextAreaGroup.propTypes = {
  divClassName: PropTypes.string.isRequired,
  labelClassName: PropTypes.string.isRequired,
  forAttr: PropTypes.string.isRequired,
  labelTitle: PropTypes.string.isRequired,
  textAreaClassName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  rows: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChang: PropTypes.func.isRequired
};

export default TextAreaGroup;
