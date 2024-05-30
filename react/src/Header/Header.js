import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <div className="border border-warning bg-warning mb-4">
      <h1 className="display-5 sectionTitle fw-bold mb-4 pt-4 text-dark text-center">
      Health AR Management Tool
        { pathname === '/' ? " Posting ERA" : " Update Patient Balance" }
      </h1>
    </div>
  );
};

export default Header;