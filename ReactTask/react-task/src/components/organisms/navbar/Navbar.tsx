import React, { useState } from "react";
import { Nav, Logo, Menu, MenuItem, MenuIcon } from "../../styles/navbar/navbar.style";
import { ChangeLanguageMolecules } from "../../molecules/changeLanguageMolecules/ChangeLanguageMolecules";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../atoms/Button/Button";
const Navbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toggleMenu = () => {
    setIsMobile(!isMobile);
  };

  const isLoginPage = location.pathname === "/login";

  return (
    <Nav>
      <Logo onClick={()=>{navigate('/')}}>ReactJS</Logo>
      <MenuIcon onClick={toggleMenu}>{isMobile ? "Close" : "Menu"}</MenuIcon>
      <Menu isMobile={isMobile}>
        <MenuItem>
          <ChangeLanguageMolecules />
        </MenuItem>
        <MenuItem>
            <Button text="register" type="reset" onClick={()=>{navigate('/register')}} />
          </MenuItem>
        {!isLoginPage && (
          <MenuItem>
            <Button text="Login" type="reset" onClick={()=>{navigate('/login')}} />
          </MenuItem>
        )}
      </Menu>
    </Nav>
  );
};

export default Navbar;
