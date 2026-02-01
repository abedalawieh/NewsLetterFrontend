import { useState } from 'react';
import type { NewsletterFormData, ApiError } from '@/types';
import { subscriberService } from '@services/subscriberService';

/**
 * Custom Hook for Newsletter Form
 * Following separation of concerns - business logic separate from UI
 * Manages form state, validation, and submission
 */
export const useNewsletterForm = () => {
  const [formData, setFormData] = useState<NewsletterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    type: '',
    communicationMethods: [],
    interests: [],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof NewsletterFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  /**
   * Update form field
   */
  const updateField = <K extends keyof NewsletterFormData>(
    field: K,
    value: NewsletterFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  /**
   * Validate form data
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof NewsletterFormData, string>> = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Type validation
    if (!formData.type.trim()) {
      newErrors.type = 'Please select your subscriber type';
    }

    // Communication methods validation
    if (formData.communicationMethods.length === 0) {
      newErrors.communicationMethods = 'Please select at least one communication method';
    }

    // Interests validation
    if (formData.interests.length === 0) {
      newErrors.interests = 'Please select at least one interest';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async () => {
    setSubmitError(null);
    setSubmitSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await subscriberService.createSubscriber(formData);
      setSubmitSuccess(true);

      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        type: '',
        communicationMethods: [],
        interests: [],
      });
      setErrors({});
    } catch (error) {
      const apiError = error as ApiError;
      setSubmitError(apiError.message);

      // Handle validation errors from backend
      if (apiError.errors) {
        const backendErrors: Partial<Record<keyof NewsletterFormData, string>> = {};
        Object.entries(apiError.errors).forEach(([key, messages]) => {
          const fieldKey = key.charAt(0).toLowerCase() + key.slice(1) as keyof NewsletterFormData;
          backendErrors[fieldKey] = Array.isArray(messages) ? messages[0] : messages;
        });
        setErrors(backendErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Reset form
   */
  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      type: '',
      communicationMethods: [],
      interests: [],
    });
    setErrors({});
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitSuccess,
    submitError,
    updateField,
    handleSubmit,
    resetForm,
  };
};
