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

import { verifyToken } from "../src/middlewares/cookies/VerifyToken";
/* ************************************************************************* */
import { verifyAdminRole } from "./middlewares/auth/verifyAdminRole";
import CitiesActions from "./modules/Cities/CitiesActions";
import roleActions from "./modules/role/roleActions";

router.get("/offers", offersActions.browse);
router.get("/offers/:id", offersActions.read);
router.post("/offers", offersActions.add);
router.put("/offers/:id", offersActions.edit);
router.delete("/offers/:id", offersActions.destroy);
router.get("/offers/:id", offersActions.readOfferById);

/* ************************************************************************* */

router.get("/api/roles", roleActions.browse);
router.get("/api/roles/:id", roleActions.read);
router.post("/api/roles", roleActions.add);
router.put("/api/roles/:id", roleActions.edit);
router.delete("/api/roles/:id", roleActions.destroy);

/* ************************************************************************* */
router.post("/signup", validateUser, hashPassword, userActions.add);
router.post("/login", authActions.login);

/* ************************************************************************* */
router.get("/api/users", userActions.browse);
router.get("/api/users", userActions.readAllmembers);
router.get("/users/:id", userActions.read);

router.get("/cities", CitiesActions.browse);
router.get("/companies", companyActions.browse);

router.get(
  "/api/users/members",
  verifyToken,
  verifyAdminRole,
  userActions.browseMembers,
);

router.post(
  "/login/companies",
  verifyCookie,
  verifyCompanyRole,
  validateCompany,
  verifyUniqueCompany,
  companyActions.add,
);
// router.get("/api/users/:id/stats", verifyToken, userActions.getCandidateStats);
export default router;
