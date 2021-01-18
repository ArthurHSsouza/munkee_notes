const multer = require('multer');

const storage = multer.diskStorage({
    
    destination: (req, file, cb)=>{
        cb(null, __dirname+'../../../images/uploads');
    },
    filename: (req, file, cb)=>{
        let fileString = file.originalname.split(".");
        let filename = fileString[0]+Date.now()+"."+fileString[1];
        req.session.user.photo = filename;
        req.session.user.mimetype = file.mimetype;
        cb(null, filename);
    }
});

const fileFilter = (req,file,cb) => {

    if(file.mimetype.startsWith('image')){
      cb(null, true);
    }else{
        cb("Apenas imagens são permitidas", false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;