const Order = require("../models/Order");
const {
    veirfyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyToken,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }

});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted!");
    } catch (err) {
        res.status(500).json(err)
    };
});

//GET USER ORDERS
router.get("/user/:id", verifyTokenAndAuthorization, async (req, res) => {
    //PAGINAÇÃO
const {page = 1, limit = 5} = req.query;


//CONTAR A QUANTIDADE DE REGISTROS NO BANCO DE DADOS
const countItem = await Order.count({
    userId: req.params.id,
});

const lastPage = Math.ceil(countItem / limit);


//CALCULAR A PARTIR DE QUAL REGISTRO DEVE RETORNAR O LIMITE DE REGISTROS
const offset = Number((page * limit) - limit);
    try {
        const orders = await Order.find({
            userId: req.params.id,
        }).sort({ _id: -1 }).limit(limit).skip(offset);
        res.status(200).json({totalPages: lastPage, currentPage: page, totalItems: countItem, orders});
    } catch (err) {
        res.status(500).json(err);
    }
});

// //GET ALL ORDER
router.get("/", verifyTokenAndAdmin, async (req,res)=>{
//PAGINAÇÃO
const {page = 1, limit = 5} = req.query;


//CONTAR A QUANTIDADE DE REGISTROS NO BANCO DE DADOS
const countItem = await Order.count();

//CALCULA A ÚLTIMA PÁGINA
const lastPage = Math.ceil(countItem / limit);

//CALCULAR A PARTIR DE QUAL REGISTRO DEVE RETORNAR O LIMITE DE REGISTROS
const offset = Number((page * limit) - limit);

    try{
        const orders = await Order.find().sort({ _id: -1 }).limit(limit).skip(offset);
res.status(200).json({totalPages: lastPage, currentPage: page, totalItems: countItem, orders});
    }catch(err){
        res.status(500).json(err);
    }
});

//GET ORDER
router.get("/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;