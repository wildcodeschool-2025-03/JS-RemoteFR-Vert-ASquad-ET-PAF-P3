import type React from "react";
import type { BaseFormFieldProps } from "../../../types/FormTypes";
import "../../../assets/styles/FormField.css";

interface TextAreaInputProps extends BaseFormFieldProps {
  rows?: number;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  className = "",
  rows = 3,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  const inputId = `textarea-input-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div
      className={`form-field ${className} ${error ? "form-field-error" : ""}`}
    >
      <label htmlFor={inputId} className="form-label">
        {label}
        {required && <span className="form-required">*</span>}
      </label>

      <textarea
        id={inputId}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className="form-input form-textarea"
        required={required}
      />

      {error && <span className="form-error-message">{error}</span>}
    </div>
  );
};

export default TextAreaInput;
