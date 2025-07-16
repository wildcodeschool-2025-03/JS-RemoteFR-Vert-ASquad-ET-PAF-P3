import type { CreateRoleData, Role, UpdateRoleData } from "../types/Role";

// Configuration de l'API
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

/**
 * Récupère tous les rôles depuis l'API
 */
export async function getAllRoles(): Promise<Role[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/roles`);

    if (!response.ok) {
      throw new Error(`Failed to fetch roles: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
}

/**
 * Récupère un rôle spécifique par son ID
 */
export async function getRoleById(id: number): Promise<Role> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/roles/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch role: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching role:", error);
    throw error;
  }
}

/**
 * Crée un nouveau rôle
 */
export async function createRole(
  roleData: CreateRoleData,
): Promise<{ insertId: number }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/roles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roleData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create role: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating role:", error);
    throw error;
  }
}

/**
 * Met à jour un rôle existant
 */
export async function updateRole(roleData: UpdateRoleData): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/roles/${roleData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ label: roleData.label }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update role: ${response.status}`);
    }
  } catch (error) {
    console.error("Error updating role:", error);
    throw error;
  }
}

/**
 * Supprime un rôle
 */
export async function deleteRole(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/roles/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete role: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting role:", error);
    throw error;
  }
}
