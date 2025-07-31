import { useCallback, useEffect, useState } from "react";
import {
  type CandidateStats,
  getCandidateStats,
} from "../services/candidateService";

interface UseCandidateStatsParams {
  userId?: number;
}

interface UseCandidateStatsReturn {
  stats: CandidateStats | null;
  loading: boolean;
  error: string | null;
  refreshStats: () => Promise<void>;
}

export const useCandidateStats = ({
  userId,
}: UseCandidateStatsParams): UseCandidateStatsReturn => {
  const [stats, setStats] = useState<CandidateStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const candidateStats = await getCandidateStats(userId);
      setStats(candidateStats);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur lors du chargement",
      );
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const refreshStats = useCallback(async () => {
    await fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refreshStats,
  };
};
