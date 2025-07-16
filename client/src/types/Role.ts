// Types
export interface Role {
  id: number;
  label: string;
}

export type RoleLabel = "candidate" | "company" | "admin";

export interface CreateRoleData {
  label: string;
}

export interface UpdateRoleData {
  id: number;
  label: string;
}

export function isValidRoleLabel(label: string): label is RoleLabel {
  return ["candidate", "company", "admin"].includes(label);
}

export function roleToLabel(role: Role): RoleLabel {
  if (isValidRoleLabel(role.label)) {
    return role.label;
  }
  throw new Error(`Invalid role label: ${role.label}`);
}
