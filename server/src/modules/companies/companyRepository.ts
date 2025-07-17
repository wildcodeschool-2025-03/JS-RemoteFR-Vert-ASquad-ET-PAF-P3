import databaseClient, { type Result } from "../../../database/client";
import type companyType from "../../types/CompaniesType";

class CompanyRepository {
  async create(company: Omit<companyType, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO companies(name,siret,users_id) VALUES (?,?,?)",
      [company.name, company.siret, company.users_id],
    );
    return result.insertId;
  }
}
export default new CompanyRepository();
