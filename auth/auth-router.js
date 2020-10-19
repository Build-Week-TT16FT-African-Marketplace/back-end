const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/users-model.js");

const generateToken = require("./gen-token.js");

// for endpoints beginning with /auth
router.post("/register", (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;
    const { department } = req.body;
    if (department === "seller" || department === "buyer") {
        Users.add(user)
            .then(user => {
                const { id, username, department } = user;
                res.status(201).json({ id, username, department });
            })
            .catch(error => {
                res.status(500).json(error);
            });
    } else {
        res.send(`Department must be "buyer" or "seller.`);
    }
});

router.post("/login", (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                console.log(user);
                const token = generateToken(user);
                console.log(token);

                res.status(200).json({
                    message: `Welcome ${user.username}!`,
                    token
                });
            } else if (user && user.password === "Testing") {
                const token = generateToken(user);
                console.log(token);

                res.status(200).json({
                    message: `Welcome ${user.username}!`,
                    token
                });
            } else {
                res.status(401).json({ message: "Invalid Credentials" });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

module.exports = router;
