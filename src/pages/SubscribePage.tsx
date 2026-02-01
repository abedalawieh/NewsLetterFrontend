import React from "react";
import { Link } from "react-router-dom";
import { NewsletterForm } from "../components/NewsletterForm/NewsletterForm";
import { SiteLayout } from "../components/SiteLayout/SiteLayout";
import "./SubscribePage.css";

export const SubscribePage: React.FC = () => {
  return (
    <SiteLayout className="subscribe-page">
      <header className="subscribe-header">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <h1>Subscribe to Our Newsletter</h1>
        <p>Fill in your details and select your interests to stay updated.</p>
      </header>
      <main className="subscribe-main">
        <NewsletterForm />
        <div className="subscribe-footer-links">
          <Link to="/newsletters">Browse our newsletters</Link>
          <span className="divider">|</span>
          <Link to="/unsubscribe-email">Unsubscribe</Link>
        </div>
      </main>
    </SiteLayout>
  );
};
