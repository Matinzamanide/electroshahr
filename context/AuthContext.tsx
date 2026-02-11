"use client";
import { IChildren } from "@/types/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface IAuthContext {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  name: string;
  setName:Dispatch<SetStateAction<string>>;
  family: string;
  setFamily:Dispatch<SetStateAction<string>>;
  handleLogout:()=>void
}

const AuthContext = createContext({} as IAuthContext);
export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider: React.FC<IChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [family, setFamily] = useState<string>("");

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("isLoggedIn");
    const storedPhoneNumber = localStorage.getItem("phoneNumber");
    const storedName = localStorage.getItem("name");
    const storedFamily = localStorage.getItem("family");
    
    if (storedLoggedIn) {
      setIsLoggedIn(JSON.parse(storedLoggedIn));
    }
    if (storedPhoneNumber) {
      setPhoneNumber(storedPhoneNumber);
    }
    if (storedName) {
      setName(storedName);
    }
    if (storedFamily) {
      setFamily(storedFamily);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("phoneNumber", phoneNumber);
  }, [phoneNumber]);
  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);
  useEffect(() => {
    localStorage.setItem("family", family);
  }, [family]);
  const handleLogout=()=>{
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, phoneNumber, setPhoneNumber,family,setFamily,name,setName,handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
