import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../redux/store/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export type userTypeForHook = {
  address: string;
  email: string;
  name: string;
  password: string;
  role: "user" | "admin";
};
