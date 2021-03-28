const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    restuarantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    }

});

module.exports = mongoose.model("Menu", menuSchema);
