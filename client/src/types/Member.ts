export interface Member extends Record<string, unknown> {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  created_at: string;
  role_label: string;
  company_name: string;
  company_siret: string;
}
