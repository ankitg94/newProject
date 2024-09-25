import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const fileFilter =(req,file,cb)=>{
    if(file.mimetype === 'image/jpeg'|| file.mimetype === 'image/png'){
        cb(null,true)
    }
    else{
        cb(new Error("invalid file path"))
    }

}

const upload = multer({
   storage,
   fileFilter,
   limits:{fileSize:5*1024*1024}
})

export default upload