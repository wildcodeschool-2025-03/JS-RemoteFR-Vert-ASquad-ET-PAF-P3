import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Role = {
  id: number;
  label: string;
};

class RoleRepository {
  async create(role: Omit<Role, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into role (label) values (?)",
      [role.label],
    );
    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from role where id = ?",
      [id],
    );
    return rows[0] as Role;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from role");
    return rows as Role[];
  }

  async readByLabel(label: string) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from role where label = ?",
      [label],
    );
    return rows[0] as Role;
  }

  async update(role: Role) {
    const [result] = await databaseClient.query<Result>(
      "update role set label = ? where id = ?",
      [role.label, role.id],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from role where id = ?",
      [id],
    );
    return result.affectedRows;
  }
}
export default new RoleRepository();
