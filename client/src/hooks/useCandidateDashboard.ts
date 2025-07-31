import { useAuth } from "../context/AuthContext";
import { useCandidateStats } from "./useCandidateStats";

interface UseCandidateDashboardReturn {
  // User data
  user: ReturnType<typeof useAuth>["user"];
  isAuthenticated: boolean;

  // Stats
  stats: ReturnType<typeof useCandidateStats>["stats"];
  loading: boolean;
  error: string | null;
  refreshStats: () => Promise<void>;
}

export const useCandidateDashboard = (): UseCandidateDashboardReturn => {
  const auth = useAuth();

  const { stats, loading, error, refreshStats } = useCandidateStats({
    userId: auth?.user?.id,
  });

  return {
    // User data
    user: auth?.user || null,
    isAuthenticated: !!auth?.user,

    // Stats
    stats,
    loading,
    error,
    refreshStats,
  };
};
