const express = require("express");
const router = express.Router();
const app = express();
const controller = require("../controller/controller");
router.use("/insert", controller.insertBike);
router.use("/getAll", controller.getBikes);
router.use("/changestatus", controller.changeStatus);
router.use("/deletebike", controller.deleteBike);
app.use(function (err, req, res) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
module.exports = router;