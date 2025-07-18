import express from "express";

const router = express.Router();

import validateCompany from "../src/Validation/companyValidation";
import companyActions from "../src/modules/companies/companyActions";
import hashPassword from "./Utils/hashedPassword";
import { verifyCompanyRole } from "./middlewares/RequireRole";
import authActions from "./middlewares/auth/authActions";
import { verifyCookie } from "./middlewares/cookies/VerifyCookie";
import { verifyUniqueCompany } from "./modules/companies/UniqueCompany";
import itemActions from "./modules/item/itemActions";
import userActions from "./modules/user/userActions";

import { validateUser } from "./Validation/userValidation";
import homepageActions from "./modules/homepage/homepageActions";
import offersActions from "./modules/offers/offersActions";

/* ************************************************************************* */

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.get("/home", homepageActions.browse);
router.get("/home/:id", homepageActions.read);
router.post("/home", homepageActions.add);
router.put("/home/:id", homepageActions.edit);
router.delete("/home/:id", homepageActions.destroy);

router.get("/offers", offersActions.browse);
router.get("/offers/:id", offersActions.read);
router.post("/offers", offersActions.add);
router.put("/offer/:id", offersActions.edit);
router.delete("/offer/:id", offersActions.destroy);
router.post("/signup", validateUser, hashPassword, userActions.add);

router.post("/login", authActions.login, verifyCookie);

router.get("/companies", companyActions.browse);
router.get("/companies", companyActions.read);
router.post(
  "/login/companies",
  verifyCookie,
  verifyCompanyRole,
  validateCompany,
  verifyUniqueCompany,
  companyActions.add,
);

export default router;
