var express = require('express');
var router = express.Router();
var multer = require('multer');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

var handler = multer({
    dest: './uploads/',
    rename: function(fieldname, filename, req, res) {
        return filename;
    },
    onFileUploadStart: function(file) {
        console.log(file.originalname + ' is starting ...');
    },
    // onFileUploadData: function (file, data, req, res) {
    //   console.log(data.length + ' of ' + file.fieldname + ' arrived')
    // },
    onFileUploadComplete: function(file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path);
        done = true;
    },
    onFileSizeLimit: function(file) {
        console.log('Failed: ', file.originalname);
        fs.unlink('./' + file.path);
        done = false;
    },
    onFilesLimit: function() {
        console.log('Crossed file limit!');
        done = false;
    },
    onError: function(error, next) {
        console.log(error);
        done = false;
        next(error);
    },
    limits: {
        fieldNameSize: 100,
        files: 2,
        fields: 5,
    }
});

router.post('/upload', [handler, function(req, res) {
    console.log(req.files);
    if (done == true) {
        res.status(204).end();
    } else {
        response.status(413).end();
    }
}]);

module.exports = router;
