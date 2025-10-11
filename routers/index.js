const express = require('express');

const router = express.Router();

const studentRoutes = require('./student');
const userRoutes = require('./users');

router.use('/students', studentRoutes);
router.use('/users', userRoutes);
// Add more route mounts as needed

module.exports = router;