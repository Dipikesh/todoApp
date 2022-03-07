const router = require('express').Router();
const todoControllers = require('./controllers/todo.controllers');

router.post('/create', todoControllers.createTodos);

router.put('/update', todoControllers.updateTodos);

router.get('/todos',todoControllers.getAllTodos)

router.get('/todos:id', todoControllers.getTodosById);

router.delete('/todos', todoControllers.deleteAllTodos);

router.delete('/todos:id', todoControllers.deleteTodosById);

module.exports = router;