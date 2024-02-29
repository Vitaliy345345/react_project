const express = require('express');
const { auth } = require('../middleware/auth');
const router = express.Router();
const {add, getTasks, edit, remove} = require('../controllers/tasks')

// /api/tasks
router.get('/', auth, getTasks)
// /api/tasks/add
router.post('/add/:id', auth, add)
// /api/tasks/edit
router.put('/edit/:id', auth, edit)
// /api/tasks/remove
router.post('/remove/:id', auth, remove)

module.exports = router