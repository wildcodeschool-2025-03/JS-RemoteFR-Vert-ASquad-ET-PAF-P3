import type { CreateRoleData, Role, UpdateRoleData } from "../types/Role";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3310";

export async function getAllRoles(): Promise<Role[]> {
  const response = await fetch(`${API_BASE_URL}/api/roles`);

  if (!response.ok) {
    throw new Error(`Failed to fetch roles: ${response.status}`);
  }

  return await response.json();
}

export async function getRoleById(id: number): Promise<Role> {
  const response = await fetch(`${API_BASE_URL}/api/roles/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch role: ${response.status}`);
  }

  return await response.json();
}

export async function createRole(
  roleData: CreateRoleData,
): Promise<{ insertId: number }> {
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
}

export async function updateRole(roleData: UpdateRoleData): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/roles/${roleData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      label: roleData.label,
      color: roleData.color,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update role: ${response.status}`);
  }
}

export async function deleteRole(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/roles/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete role: ${response.status}`);
  }
}
