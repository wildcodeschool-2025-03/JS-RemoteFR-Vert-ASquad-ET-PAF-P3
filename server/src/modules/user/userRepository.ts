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
}

export default new UserRepository();
