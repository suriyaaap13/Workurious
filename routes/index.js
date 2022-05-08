const express = require('express');
const router = express.Router();

const homeController = require('../controller/home_controller');

router.get('/', homeController.home);
router.post('/post-data', homeController.createData)
module.exports = router;