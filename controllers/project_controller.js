const database = require('../database')

exports.getAllProjects = (req, res) => {
    database.execute(
        'SELECT * FROM Project',
        (err, result) => {
            if (err) {
                throw err
            } else {
                res.send(result);
            }
        }
    )
}

exports.getProjectById = (req, res) => {
    const id = req.params
    database.execute(
        'SELECT * FROM Project WHERE ID = ?',
        [id], (err, result) => {
            if (err) {
                throw err
            } else {
                res.send(result[0]);
            }
        }
    )
}

exports.addProject = (req, res) => {
    const { Project_Type, Start_Date, End_Date, Project_Manager, Comment, Status } = req.body
    database.execute(
        'INSERT INTO Project (Project_Type, Start_Date, End_Date, Project_Manager, Comment, Status) VALUES (?, ?, ?, ?, ?, ?)',
        [ Project_Type, Start_Date, End_Date, Project_Manager, Comment, Status ], (err, result) => {
            if (err) {
                throw err
            } else {
                res.send(result);
            }
        }
    )
}

exports.updateProject = (req, res) => {
    const id = req.params
    const { Project_Type, Start_Date, End_Date, Project_Manager, Comment, Status, ID } = req.body
    database.execute(
        'UPDATE Project SET Project_Type = ?, Start_Date = ?, End_Date = ?, Project_Manager = ?, Comment = ?, Status = ? WHERE ID = ?',
        [ Project_Type, Start_Date, End_Date, Project_Manager, Comment, Status, ID ], (err, result) => {
            if (err) {
                throw err
            } else {
                res.send(result);
            }
        }
    )
}

exports.deactivateProject = (req, res) => {
    const id = req.params
    database.execute(
        'UPDATE Project SET Status = ? WHERE ID = ?', 
        [ 'Inactive', id ], (err, result) => {
            if (err) {
                throw err
            } else {
                res.send(result);
            }
        }
    )
}