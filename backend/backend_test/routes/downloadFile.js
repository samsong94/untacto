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
            res.send('해당파일이 없습니다.');
            return;
        }

    }
    catch (e) {
        console.log(e);
        res.send('파일 다운로드중 에러 발생');
        return;
    }
});

module.exports = router;
