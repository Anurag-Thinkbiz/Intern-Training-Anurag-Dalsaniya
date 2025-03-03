import { AxiosResponse } from "axios";
import { URLConstant } from "../utils/Constants/URLConstant";
import { API } from "../services/service";
import { toast } from "react-toastify";
import { userTypeForHook } from "../data/modal/types/hookTypes/hookType";


function useGetDetails() {

  const getDetails = async (): Promise<userTypeForHook | undefined> => {
    try {
      const response: AxiosResponse<userTypeForHook> = await API.get(`/${URLConstant.DETAILS}`);
      if (response.data) {
        return response.data; 
      } else {
        toast.error("Failed to fetch data. Please try again.");
      }
    } catch (err:any ) {
      toast.error(err.response?.data.message);
    }
  };

  return { getDetails };
}

export default useGetDetails;
