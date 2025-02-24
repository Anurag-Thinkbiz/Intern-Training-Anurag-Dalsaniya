import  { useContext } from "react";
import UserContext from "../../context/userContext";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { Container, Greeting, Heading, NewGreeting, Span } from "../styles/userDetail/UserDetail.style";



const UserDetail = () => {
  const user = useContext(UserContext);
  const { t } = useTranslation();
  return (
    <>
    <Outlet></Outlet>
    <Container>
      {user ? (
        <>
          <Heading>
            {t("hello")} <Span>{user.name}</Span>
          </Heading>
          <Heading>
            {t("email")} <Span>{user.email}</Span>
          </Heading>
          <Heading>
            {t("role")} <Span>{user.role}</Span>
          </Heading>
        </>
      ) : (
        <>
          <Greeting>{t("greeting")}</Greeting>
          <NewGreeting>{t("newGreeting")}</NewGreeting>
        </>
      )}
    </Container>
    </>
  );
};
export default UserDetail;
