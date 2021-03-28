const Menu = require('../models/menu');

// Menu CRUD - Start
exports.createMenu = (req, res) => {
    const menu = new Menu({
        name: req.body.name,
        description: req.body.description,
        restuarantId: req.body.restaurant,
        creator: req.userData.userId
    });

    menu.save()
        .then(createdMenu => {
            res.status(201).json({
                message: "Menu added successfully",
                menu: {
                    ...createdMenu,
                    id: createdMenu._id
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Creating a menu failed!"
            });
        });
}

exports.updataMenu = (req, res) => {
    const menu = new Menu({
        _id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        restuarantId: req.body.restuarant,
        creator: req.userData.userId
    });

    Menu.updateOne({ _id: req.params.id, creator: req.userData.userId }, menu)
        .then(result => {
            if (result.n > 0) {
                res.status(200).json({ message: "Update successful!" });
            } else {
                res.status(401).json({ message: "Not authorized!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Couldn't udpate menu!"
            });
        });
}

exports.getMenu = (req, res) => {
    Menu.findById(req.params.id)
        .then(menu => {
            if (menu) {
                res.status(200).json(menu);
            } else {
                res.status(404).json({ message: "Menu not found!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching menu failed!"
            });
        });
};

exports.deleteMenu = (req, res) => {
    Menu.deleteOne({ _id: req.params.id, creator: req.userData.userId })
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
                message: "Deleting menu failed!"
            });
        });
};

// Menu CRUD - End


