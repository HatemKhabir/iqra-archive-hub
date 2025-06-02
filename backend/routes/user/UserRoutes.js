const express=require("express");
const { uploadFile } = require("../../controller/UserController");
const userRoutes=express.Router();

router.post("/upload-file",uploadFile);

module.exports=userRoutes;