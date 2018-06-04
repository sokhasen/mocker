const router = require("express").Router();
const method = require("../controllers/method");
module.exports = router;


router.get("/methods/resources/:resource_id", method.getAllMethods);
router.post("/methods", method.createNewMethod);
router.get("/methods/:id", method.getOneMethod);
router.put("/methods/:id", method.updateMethod);
router.delete("/methods/:id", method.destroyMethod);
