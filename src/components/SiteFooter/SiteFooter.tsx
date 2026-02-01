import React from "react";
import { Link } from "react-router-dom";
import "./SiteFooter.css";

export const SiteFooter: React.FC = () => {
  return (
    <footer className="site-footer">
      <Link to="/unsubscribe-email" className="footer-link">
        Unsubscribe
      </Link>
      <span className="footer-divider">|</span>
      <span className="footer-copy">
        © {new Date().getFullYear()} Newsletter Hub
      </span>
    </footer>
  );
};

export default SiteFooter;
