//CRUD

import databaseClient, {
  type Result,
  type Rows,
} from "../../../../database/client";

type homes = {
  id: number;
  title: string;
  paragraphe: string;
};

class HomepageRepository {
  async create(homes: Omit<homes, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into home (title, paragraphe) values (? , ?)",
      [homes.title, homes.paragraphe],
    );
    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from home where id = ?",
      [id],
    );
    return rows[0] as homes;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from home");
    return rows as homes[];
  }

  // UPDATE

  async update(home: homes) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE home SET title = ? , paragraphe = ? where id = ?",
      [home.title, home.paragraphe, home.id],
    );
    return result.affectedRows;
  }

  // DELETE

  async delete(homeid: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE from home where id = ?",
      [homeid],
    );
    return result.affectedRows;
  }
}
export default new HomepageRepository();
