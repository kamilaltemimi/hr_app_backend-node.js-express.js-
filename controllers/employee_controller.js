const database = require('../database');

exports.getAllEmployees = (req, res) => {
    database.execute(
        'SELECT * FROM Employee', (err, result) => {
        if (err) {
            throw err
        } else {
            res.send(result);
        }
    })
}

exports.getEmployeeById = (req, res, next) => {
    const id = req.params.id;
    database.execute(
        'SELECT * FROM Employee WHERE ID = ?', 
        [id], (err, result) => {
        if (err) {
            throw err
        } else {
            res.json(result[0]);
        }
    })
}

exports.getEmployeesBySubdivision = (req, res) => {
    const subdivision = req.params.subdivision
    database.execute('SELECT * FROM Employee WHERE Subdivision = ?',
    [subdivision], (err, result) => {
        if (err) {
            throw err
        } else {
            res.send(result);
        }
    })
}

exports.addEmployee = (req, res) => {
    const { Full_Name, Subdivision, Position, Status, People_Partner, Out_of_Office_Balance } = req.body;
    database.execute(
        'INSERT INTO Employee (Full_Name, Subdivision, Position, Status, People_Partner, Out_Of_Office_Balance) VALUES (?, ?, ?, ?, ?, ?)', 
        [Full_Name, Subdivision, Position, Status, People_Partner, Out_of_Office_Balance], (err, result) => {
        if (err) {
            throw err
        } else {
            res.send(result);
        }
    })
};

exports.updateEmployee = (req, res) => {
    const id = req.params.id;
    const { Full_Name, Subdivision, Position, Status, People_Partner, Out_of_Office_Balance } = req.body;
    database.execute(
        'UPDATE Employee SET Full_Name = ?, Subdivision = ?, Position = ?, Status = ?, People_Partner = ?, Out_Of_Office_Balance = ? WHERE ID = ?', 
        [Full_Name, Subdivision, Position, Status, People_Partner, Out_of_Office_Balance, id], 
        (err, result) => {
            if (err) {
                return res.status(500).send('Error updating employee');
            } else {
                res.send(result);
            }
        }
    )
}

exports.activateEmployee = (req, res) => {
    const id = req.params.id
    database.execute(
        'UPDATE Employee SET Status = ? WHERE ID = ?',
        ['Active', id], (err, result) => {
            if (err) {
                throw err
            } else {
                res.send(result);
            }
        }
    )
}

exports.deactivateEmployee = (req, res) => {
    const id = req.params.id
    database.execute(
        'UPDATE Employee SET Status = ? WHERE ID = ?', 
        ['Inactive', id], (err, result) => {
        if (err) {
            return res.status(500).send('Error deactivating employee')
        } else {
            res.send(result);
        }
        }
    );
};