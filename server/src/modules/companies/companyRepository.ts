import databaseClient, {
  type Rows,
  type Result,
} from "../../../database/client";
import type companyType from "../../types/CompaniesType";

class CompanyRepository {
  async create(company: Omit<companyType, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO companies(name,siret,users_id) VALUES (?,?,?)",
      [company.name, company.siret, company.users_id],
    );
    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM companies WHERE id = ? ",
      [id],
    );
    return rows[0] as companyType | undefined;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM companies");

    return rows as companyType[];
  }
  async findbySiret(siret: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id,name FROM companies WHERE siret = ? ",
      [siret],
    );
    return rows[0] as companyType;
  }
}
export default new CompanyRepository();
