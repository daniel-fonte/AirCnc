import multer from "multer";
import {resolve, extname} from "path";
import {randomBytes} from "crypto";

export default {
    dest: resolve(__dirname, "..", "..", "Uploads", "Spots"),
    storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", "Uploads", "Spots"),
        filename: (req, file, cb) => {
            const ext = extname(file.originalname);
            const hash = randomBytes(10).toString("hex");
    
            cb(null, `IMG-${hash}${ext}`);
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