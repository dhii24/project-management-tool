const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/cards");
    },

    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});


const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter(req, file, cb) {

        const allowedTypes = [
            "image/png",
            "image/jpeg",
            "application/pdf"
        ];

        if(allowedTypes.includes(file.mimetype)){
            cb(null, true);
        } 
        
        else {
            cb(new Error("Unsupported file type"));
        }
    }
});


module.exports = upload;