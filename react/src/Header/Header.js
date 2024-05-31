import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  let title = "Health AR Management Tool";

  if (pathname === '/') {
    title += " - Posting ERA";
  } else if (pathname === '/update-patient-balance') {
    title += " - Update Patient Balance";
  } else if (pathname === '/messages') {
    title += " - Sending Messages";
  } else if (pathname === '/generate-invoice') {
    title += " - Create Invoices";
  } else if (pathname === '/credit-card-charge') {
    title += " - Charge Credit Cards";
  }

  return (
    <div className="border border-warning bg-warning mb-4">
      <h1 className="display-5 sectionTitle fw-bold mb-4 pt-4 text-dark text-center">
        {title}
      </h1>
    </div>
  );
};

export default Header;