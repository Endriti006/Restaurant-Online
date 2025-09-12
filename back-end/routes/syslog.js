const express = require('express');
const router = express.Router();
const { getSyslogs } = require('../controllers/SyslogsController');


router.get('/get/', getSyslogs);

module.exports = router;
