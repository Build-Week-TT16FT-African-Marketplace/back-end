const router = require("express").Router();

const Items = require("./items-model.js");
const restricted = require("../auth/middleware/restricted-middleware.js");
const validateItemsContent = require("../auth/middleware/validateItemsContent-middleware");
const verifyItemId = require("../auth/middleware/verifyItemId-middleware.js");

//add Item
router.post("/additem", restricted, validateItemsContent, (req, res) => {
    const id = req.jwtToken.subject
    Items.addItem(req.body, id)
        .then(item => {
            res.status(201).json(item);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

//Get Items
router.get("/", restricted, (req, res) => {
    Items.getItems()
        .then(items => {
            res.status(200).json(items);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

//Get Users Items
router.get("/:id", verifyItemId, (req, res) => {
    const id = req.params.id;

    Items.getItemsById(id)
        .then(item => {
            res.status(200).json(item);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

//update Users Item
router.put("/:id", restricted, verifyItemId, validateItemsContent, (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    Items.updateItem(id, changes)
        .then(updatedItem => {
            res.status(201).json(updatedItem);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

//delete users Item
router.delete("/:id", restricted, verifyItemId, (req, res) => {
    const id = req.params.id;

    Items.deleteItem(id)
        .then(deletedItem => {
            res.status(200).json({ message: "Item successfully deleted." });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

//get items by category
router.get("/category/:category", (req, res) => {
    const category = req.params.category;

    Items.getItemsByCategory(category)
        .then(item => {
            res.status(200).json(item);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;