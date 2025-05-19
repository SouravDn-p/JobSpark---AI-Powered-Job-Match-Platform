import { useContext } from "react";
import { AuthContexts } from "../providers/AuthProviders";

const useAuth = () => {
  const auth = useContext(AuthContexts);
  return auth;
};

export default useAuth;
