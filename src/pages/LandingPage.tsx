import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { SiteLayout } from "../components/SiteLayout/SiteLayout";
import "./LandingPage.css";

export const LandingPage: React.FC = () => {
  return (
    <SiteLayout className="landing-page">
      <header className="landing-header">
        <div className="landing-header-content">
          <h1 className="landing-title">Stay Informed</h1>
          <p className="landing-subtitle">
            Get the latest updates, insights, and exclusive content delivered
            straight to your inbox.
          </p>
          <div className="landing-cta">
            <Link to="/subscribe">
              <Button variant="primary" size="large">
                Subscribe to Our Newsletter
              </Button>
            </Link>
            <Link to="/newsletters">
              <Button variant="outline" size="large">
                Browse Newsletters
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="landing-features">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📬</div>
            <h3>Curated Content</h3>
            <p>Hand-picked articles and updates tailored to your interests.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Stay Updated</h3>
            <p>
              Never miss important news. Get notified when new content drops.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Easy Unsubscribe</h3>
            <p>Change your mind? Unsubscribe anytime with one click.</p>
          </div>
        </div>
      </section>

      <section className="landing-cta-section">
        <h2>Ready to join?</h2>
        <p>Thousands of readers already get our best content.</p>
        <Link to="/subscribe">
          <Button variant="primary" size="large">
            Subscribe Now
          </Button>
        </Link>
      </section>
    </SiteLayout>
  );
};
