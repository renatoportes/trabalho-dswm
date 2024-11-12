const Router = require("express");
const { getOverview } = require("./controllers/read/get-overview");
const { getSettings } = require("./controllers/read/get-settings");
const { postSales } = require("./controllers/posts/post-sales");
const { putCompanyCnpj } = require("./controllers/put/put-company-cnpj");
const { putCompanyName } = require("./controllers/put/put-company-name");
const { delSales } = require("./controllers/del/del-sales");
const { getSalesById } = require("./controllers/read/get-sales-by-id");

const router = Router();

router.get("/overview", getOverview);
router.get("/settings", getSettings);
router.get("/sales/:id", getSalesById);
router.put("/settings/cnpj", putCompanyCnpj);
router.put("/settings/company-name", putCompanyName);
router.post("/sales", postSales);
router.delete("/sales", delSales);

module.exports = { router };