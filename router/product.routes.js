const router = require("express").Router();

const ctrl = require("../controllers/product.controller");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

// user ham ko'radi
router.get("/", auth, role(["user","admin","superadmin"]), ctrl.getAll);
router.get("/:id", auth, role(["user","admin","superadmin"]), ctrl.getOne);

// admin + superadmin
router.post("/", auth, role(["admin","superadmin"]), ctrl.create);
router.put("/:id", auth, role(["admin","superadmin"]), ctrl.update);
router.delete("/:id", auth, role(["admin","superadmin"]), ctrl.remove);

module.exports = router;
