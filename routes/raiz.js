const express = require('express');
const router = express.Router();



//rota principal

router.get('/',(req,res)=>{
    res.render("index");
})


module.exports= router