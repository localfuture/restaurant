const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    menuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        required: true
    }

});

module.exports = mongoose.model("Item", itemSchema);
