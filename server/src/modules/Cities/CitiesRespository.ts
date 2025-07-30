import databaseClient, { type Rows } from "../../../database/client";

import type { cityType } from "../../../../client/src/types/CitiesType";

class CitiesRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from city");
    return rows as cityType[];
  }
}
export default new CitiesRepository();
