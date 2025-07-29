import type { Offer, OfferJoin } from "../../../../client/src/types/OffersType";
import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class offersRepository {
  async create(offer: Omit<Offer, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO offer (jobTitle, metier, contractType, description, salary, requirements, city_id,company_id) values (?,?,?,?,?,?,?,?)",
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
      companies.id AS company_id,companies.name AS company_name,companies.siret AS company_siret
    FROM offer
     INNER JOIN city ON offer.city_id = city_id,
     INNER JOIN companies ON offer.company_id = company_id`,
    );
    return rows as OfferJoin[];
  }

  async findAllOfferById(company_id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM offer WHERE company_id = ?",
      [company_id],
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
        offer.id,
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
}

export default new offersRepository();
