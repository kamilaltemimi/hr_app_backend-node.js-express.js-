const database = require('../database')

exports.getAllProjects = (req, res) => {
    database.execute(
        'SELECT * FROM Project',
        (err, results) => {
            if (err) {
                throw err
            } else {
                res.send(results)
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
                res.send(result)
            }
        }
    )
}

exports.addProject = (req, res) => {
    const { projectType, startDate, endDate, projectManagerId, comment, status } = req.body
    database.execute(
        'INSERT INTO Project (Project_Type, Start_Date, End_Date, Project_Manager, Comment, Status) VALUES (?, ?, ?, ?, ?, ?)',
        [ projectType, startDate, endDate, projectManagerId, comment, status ], (err, result) => {
            if (err) {
                throw err
            } else {
                res.send('Project added successfully')
            }
        }
    )
}

exports.updateProject = (req, res) => {
    const id = req.params
    const { projectType, startDate, endDate, projectManagerId, comment, status } = req.body
    database.execute(
        'UPDATE Project SET Project_Type = ?, Start_Date = ?, End_Date = ?, Project_Manager = ?, Comment = ?, Status = ? WHERE ID = ?',
        [ projectType, startDate, endDate, projectManagerId, comment, status, id ], (err, result) => {
            if (err) {
                throw err
            } else {
                res.send('Project updated successfully')
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
                res.send('Project inactive')
            }
        }
    )
}