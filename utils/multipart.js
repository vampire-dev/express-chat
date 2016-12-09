"use strict";
const multer = require('multer');
const fs = require('fs');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        var type = req.query.type;
        var dir = type === 'profile' ? './stored/profiles/' : './stored/galleries/';
        if (req.query.folder)
            dir += req.query.folder + '/';
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        var originName = file.originalname;
        var extension = originName.split('.');
        var folder = req.query.folder;
        cb(null, folder + '.' + extension[extension.length - 1]);
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = multer({ storage: storage });
//# sourceMappingURL=multipart.js.map