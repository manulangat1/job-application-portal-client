import React from "react";
import "./ReusableInput.css";
interface ReusableInputProps {
  type: string;
  label: string;
  defaultValue: string;
  placeholder: string;
  value: string;
  name: string;
  onChange: any;
  formik: any;
}

function ReusableInput({
  type,
  defaultValue,
  label,
  placeholder,
  value,
  onChange,
  name,
  formik,
}: ReusableInputProps) {
  return (
    <section className="form-input-group">
      <label className="label">{label}</label>
      <input
        className="reusable-input"
        type={type}
        // defaultValue={defaultValue}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
      {formik.touched[name] && formik.errors[name] ? (
        <div className="fv-plugins-message-container">
          <div className="input-error-message ">{formik.errors[name]}</div>
        </div>
      ) : null}
    </section>
  );
}

export default ReusableInput;
