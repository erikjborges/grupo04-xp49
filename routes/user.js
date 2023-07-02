const User = require("../models/User");
const { veirfyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("./verifyToken");
const CryptoJS = require("crypto-js");
const router = require("express").Router();

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted!");
    } catch (err) {
        res.status(500).json(err)
    };
});

//GET USER
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL USER
router.get("/", verifyTokenAndAdmin, async (req, res) => {

    //PAGINAÇÃO
    const {page = 1, limit = 5} = req.query;


//CONTAR A QUANTIDADE DE REGISTROS NO BANCO DE DADOS
const countItem = await User.count();


//CALCULA A ÚLTIMA PÁGINA
const lastPage = Math.ceil(countItem / limit);

//CALCULAR A PARTIR DE QUAL REGISTRO DEVE RETORNAR O LIMITE DE REGISTROS
const offset = Number((page * limit) - limit);
    

    try {
       
        const users = await User.find().sort({ _id: -1 }).limit(limit).skip(offset);
    
        res.status(200).json({totalPages: lastPage, currentPage: page, totalItems: countItem, users});
    } catch (err) {
        res.status(500).json(err);
    }
});

// //GET USER STATS

// router.get("/stats", verifyTokenAndAdmin, async (req,res)=>{
//     const date = Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear() -1));

//     try{

//         const data = await User.aggregate([
//             { $match: { createdAt: { $gte: lastYear } } },
//             { 
//                 $project: {
//                     month: { $month: "$createdAt" },
//                 }, 
//             },
//             {
//                 $group:{
//                     _id:"$month",
//                     total: { $sum: 1},
//                 },
//             },
//         ]);
// res.status(200).json(data);
//     }catch(err){
//         res.status(500).json(err);
//     }

// });

module.exports = router
