import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 text-center mt-20">
      <p className="text-sm">&copy; {new Date().getFullYear()} SkillSwap. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
