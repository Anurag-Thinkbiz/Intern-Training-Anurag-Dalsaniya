import { AxiosResponse } from "axios";
import { userTypeForHook } from "../data/modal/types/hookTypes/hookType";
import { URLConstant } from "../utils/Constants/URLConstant";
import { API } from "../services/service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface ApiResponse<T> {
  content?: T;
}

function useRegister<T>() {
  const navigate=useNavigate();
  const registerUser = (userData: userTypeForHook) => { 
    API.post<ApiResponse<T>>(`/${URLConstant.REGISTER}`, userData)
      .then((res: AxiosResponse<ApiResponse<T>>) => {
        if (res.data) {
          toast.success("Successfully registered!");
          navigate('/login');
        } else {
          toast.error("Failed to register. Please try again.");
        }
      })
      .catch((err: Error) => {
        toast.error(`Error: ${err.message}`);
      });
  };

  return { registerUser };
}

export default useRegister;

