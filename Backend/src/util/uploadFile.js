import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = 'fileserver/';
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

export const upload = multer({ storage: storage });
