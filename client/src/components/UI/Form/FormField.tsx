import type React from "react";
import "../../../assets/styles/FormField.css";

interface FormFieldProps {
  label: string;
  type?: "text" | "email" | "password" | "select" | "textarea";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  options?: { value: string; label: string }[];
  rows?: number;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  className = "",
  options = [],
  rows = 3,
}) => {
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    onChange(event.target.value);
  };

  const inputId = `form-field-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div
      className={`form-field ${className} ${error ? "form-field-error" : ""}`}
    >
      <label htmlFor={inputId} className="form-label">
        {label}
        {required && <span className="form-required">*</span>}
      </label>

      {type === "select" ? (
        <select
          id={inputId}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className="form-input form-select"
          required={required}
        >
          <option value="">{placeholder || "Sélectionner une option"}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
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
      ) : (
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
      )}

      {error && <span className="form-error-message">{error}</span>}
    </div>
  );
};

export default FormField;
