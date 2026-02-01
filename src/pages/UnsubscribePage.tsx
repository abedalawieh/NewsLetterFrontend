import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Input } from "../components/Input/Input";
import "./UnsubscribePage.css";

export const UnsubscribePage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    navigate(`/unsubscribe?email=${encodeURIComponent(email.trim())}`);
  };

  return (
    <div className="unsubscribe-email-page">
      <div className="unsubscribe-email-container">
        <Card
          title="Unsubscribe"
          subtitle="Enter your email to manage your subscription"
        >
          <form onSubmit={handleSubmit} className="unsubscribe-email-form">
            <p className="unsubscribe-email-intro">
              We're sorry to see you go. Please enter the email address you used
              to subscribe, and we'll help you manage your preferences.
            </p>

            <Input
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              required
            />

            <div className="unsubscribe-email-actions">
              <Button type="submit" variant="primary" size="large">
                Continue
              </Button>
              <Button
                type="button"
                variant="outline"
                size="large"
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default UnsubscribePage;
