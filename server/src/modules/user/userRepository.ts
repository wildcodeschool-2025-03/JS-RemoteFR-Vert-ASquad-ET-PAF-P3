import databaseClient, {
  type Result,
  type Rows,
} from "../../../database/client";

import type UsersType from "../../types/UserType";

class UserRepository {
  async create(users: Omit<UsersType, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO users (email,hashed_password, firstname, lastname,address, number, picture_src, picture_alt,document,role_id) values (?,?,?,?,?,?,?,?,?,?)",
      [
        users.email,
        users.hashed_password,
        users.firstname,
        users.lastname,
        users.address,
        users.number,
        users.picture_src,
        users.picture_alt,
        users.document,
        users.role_id,
      ],
    );
    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM users WHERE id = ? ",
      [id],
    );
    return rows[0] as UsersType | undefined;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM users");

    return rows as UsersType[];
  }

  async readByEmailWithPassword(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id,email,hashed_password FROM users WHERE email = ? ",
      [email],
    );
    return rows[0] as UsersType;
  }

  async readAllWithCompanyAndRole() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        users.id,
        users.firstname,
        users.lastname,
        users.email,
        role.id AS role_id,
        role.label AS role_label,
        role.color AS role_color,
        company.id AS company_id,
        company.name AS company_name,
        company.SIRET AS company_siret
      FROM users
      LEFT JOIN role ON users.role_id = role.id
      LEFT JOIN company ON company.users_id = users.id
      ORDER BY users.lastname, users.firstname`,
    );
    return rows as Array<{
      id: number;
      firstname: string;
      lastname: string;
      email: string;
      role_id: number | null;
      role_label: string | null;
      role_color: string | null;
      company_id: number | null;
      company_name: string | null;
      company_siret: string | null;
    }>;
  }
}

export default new UserRepository();
