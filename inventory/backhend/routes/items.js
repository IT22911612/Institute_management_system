const router = require("express").Router();
const InventoryItem = require("../models/item.js");

router.route("/add").post((req, res) => {
    const { itemName, category, quantity, price } = req.body;

    const newInventoryItem = new InventoryItem({
        itemName,
        category,
        quantity,
        price
    });

    newInventoryItem.save()
        .then((item) => {
            res.json(item); // Return the added item
        })
        .catch((err) => {
            console.error("Error adding item:", err);
            res.status(500).json({ error: "Failed to add item" });
        });
});

router.route("/").get((req, res) => {
    InventoryItem.find()
        .then((inventoryItems) => {
            res.json(inventoryItems);
        })
        .catch((err) => {
            console.error("Error fetching items:", err);
            res.status(500).json({ error: "Failed to fetch items" });
        });
});

router.route("/update/:id").put((req, res) => {
    const { itemName, category, quantity, price } = req.body;
    const itemId = req.params.id;

    InventoryItem.findByIdAndUpdate(itemId, { itemName, category, quantity, price }, { new: true })
        .then((updatedItem) => {
            if (!updatedItem) {
                return res.status(404).json({ error: "Item not found" });
            }
            res.json(updatedItem);
        })
        .catch((err) => {
            console.error("Error updating item:", err);
            res.status(500).json({ error: "Failed to update item" });
        });
});

router.route("/delete/:id").delete((req, res) => {
    const itemId = req.params.id;

    InventoryItem.findByIdAndDelete(itemId)
        .then((deletedItem) => {
            if (!deletedItem) {
                return res.status(404).json({ error: "Item not found" });
            }
            res.json({ message: "Inventory Item Deleted", deletedItem });
        })
        .catch((err) => {
            console.error("Error deleting item:", err);
            res.status(500).json({ error: "Failed to delete item" });
        });
});

router.route("/get/:id").get((req, res) => {
    const itemId = req.params.id;

    InventoryItem.findById(itemId)
        .then((inventoryItem) => {
            if (!inventoryItem) {
                return res.status(404).json({ error: "Item not found" });
            }
            res.json(inventoryItem);
        })
        .catch((err) => {
            console.error("Error fetching item:", err);
            res.status(500).json({ error: "Failed to fetch item" });
        });
});

module.exports = router;
