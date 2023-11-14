const express = require('express');
const router = express.Router();
const todolistController = require('../controllers/todolistController');

router.get('/', todolistController.getAllTasks);
router.post('/add', todolistController.addTask);
router.get('/edit/:id', todolistController.getTaskById);
router.post('/edit/:id', todolistController.updateTask);
router.get('/delete/:id', todolistController.deleteTask);
router.post('/deleteAll', todolistController.deleteAllTasks);

module.exports = router;
