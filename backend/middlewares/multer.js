import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
    filename:function(req,file,callback){
        const safeExt = path.extname(file.originalname).toLowerCase()
        callback(null,`${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`)
    }
})

const upload = multer({
    storage,
    limits:{fileSize:2 * 1024 * 1024},
    fileFilter:function(req,file,callback){
        if (!file.mimetype.startsWith('image/')) {
            return callback(new Error('Only image uploads are allowed'))
        }
        callback(null,true)
    }
})

export default upload
