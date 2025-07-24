import AbstractSeeder from "./AbstractSeeder";

class RoleSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "role", truncate: true });
  }

  run() {
    const roles = [
      { label: "candidate", refName: "role_candidate" },
      { label: "company", refName: "role_company" },
      { label: "admin", refName: "role_admin" },
    ];

    for (const role of roles) {
      this.insert(role);
    }
  }
}

export default RoleSeeder;
