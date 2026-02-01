import React from 'react';
import type { ButtonProps } from '@/types';
import './Button.css';

/**
 * Reusable Button Component
 * Following Single Responsibility Principle and React best practices
 * Fully typed with TypeScript for type safety
 * 
 * @example
 * <Button variant="primary" size="medium" onClick={handleClick}>
 *   Submit
 * </Button>
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  fullWidth = false,
  disabled = false,
  children,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseClass = 'btn';
  const variantClass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  const fullWidthClass = fullWidth ? 'btn--full-width' : '';
  const loadingClass = isLoading ? 'btn--loading' : '';

  const combinedClassName = [
    baseClass,
    variantClass,
    sizeClass,
    fullWidthClass,
    loadingClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={combinedClassName}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="btn__spinner" aria-hidden="true">
          <svg className="btn__spinner-icon" viewBox="0 0 24 24">
            <circle
              className="btn__spinner-circle"
              cx="12"
              cy="12"
              r="10"
              fill="none"
              strokeWidth="3"
            />
          </svg>
        </span>
      )}
      <span className={isLoading ? 'btn__content--loading' : 'btn__content'}>
        {children}
      </span>
    </button>
  );
};

// Named export for flexibility
export default Button;
