const Product = require("../models/Product");


const {
    veirfyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }

});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted!");
    } catch (err) {
        res.status(500).json(err)
    };
});

//GET PRODUCT
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
    const {page = 1, limit = 5} = req.query;
    const qCategory = req.query.category;
    //CONTAR A QUANTIDADE DE REGISTROS NO BANCO DE DADOS
    let countItem;
    if(qCategory){
        countItem = await Product.count({
            categories: {$elemMatch: {_id: qCategory} },
        }
        );
    }else{
        countItem = await Product.count({
        
        });
    }
//CALCULA A ÚLTIMA PÁGINA
const lastPage = Math.ceil(countItem / limit);


//CALCULAR A PARTIR DE QUAL REGISTRO DEVE RETORNAR O LIMITE DE REGISTROS
const offset = Number((page * limit) - limit);
 
    try {
        let products;
        if (qCategory) {
            products = await Product.find({
                categories: {
                    $elemMatch: {_id: qCategory},
                },
            }).sort({ _id: -1 }).limit(limit).skip(offset);

        } else {
           products = await Product.find().sort({ _id: -1 }).limit(limit).skip(offset);
           
        };

        res.status(200).json({totalPages: lastPage, currentPage: page, totalItems: countItem, products});
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router