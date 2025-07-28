import type React from "react";
import type { BaseFormFieldProps } from "../../../types/FormTypes";
import "../../../assets/styles/FormField.css";

interface TextInputProps extends BaseFormFieldProps {
  type?: "text" | "email" | "password";
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  className = "",
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const inputId = `text-input-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div
      className={`form-field ${className} ${error ? "form-field-error" : ""}`}
    >
      <label htmlFor={inputId} className="form-label">
        {label}
        {required && <span className="form-required">*</span>}
      </label>

      <input
        id={inputId}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className="form-input"
        required={required}
      />

      {error && <span className="form-error-message">{error}</span>}
    </div>
  );
};

export default TextInput;
