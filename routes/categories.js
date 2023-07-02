const Categories = require("../models/Categories");

const {
    veirfyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newCategories = new Categories(req.body);
    try {
        const savedCategories = await newCategories.save();
        res.status(200).json(savedCategories);
    } catch (err) {
        res.status(500).json(err);
    }

});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedCategories = await Categories.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
            { new: true }
        );
        res.status(200).json(updatedCategories);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Categories.findByIdAndDelete(req.params.id);
        res.status(200).json("Category has been deleted!");
    } catch (err) {
        res.status(500).json(err)
    };
});

//GET PRODUCT
router.get("/:id", async (req, res) => {
    try {
        const categories = await Categories.findById(req.params.id);
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json(err);
    }
});


//GET ALL CATEGORIES
router.get("/", async (req, res) => {
    const {page = 1, limit = 5} = req.query;
    const qCategory = req.query.Category;
     //CONTAR A QUANTIDADE DE REGISTROS NO BANCO DE DADOS
     let countItem;
     if(qCategory){
         countItem = await Product.count({
             categories: qCategory
         });
     }else{
         countItem = await Categories.count({
         
         });
     }
 //CALCULA A ÚLTIMA PÁGINA
 const lastPage = Math.ceil(countItem / limit);
 //CALCULAR A PARTIR DE QUAL REGISTRO DEVE RETORNAR O LIMITE DE REGISTROS
const offset = Number((page * limit) - limit);

    try {
        let categories;
        if (qCategory) {
            categories = await Categories.find({
                categories: {
                    $in: [qCategory],
                },                
            }).sort({ _id: -1 }).limit(limit).skip(offset);
        } else {
            categories = await Categories.find().sort({ _id: -1 }).limit(limit).skip(offset);
        
        };
      
        res.status(200).json({totalPages: lastPage, currentPage: page, totalItems: countItem, categories});
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router