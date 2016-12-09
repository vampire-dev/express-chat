import * as express from 'express';
import * as multer from 'multer';
import * as fs from 'fs';

var storage = multer.diskStorage({
    destination: (req: express.Request, file: any, cb: Function) => {
        var type = req.query.type;
        var dir = type === 'profile' ? './stored/profiles/' : './stored/galleries/';

        if (req.query.folder)
            dir += req.query.folder + '/';

        if (!fs.existsSync(dir))
            fs.mkdirSync(dir);

        cb(null, dir);
    },

    filename: (req: express.Request, file: any, cb: Function) => {
        var originName = file.originalname;
        var extension = originName.split('.');
        var folder = req.query.folder;
        cb(null, folder + '.' + extension[extension.length - 1]);
    }
});

export default multer({ storage: storage });