import React from 'react';
import { Button } from '@components/Button';
import { Input } from '@components/Input/Input';
import { CheckboxGroup } from '@components/CheckboxGroup/CheckboxGroup';
import { Alert } from '@components/Alert';
import { RadioGroup } from '@components/RadioGroup';
import { Card } from '@components/Card';
import { useNewsletterForm } from '@hooks/useNewsletterForm';
import { useMetadata } from '@hooks/useMetadata';
import './NewsletterForm.css';

/**
 * Newsletter Signup Form Component
 * Main form component using composition pattern
 * Clean separation of concerns with custom hooks
 */
export const NewsletterForm: React.FC = () => {
  const {
    formData,
    errors,
    isSubmitting,
    submitSuccess,
    submitError,
    updateField,
    handleSubmit,
    resetForm,
  } = useNewsletterForm();

  const { getByCategory } = useMetadata();

  const subscriberTypeOptions = getByCategory('SubscriberType');
  const communicationMethodOptions = getByCategory('CommunicationMethod');
  const interestOptions = getByCategory('Interest');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
  };

  // Removed blocking loading state to allow form to render immediately
  // Options will populate once metadata is fetched

  return (
    <div className="newsletter-form-container">
      <Card
        title="📬 Newsletter Signup"
        subtitle="Stay updated with the latest property listings and news"
        footer={(
          <p className="newsletter-form-footer__text">
            By subscribing, you agree to receive marketing communications from us.
            You can unsubscribe at any time.
          </p>
        )}
      >
        {submitSuccess && (
          <Alert
            type="success"
            title="Success!"
            message="You've been successfully subscribed to our newsletter."
            onClose={resetForm}
          />
        )}

        {submitError && (
          <Alert
            type="error"
            title="Error"
            message={submitError}
            onClose={() => updateField('email', formData.email)}
          />
        )}

        <form onSubmit={onSubmit} className="newsletter-form" noValidate>
          <div className="form-row">
            <Input
              label="First Name"
              type="text"
              placeholder="John"
              value={formData.firstName}
              onChange={(e) => updateField('firstName', e.target.value)}
              error={errors.firstName}
              required
              disabled={isSubmitting}
            />

            <Input
              label="Last Name"
              type="text"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => updateField('lastName', e.target.value)}
              error={errors.lastName}
              required
              disabled={isSubmitting}
            />
          </div>

          <Input
            label="Email Address"
            type="email"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            error={errors.email}
            helperText="We'll never share your email with anyone else"
            required
            disabled={isSubmitting}
          />

          <RadioGroup
            label="I am a"
            name="subscriberType"
            required
            options={subscriberTypeOptions}
            selectedValue={formData.type}
            onChange={(value) => updateField('type', value)}
            disabled={isSubmitting}
          />

          <CheckboxGroup
            label="Preferred Communication Methods"
            options={communicationMethodOptions}
            selectedValues={formData.communicationMethods}
            onChange={(values) => updateField('communicationMethods', values)}
            error={errors.communicationMethods}
            required
          />

          <CheckboxGroup
            label="I'm interested in"
            options={interestOptions}
            selectedValues={formData.interests}
            onChange={(values) => updateField('interests', values)}
            error={errors.interests}
            required
          />

          <div className="form-actions">
            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default NewsletterForm;
