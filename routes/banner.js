const Banner = require("../models/Banner");
const {
    veirfyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newBanner = new Banner(req.body);
    try {
        const savedBanner = await newBanner.save();
        res.status(200).json(savedBanner);
    } catch (err) {
        res.status(500).json(err);
    }

});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedBanner = await Banner.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
            { new: true }
        );
        res.status(200).json(updatedBanner);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Banner.findByIdAndDelete(req.params.id);
        res.status(200).json("Banner has been deleted!");
    } catch (err) {
        res.status(500).json(err)
    };
});


//GET ALL BANNERS
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.Category;
    try {
        let banner;
        if (qNew) {
            banner = await Banner.find().sort({ createdAt: -1 }).limit(5);
        } else if (qCategory) {
            banner = await Banner.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            banner = await Banner.find();
        }

        res.status(200).json(banner);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router