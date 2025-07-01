import databaseClient, {
  type Result,
  type Rows,
} from "../../../../database/client";

type about = {
  id: number;
  title: string;
  paragraph: string;
};

class AboutRepository {
  async create(about: Omit<about, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into about (title, paragraph) values (? , ?)",
      [about.title, about.paragraph],
    );
    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from about where id = ?",
      [id],
    );
    return rows[0] as about;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from about");
    return rows as about[];
  }

  async update(about: about) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE about SET title = ? , paragraph = ? where id = ?",
      [about.title, about.paragraph, about.id],
    );
    return result.affectedRows;
  }

  async delete(aboutid: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE from about where id = ?",
      [aboutid],
    );
    return result.affectedRows;
  }
}

export default new AboutRepository();
