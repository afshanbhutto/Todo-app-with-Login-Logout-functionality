import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 py-4 text-center mt-5 mx-auto">
      <p className="text-black text-sm break-words">
        &copy; {currentYear} designed and developed by{" "}
        <span className="text-yellow-700 font-bold tracking-tight">
          Afshan Bhutto
        </span>{" "}
        . All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
