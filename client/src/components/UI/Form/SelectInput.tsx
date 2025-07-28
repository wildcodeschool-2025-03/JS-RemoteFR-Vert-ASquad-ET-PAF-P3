import type React from "react";
import type {
  BaseFormFieldProps,
  SelectOption,
} from "../../../types/FormTypes";
import "../../../assets/styles/FormField.css";

interface SelectInputProps extends BaseFormFieldProps {
  options: SelectOption[];
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  className = "",
  options,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  const inputId = `select-input-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div
      className={`form-field ${className} ${error ? "form-field-error" : ""}`}
    >
      <label htmlFor={inputId} className="form-label">
        {label}
        {required && <span className="form-required">*</span>}
      </label>

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

      {error && <span className="form-error-message">{error}</span>}
    </div>
  );
};

export default SelectInput;
