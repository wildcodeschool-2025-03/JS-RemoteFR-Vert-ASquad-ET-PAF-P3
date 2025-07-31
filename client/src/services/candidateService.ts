const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3310";

export interface CandidateStats {
  applied: number;
  interview: number;
}

export async function getCandidateStats(
  userId: number,
): Promise<CandidateStats> {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}/stats`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Erreur lors de la récupération des statistiques: ${response.status}`,
    );
  }

  return response.json();
}
