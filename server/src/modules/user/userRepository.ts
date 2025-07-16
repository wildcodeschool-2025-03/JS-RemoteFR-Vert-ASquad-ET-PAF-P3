import databaseClient, {
  type Result,
  type Rows,
} from "../../../database/client";

type Users = {
  id: number;
  email: string;
  hashed_password: string;
  firstname: string;
  lastname: string;
  address: string;
  number: string;
  picture_src: string;
  picture_alt: string;
  document: string;
  role_id: number;
};

class UserRepository {
  async create(users: Omit<Users, "id">) {
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
    return rows[0] as Users | undefined;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM users");

    return rows as Users[];
  }

  async readByEmailWithPassword(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id,email,hashed_password FROM users WHERE email = ? ",
      [email],
    );
    return rows[0] as Users;
  }

  async update(user: Users) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE users SET  email = ?, hashed_password = ?, firstname = ?, lastname = ?, address = ?, number = ?, picture_src = ?, picture_alt = ?, document = ?, role_id = ? WHERE id = ?",
      [
        user.email,
        user.hashed_password,
        user.firstname,
        user.lastname,
        user.address,
        user.number,
        user.document,
        user.picture_src,
        user.picture_alt,
        user.role_id,
      ],
    );
    return result.affectedRows;
  }

  async delete(usersId: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM users WHERE id = ?",
      [usersId],
    );
    return result.affectedRows;
  }
}

export default new UserRepository();
