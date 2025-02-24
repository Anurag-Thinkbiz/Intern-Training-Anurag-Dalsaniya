import { useContext } from "react";
import UserContext from "../../context/userContext";
import { userTypeForHook } from "../../data/modal/types/hookTypes/hookType";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const userDetails: userTypeForHook | undefined = useContext<
    userTypeForHook | undefined
  >(UserContext);
  const navigate = useNavigate();
  if (userDetails?.role) {
    navigate("/details");
  }
  return <div>report</div>;
};

export default Report;
