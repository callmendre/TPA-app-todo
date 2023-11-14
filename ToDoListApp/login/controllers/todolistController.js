const db = require('../models/todolistModel');

exports.getAllTasks = (req, res) => {
    db.query('SELECT * FROM todolist', (error, results) => {
        if (error) throw error;
        res.render('todolist', { tasks: results });
    });
};

exports.addTask = (req, res) => {
    const { task } = req.body;
    db.query('INSERT INTO todolist (task) VALUES (?)', [task], (error) => {
        if (error) throw error;
        res.redirect('/todolist');
    });
};

exports.getTaskById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM todolist WHERE id = ?', [id], (error, result) => {
        if (error) throw error;
        res.render('editTask', { task: result[0] });
    });
};

exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    db.query('UPDATE todolist SET task = ? WHERE id = ?', [task, id], (error) => {
        if (error) throw error;
        res.redirect('/todolist');
    });
};

exports.deleteTask = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM todolist WHERE id = ?', [id], (error) => {
        if (error) throw error;
        res.redirect('/todolist');
    });
};
