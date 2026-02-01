

export enum SubscriberType {
  HomeBuilder = 'HomeBuilder',
  HomeBuyer = 'HomeBuyer',
}

export enum CommunicationMethod {
  Email = 'Email',
  SMS = 'SMS',
  Phone = 'Phone',
  Post = 'Post',
}

export enum Interest {
  Houses = 'Houses',
  Apartments = 'Apartments',
  SharedOwnership = 'SharedOwnership',
  Rental = 'Rental',
  LandSourcing = 'LandSourcing',
}

export interface CreateSubscriberDto {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  communicationMethods: string[];
  interests: string[];
}


export interface SubscriberResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  communicationMethods: string[];
  interests: string[];
  createdAt: string;
  updatedAt?: string;
  isActive: boolean;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

export interface NewsletterFormData {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  communicationMethods: string[];
  interests: string[];
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export interface CheckboxGroupProps {
  label: string;
  options: { value: string; label: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  error?: string;
  required?: boolean;
}

export interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
}

export interface RadioGroupOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  label: string;
  name: string;
  options: RadioGroupOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  footer?: React.ReactNode;
}

export interface Lookup {
  id: string;
  category: string;
  value: string;
  label: string;
  sortOrder: number;
  isActive: boolean;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  role: 'Admin' | 'User';
}

export interface AuthResponse {
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'Admin' | 'User';
}

