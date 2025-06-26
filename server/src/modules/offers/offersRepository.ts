import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Offer = {
  id: number;
  job_title: string;
  metier: string;
  contract_type: string;
  description: string;
  salary: string;
  requierements: string;
  city_id: number;
  company_id: number;
};

class offersRepository {
  async create(offer: Omit<Offer, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into offer (job_title, metier, contract_type, description, salary, requierements, city_id,company_id) values (?, ?)",
      [
        offer.contract_type,
        offer.description,
        offer.salary,
        offer.requierements,
        offer.city_id,
        offer.company_id,
      ],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from offer where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Offer;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select * from offer");

    // Return the array of items
    return rows as Offer[];
  }
}

export default new offersRepository();
