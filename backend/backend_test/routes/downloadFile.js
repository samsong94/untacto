/downloadFile.js*/
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var mime = require('mime');

router.get('/', function (req, res, next) {
    file = res.locals.filepath;
    try {
        if (fs.existsSync(file)) {
            var filename = path.basename(file);
            var mimetype = mime.getType(file);
            res.setHeader('Content-disposition', 'attachment; filename = ' + filename);
            res.setHeader('Content-type', mimetype);

            var filestream = fs.createReadStream(file);
            filestream.pipe(res);
        }
        else {
            res.send('No files');
            return;
        }

    }
    catch (e) {
        console.log(e);
        res.send('error');
        return;
    }
});

module.exports = router;
