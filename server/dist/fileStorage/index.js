"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const uploadImage = (picture) => {
    const storage = multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/assets');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },
    });
    const pictureArr = picture.split('/');
    const imagePath = pictureArr[pictureArr.length - 1];
    const upload = (0, multer_1.default)({ storage });
    upload.single(imagePath);
};
exports.default = uploadImage;
