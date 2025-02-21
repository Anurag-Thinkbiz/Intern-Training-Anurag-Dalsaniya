import { AxiosResponse } from "axios";
import { URLConstant } from "../utils/Constants/URLConstant";
import { API } from "../services/service";
import { toast } from "react-toastify";
import { loginDataType } from "../data/modal/types/formType/formType";
import { useAppDispatch } from "../data/modal/types/hookTypes/hookType";
import { logIn } from "../redux/slices/auth.slice";
import { useNavigate } from "react-router-dom";

function useAuth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authUser = (userLoginData: loginDataType) => {
    API.post(`/${URLConstant.LOGIN}`, userLoginData)
      .then((res: AxiosResponse< string >) => {
        if (res.data ) {
          const accessToken = res.data;
          
          dispatch(logIn( accessToken ));

          toast.success("Successfully logged in!");
          navigate("/details");  
        } else {
          toast.error("Failed to login. Please try again.");
        }
      })
      .catch((err: Error) => {
        toast.error(`Error: ${err.message}`);
      });
  };

  return { authUser };
}

export default useAuth;
