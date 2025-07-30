import { useAuth } from "../context/AuthContext";

interface UseCandidateDashboardReturn {
  // User data
  user: ReturnType<typeof useAuth>["user"];
  isAuthenticated: boolean;
}

export const useCandidateDashboard = (): UseCandidateDashboardReturn => {
  const auth = useAuth();

  return {
    // User data
    user: auth?.user || null,
    isAuthenticated: !!auth?.user,
  };
};
