import React, { useState, useEffect } from "react";
import { Nav, Logo, Menu, MenuItem } from "../../styles/navbar/navbar.style";
import { ChangeLanguageMolecules } from "../../molecules/changeLanguageMolecules/ChangeLanguageMolecules";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../atoms/Button/Button";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../data/modal/types/hookTypes/hookType";
import { RootState } from "../../../redux/store/store";
import { ProfileIcon, LogoutOption } from "../../styles/navbar/navbar.style";
import { logOut } from "../../../redux/slices/auth.slice";
import { accessTokenType } from "../../../data/modal/types/reduxTypes/reduxType";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const getAccessToken: accessTokenType | string | null = useAppSelector(
    (state: RootState) => state.auth.token
  );

  const dispatch = useAppDispatch();
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage=location.pathname==='/register';

  let accessToken: string | null = null;
  if (getAccessToken) {
    if (typeof getAccessToken === "string") {
      accessToken = getAccessToken;
    } else {
      accessToken = getAccessToken.accessToken;
    }
  }

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken]);

  const { t } = useTranslation();
  const handleIconMouseEnter = () => {
    setShowLogout(true);
  };

  const handleMouseLeave = () => {
    setShowLogout(false);
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <Nav>
      <Logo
        onClick={() => {
          navigate("/");
        }}
      >
        ReactJS
      </Logo>
      <Menu>
        <MenuItem>
          <ChangeLanguageMolecules />
        </MenuItem>
        {accessToken ? (
          <>
            <MenuItem>
              <ProfileIcon
                onMouseEnter={handleIconMouseEnter}
              />
              {showLogout && (
                <>
                  <LogoutOption
                    onMouseLeave={handleMouseLeave}
                    onClick={handleLogout}
                  >
                    {t("logout")}
                  </LogoutOption>
                </>
              )}
            </MenuItem>
          </>
        ) : (
          <>
            {!isRegisterPage&&<MenuItem>
              <Button
                text={t('register')}
                type="reset"
                onClick={() => {
                  navigate("/register");
                }}
              />
            </MenuItem>}
            {!isLoginPage && (
              <MenuItem>
                <Button
                  text={t('login')}
                  type="reset"
                  onClick={() => {
                    navigate("/login");
                  }}
                />
              </MenuItem>
            )}
          </>
        )}
      </Menu>
    </Nav>
  );
};

export default Navbar;
