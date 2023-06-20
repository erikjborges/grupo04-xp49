const User = require("../models/User");
const { veirfyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("./verifyToken");

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
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
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

//     //PAGINAÇÃO
//     const {page = 1} = req.query;
//     console.log(page);

//     //LIMITE DE REGISTROS POR PAGINA
//     const limit = 5;

//     //VARIÁVEL COM O NÚMERO DA PÁGINA
// var lastPage = 1;

// //CONTAR A QUANTIDADE DE REGISTROS NO BANCO DE DADOS
// const countUser = await User.count();
// console.log(countUser);

// if(countUser !== 0){
// //CALCULA A ÚLTIMA PÁGINA
// lastPage = Math.ceil(countUser / limit);
// console.log(lastPage);
// } else {
//     //PAUSA O PROCESSAMENTO E RETORNA MENSAGEM DE ERRO
//     return res.status(400).json("Error: Not users found!")
// }
// console.log((page * limit) - limit);
// //CALCULAR A PARTIR DE QUAL REGISTRO DEVE RETORNAR O LIMITE DE REGISTROS
// offset: Number((page * limit) - limit);

    const query = req.query.new;
    try {
        const users = query
            ? await User.find().sort({ _id: -1 }).limit(5)
            : await User.find();
        res.status(200).json(users);
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
