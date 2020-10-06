const express = require('express');
const axios = require('axios');

const router = express.Router();

const file_url = 'https://files-localdev.newscred.com/download/f26e998007a911eba0630242ac130011';

function wrapAsync(fn) {
    return function (req, res, next) {
        // Make sure to `.catch()` any errors and pass them along to the `next()`
        // middleware in the chain, in this case the error handler.
        fn(req, res, next);
            // .catch(next);
    };
}

router.get('/wopi/files/:id/contents', wrapAsync(getFile));
router.get('/wopi/files/:id', wrapAsync(checkFileInfo));

async function checkFileInfo(req, res) {
    console.log('here');
    const fileId = req.params.id;

    res.status(200).json({
        BaseFileName: 'file-sample_100kB.doc',
        OwnerId: '5ef9d00b0837a4c42e502f22',
        Size: 100352,
        UserId: '5ef9d00b0837a4c42e502f22',
        Version: '1.0',
        UserFriendlyName: 'A WOPI User',
        ReadOnly: true,
        FileUrl: file_url,
    });
}

async function getFile(req, res) {
    console.log('there');
    const fileId = req.params.id;

    const data = await downloadFile(file_url);

    res.setHeader('Content-Disposition', 'attachment; filename=file-sample_100kB.doc');
    res.writeHead(200, { 'Content-Type': 'application/msword' });
    res.write(data);
    res.end();
}

async function downloadFile(url) {
    return axios.get(url).then(resp => resp.data);
}

module.exports = router;
