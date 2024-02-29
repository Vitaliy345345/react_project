const express = require('express');
const { auth } = require('../middleware/auth');
const router = express.Router();
const { add, getTodos, edit, remove } = require('../controllers/todos')

// /api/todos
router.get('/', auth, getTodos)
// /api/todos/add
router.post('/add', auth, add)
// /api/todos/remove/:id
router.post('/remove/:id', auth, remove)
// /api/todos/edit/:id
router.put('/edit/:id', auth, edit)

module.exports = router;