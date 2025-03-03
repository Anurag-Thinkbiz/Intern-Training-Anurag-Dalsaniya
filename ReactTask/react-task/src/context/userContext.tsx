import React, { createContext, useState, useEffect, ReactNode } from "react";
import { userTypeForHook } from "../data/modal/types/hookTypes/hookType";
import useGetDetails from "../hooks/useDetails";

const UserContext = createContext<userTypeForHook | undefined>(undefined);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<userTypeForHook>({
    address: "",
    email: "",
    name: "",
    password: "",
    role: "",
  });

  const { getDetails } = useGetDetails<userTypeForHook>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response: userTypeForHook | undefined = await getDetails();
        if (response) {
          setUser(response);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export default UserContext;
