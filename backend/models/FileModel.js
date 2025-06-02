const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    data:{
        type: Buffer,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
const file = mongoose.model("File", fileSchema);
module.exports = file;