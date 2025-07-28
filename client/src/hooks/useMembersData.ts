import { useEffect, useState } from "react";
import type { Member } from "../types/Member";
import type { Role } from "../types/Role";

interface UseMembersDataReturn {
  members: Member[];
  loading: boolean;
  error: string | null;
  updateMemberRole: (memberId: number, roleId: number) => Promise<void>;
  refreshMembers: () => Promise<void>;
}

export const useMembersData = (roles?: Role[]): UseMembersDataReturn => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updateMemberRole = async (memberId: number, roleId: number) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/${memberId}/role`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roleId }),
      },
    );

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }

    // Update local state
    const updatedRole = roles?.find((role) => role.id === roleId);
    if (updatedRole) {
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === memberId
            ? { ...member, role_label: updatedRole.label }
            : member,
        ),
      );
    }
  };

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/members`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setMembers(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur lors du chargement",
      );
    } finally {
      setLoading(false);
    }
  };

  const refreshMembers = async () => {
    await fetchMembers();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/members`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setMembers(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erreur lors du chargement",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    members,
    loading,
    error,
    updateMemberRole,
    refreshMembers,
  };
};
