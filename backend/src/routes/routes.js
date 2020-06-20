const {verifySignUp, authJwt} = require("../middlewares/");
const controller = require("../controllers/AuthController");

const express = require('express');
const DreamsController = require("../controllers/DreamsController");
const ProfilesController = require("../controllers/ProfilesController");

const router = express.Router();

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});


//register
router.post("/signup", [verifySignUp.checkDuplicateUsernameOrEmail], controller.signup);

//log in
router.post("/signin", controller.signin);

//store a dream
router.post("/:profile/create", DreamsController.create);

//read whitelist
router.get("/whitelist/profiles", authJwt.verifyToken, ProfilesController.whitelist);

//add dream to whitelist
router.post("/whitelist/dream/add", authJwt.verifyToken, DreamsController.addD_to_whitelist);

//add profile to whitelist
router.post("/whitelist/profile/add", authJwt.verifyToken, ProfilesController.addP_to_whitelist);

//get public dreams 
router.get("/dreams", authJwt.verifyToken, DreamsController.read_public);

//get whitelisted dreams
router.get("/whitelist/dreams", authJwt.verifyToken, DreamsController.read_whitelisted);

//get own dreams
router.get("/profile/dreams", authJwt.verifyToken, DreamsController.read_private);

//delete own dream
router.get("/profile/delete/", authJwt.verifyToken, DreamsController.delete);


module.exports = router;