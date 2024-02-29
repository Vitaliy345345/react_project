const express = require('express');
const router = express.Router();
const {login, register, current} = require('../controllers/users');
const { auth } = require('../middleware/auth');

/* GET users listing. */
router.post('/login', login);

/* GET users listing. */
router.post('/register', register);

/* GET users listing. */
router.get('/current', auth, current);

module.exports = router;
