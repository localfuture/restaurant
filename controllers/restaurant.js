const Restaurant = require('../models/restaurant');

// Restaurant CRUD - Start
exports.createRestaurant = (req, res) => {
    const restaurant = new Restaurant({
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        creator: req.userData.userId
    });
    restaurant.save()
        .then(createdRestaurant => {
            res.status(201).json({
                message: "Restaurant added successfully",
                restaurant: {
                    ...createdRestaurant,
                    id: createdRestaurant._id
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Creating a restaurant failed!"
            });
        });
}

exports.updataRestaurant = (req, res) => {
    const restaurant = new Restaurant({
        _id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        creator: req.userData.userId
    });

    Restaurant.updateOne({ _id: req.params.id, creator: req.userData.userId }, restaurant)
        .then(result => {
            if (result.n > 0) {
                res.status(200).json({ message: "Update successful!" });
            } else {
                res.status(401).json({ message: "Not authorized!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Couldn't udpate restaurant!"
            });
        });
}

exports.getRestaurant = (req, res) => {
    Restaurant.findById(req.params.id)
        .then(restaurant => {
            if (restaurant) {
                res.status(200).json(restaurant);
            } else {
                res.status(404).json({ message: "Restaurant not found!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching restaurant failed!"
            });
        });
};

exports.deleteRestaurant = (req, res) => {
    Restaurant.deleteOne({ _id: req.params.id, creator: req.userData.userId })
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
                message: "Deleting restaurant failed!"
            });
        });
};

// Restaurant CRUD - End


//An API to get all restaurants and the associated menus
exports.getAll = (req,res) => {
    Restaurant.aggregate([
        {
            $lookup: {
                from: "menus",
                localField: "_id",
                foreignField: "restuarantId",
                as: "menu"
            }
        },
        {
            $unwind: {
                path: "$menu",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup:{
                from:'items',
                localField:'menu._id',
                foreignField:'menuId',
                as:"menu.items"
            }
        },
        {
            $unwind: {
                path: "$menu.items",
                preserveNullAndEmptyArrays: true
            }
        },
        // {
        //     $group: {
        //         _id: "$_id",
        //         items: {
        //             $push: "$menu.items"
        //         }
        //     }
        // },
        // {
        //     $group: {
        //         _id: "$_id",
        //         menu: {
        //             $push: {item: "$items"}
        //         }
        //     }
        // }
    ])
    .then(restaurant => {
        if (restaurant) {
            res.status(200).json(restaurant);
        } else {
            res.status(404).json({ message: "Restaurant not found!" });
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "Fetching restaurant failed!"
        });
    });
}
