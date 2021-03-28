const Item = require("../models/item");

// Item CRUD - start
exports.createItem = (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    const item = new Item({
        name: req.body.name,
        description: req.body.description,
        imagePath: url + "/images/" + req.file.filename,
        menuId: req.body.menuId,
        creator: req.userData.userId
    });

    item.save()
        .then(createItem => {
            res.status(201).json({
                message: "Item added successfully",
                item: {
                    ...createItem,
                    id: createItem._id
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Creating a item failed!"
            });
        });
}

exports.updateItem = (req,res) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
    }
    const item = new Item({
        _id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        imagePath: url + "/images/" + req.file.filename,
        menuId: req.body.menuId,
        creator: req.userData.userId
    });

    Item.updateOne({ _id: req.params.id, creator: req.userData.userId }, item)
        .then(result => {
            if (result.n > 0) {
                res.status(200).json({ message: "Update successful!" });
            } else {
                res.status(401).json({ message: "Not authorized!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Couldn't udpate item!"
            });
        });
}

exports.getItem = (req,res) => {
    Item.findById(req.params.id)
        .then(item => {
            if (item) {
                res.status(200).json(item);
            } else {
                res.status(404).json({ message: "item not found!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching item failed!"
            });
        });
}

exports.deleteItem = (req,res) => {
    Item.deleteOne({ _id: req.params.id, creator: req.userData.userId })
        .then(result => {
            console.log(result);
            if (result.n > 0) {
                res.status(200).json({ message: "Deletion successful!" });
            } else {
                res.status(401).json({ message: "Not authorized!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Deleting item failed!"
            });
        });
};
// Item CRUD - end
