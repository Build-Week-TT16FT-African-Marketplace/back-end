const router = require("express").Router();

const Users = require("./users-model");
const restricted = require("../auth/middleware/restricted-middleware.js");
const verifyUserId = require("../auth/middleware/verifyUserId-middleware.js");

//get all users
router.get("/", restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

//get a user
router.get("/:id", verifyUserId, (req, res) => {
    const id = req.params.id;

    Users.findById(id)
        .then(user => {
            const { username, department } = user;
            res.status(200).json({ username, department });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

//get a users items
router.get("/:id/items", restricted, verifyUserId, (req, res) => {
    const id = req.params.id;

    Users.findById(id)
        .then(user => {
            Users.getItemsByUserId(id)
                .then(items => {
                    res.status(200).json({ ...user, items });
                    console.log(user, items);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

//delete a user by id
router.delete("/:id", restricted, (req, res) => {
    const id = req.params.id;

    Users.deleteUser(id)
        .then(deletedUser => {
            res.status(200).json({ message: "User successfully deleted." });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;