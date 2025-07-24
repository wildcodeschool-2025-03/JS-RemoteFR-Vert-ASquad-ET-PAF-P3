// Types
export interface Role {
  id: number;
  label: string;
  color: string;
}

export type RoleId = number;

export interface CreateRoleData {
  label: string;
  color?: string;
}

export interface UpdateRoleData {
  id: number;
  label: string;
  color: string;
}

export function isValidRoleId(id: number): id is RoleId {
  return typeof id === "number" && id > 0;
}

// Helper function to check if a role exists in a list
export function roleExistsInList(id: number, validRoles: Role[]): boolean {
  return validRoles.some((role) => role.id === id);
}
