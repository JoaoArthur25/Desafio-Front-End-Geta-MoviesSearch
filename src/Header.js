import React from "react";
import "./Header.css";
function Header() {
  return (
    <header>
      <div className="header-content">
        <div className="logo">All your movies in one place 🎥</div>
        <h1 style= {{ textAlign: "center" }}>Movies Search 🎬</h1>
        <nav>
          <ul></ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;






