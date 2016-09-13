//
// Route Directory
//
var router = require("express").Router();

router.use("/contacts", require("./controllers/contact-controller"));

module.exports = router;
