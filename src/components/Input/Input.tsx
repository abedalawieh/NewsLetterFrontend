import React from 'react';
import type { InputProps } from '@/types';
import './Input.css';

/**
 * Reusable Input Component
 * Fully accessible with proper ARIA attributes
 * Supports validation states and helper text
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  id,
  required = false,
  className = '',
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-label__required" aria-label="required">*</span>}
        </label>
      )}

      <input
        id={inputId}
        className={`input ${error ? 'input--error' : ''}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? errorId : helperText ? helperId : undefined
        }
        required={required}
        {...props}
      />

      {error && (
        <p id={errorId} className="input-error" role="alert">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p id={helperId} className="input-helper">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
