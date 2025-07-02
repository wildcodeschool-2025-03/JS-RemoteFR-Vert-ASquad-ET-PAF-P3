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

 async read() {
 

  const [rows] = await databaseClient.query<Rows>(
    `SELECT 
      offer.*, 
      city.id AS city_id,city.name AS city_name, 
      city.departementId, 
      company.id AS company_id,company.name AS company_name,company.siret AS company_siret
    FROM offer
     JOIN city ON offer.city_id = city_id
     JOIN company ON offer.company_id = company_id`,
  );
  return rows as Offer[];
}
async update(offer: Offer) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE offer SET jobTitle = ?, metier = ?, contractType = ?, description = ?, salary = ?, requirements = ?, city_id = ?, company_id = ? where id = ?",
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
    return result.affectedRows;
  }

  // DELETE

  async delete(offerId: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE from offer where id = ?",
      [offerId],
    );
    return result.affectedRows;
  }
};

export default new offersRepository();
