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
import homepageActions from "./modules/item/homepage/homepageActions";

router.get("/", homepageActions.browse);
router.get("/:id", homepageActions.read);
router.post("/:id", homepageActions.add);
router.put("/:id", homepageActions.edit);
router.delete("/:id", homepageActions.destroy);

export default router;
