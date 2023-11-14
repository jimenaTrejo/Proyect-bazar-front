import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNavToggle = () => {
    setNav(!nav);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#e91e63" }}>
    <div className="navbar-collapse justify-content-end">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link" style={{ color: "#fff" }}>
            Inicio
          </Link>
        </li>
      </ul>
    </div>
  </nav>
  );
};

export default Navbar;
