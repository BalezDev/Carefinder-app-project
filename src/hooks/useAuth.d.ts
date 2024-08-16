import { User } from "firebase/auth";

declare module "../../hooks/useAuth" {
  interface UseAuthResult {
    currentUser: User | null;
  }

  function useAuth(): UseAuthResult;

  export default useAuth;
}
