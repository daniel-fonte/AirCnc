import multer from "multer";
import {resolve, extname} from "path";

export default {
    dest: resolve(__dirname, "..", "..", "Uploads", "Spots"),
    storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", "Uploads", "Spots"),
        filename: (req, file, cb) => {
            const ext = extname(file.originalname);
            const date = Date.now();
    
            cb(null, `IMG-${date}${ext}`);
        }
    }),
    fileFilter(req, file, cb) {
        const mimeTypes = [
            "image/png",
            "image/jpg"
        ];
        if (mimeTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error("Format not permited"));
        }
    }
};