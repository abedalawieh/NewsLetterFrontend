import React from 'react';
import type { CheckboxGroupProps } from '@/types';
import './CheckboxGroup.css';

/**
 * Reusable CheckboxGroup Component
 * For selecting multiple options from a list
 * Fully accessible with proper ARIA attributes
 */
export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  options,
  selectedValues,
  onChange,
  error,
  required = false,
}) => {
  const groupId = `checkbox-group-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${groupId}-error`;

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedValues, value]);
    } else {
      onChange(selectedValues.filter((v) => v !== value));
    }
  };

  return (
    <div className="checkbox-group" role="group" aria-labelledby={groupId}>
      <div id={groupId} className="checkbox-group__label">
        {label}
        {required && <span className="checkbox-group__required" aria-label="required">*</span>}
      </div>

      <div className="checkbox-group__options">
        {options.map((option) => {
          const isChecked = selectedValues.includes(option.value);
          const checkboxId = `${groupId}-${option.value}`;

          return (
            <label
              key={option.value}
              htmlFor={checkboxId}
              className={`checkbox-option ${isChecked ? 'checkbox-option--checked' : ''}`}
            >
              <input
                type="checkbox"
                id={checkboxId}
                value={option.value}
                checked={isChecked}
                onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                className="checkbox-option__input"
                aria-describedby={error ? errorId : undefined}
              />
              <span className="checkbox-option__checkmark">
                {isChecked && (
                  <svg
                    className="checkbox-option__icon"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3333 4L6 11.3333L2.66666 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span className="checkbox-option__label">{option.label}</span>
            </label>
          );
        })}
      </div>

      {error && (
        <p id={errorId} className="checkbox-group__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default CheckboxGroup;
