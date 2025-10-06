const express = require('express');

const router = express.Router();

const studentRoutes = require('./student');
router.use('/students', studentRoutes);
// Add more route mounts as needed

module.exports = router;