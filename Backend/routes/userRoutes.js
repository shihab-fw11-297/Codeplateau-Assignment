const router = require("express").Router()
const {
    userRegister,
    userLogin
} = require("../controller/Auth");

// Users Registeration Route
router.post("/register-user", async (req, res) => {
    await userRegister(req.body, "user", res);
});

// Users Login Route
router.post("/login-user", async (req, res) => {
    await userLogin(req.body, "user", res);
});


module.exports = router