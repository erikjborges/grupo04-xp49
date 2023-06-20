const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        desc: { type: String, required: true },
        img: { type: String, required: true },
        idproduto: {type :String},
        

    });

module.exports = mongoose.model("Banner", BannerSchema);