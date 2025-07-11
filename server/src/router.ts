import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */
import homepageActions from "./modules/homepage/homepageActions";

router.get("/home", homepageActions.browse);
router.get("/home/:id", homepageActions.read);
router.post("/home", homepageActions.add);
router.put("/home/:id", homepageActions.edit);
router.delete("/home/:id", homepageActions.destroy);

/* ************************************************************************* */
import authActions from "./modules/auth/authActions";
import offersActions from "./modules/offers/offersActions";
import userActions from "./modules/user/userActions";

router.get("/offers", offersActions.browse);
router.get("/offers/:id", offersActions.read);
router.post("/offers", offersActions.add);
router.put("/offer/:id", offersActions.edit);
router.delete("/offer/:id", offersActions.destroy);

// router.get("/inscription", userActions.browse);
// router.get("/inscription/:id", userActions.read);
router.post("/inscription", authActions.hashPassword, userActions.add);

router.post("/connexion", authActions.login);

router.get("/connexion", userActions.add);
// router.get("/connexion/:id", userActions.read)
// router.put("/connexion/:id", userActions.edit);
// router.delete("/connexion/:id", userActions.destroy);

export default router;
