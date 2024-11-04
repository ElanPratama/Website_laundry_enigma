import { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { AcmeLogo } from "../AcmeLogo.jsx";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function NavbarComponent() {
  const [activeItem, setActiveItem] = useState("home");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleNavigation = (path, item) => {
    setActiveItem(item);
    navigate(path); // Navigate to the selected page
  };

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">LAUNDRY</p>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem isActive={activeItem === "home"}>
          <Link onClick={() => handleNavigation("/", "home")}>Home</Link>
        </NavbarItem>
        <NavbarItem isActive={activeItem === "features"}>
          <Link onClick={() => handleNavigation("/features", "features")}>Features</Link>
        </NavbarItem>
        <NavbarItem isActive={activeItem === "customers"}>
          <Link onClick={() => handleNavigation("/customers", "customers")}>Customers</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link onClick={() => handleNavigation("/login", "login")}>Login</Link> {/* Navigate to login */}
        </NavbarItem>
        <NavbarItem>
        <Link onClick={() => handleNavigation("/signup", "signup")}>SignUp</Link> {/* Navigate to login */}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
