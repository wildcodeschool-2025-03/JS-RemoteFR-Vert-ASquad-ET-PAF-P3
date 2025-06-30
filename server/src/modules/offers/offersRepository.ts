import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Offer = {
  id: number;
  jobTitle: string;
  metier: string;
  contractType: string;
  description: string;
  salary: string;
  requirements: string;
  city_id: number;
  company_id: number;
};

class offersRepository {
  async create(offer: Omit<Offer, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into offer (jobTitle, metier, contractType, description, salary, requirements, city_id,company_id) values (?, ?,?,?,?,?,?,?)",
      [
        offer.jobTitle,
        offer.metier,
        offer.contractType,
        offer.description,
        offer.salary,
        offer.requirements,
        offer.city_id,
        offer.company_id,
      ],
    );
    return result.insertId;
  }
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from offer");
    return rows as Offer[];
  }
  
  async read(id: number) {
    if (!id) {
      console.log("erreur");
    }
    const [rows] = await databaseClient.query<Rows>(
      "select * from offer where id = ?",
      [id],
    );
    return rows[0] as Offer;
  }


}

export default new offersRepository();
