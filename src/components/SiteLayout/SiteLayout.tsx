import React from "react";
import { SiteFooter } from "../SiteFooter/SiteFooter";
import "./SiteLayout.css";

type SiteLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export const SiteLayout: React.FC<SiteLayoutProps> = ({ children, className }) => {
  return (
    <div className={`site-layout ${className ?? ""}`.trim()}>
      {children}
      <SiteFooter />
    </div>
  );
};

export default SiteLayout;
