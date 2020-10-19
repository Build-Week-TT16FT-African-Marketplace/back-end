const Users = require('../../users/users-model.js')

function verifyUserId(req, res, next) {
    const id = req.params.id;

    Users.findById(id)
        .then(item => {
            if (item) {
                req.item = item;
                next();
            } else {
                res.status(404).json({ message: "User Not Found." });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

module.exports = verifyUserId;
