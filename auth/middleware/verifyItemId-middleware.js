const Items = require('../../items/items-model.js')
module.exports = function verifyItemId(req, res, next) {
    const id = req.params.id;

    Items.getItemsById(id)
        .then(item => {
            if (item) {
                req.item = item;
                next();
            } else {
                res.status(404).json({ message: "Item doesn't exist." });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
}