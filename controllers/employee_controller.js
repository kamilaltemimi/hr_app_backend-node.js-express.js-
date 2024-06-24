const database = require('../database');

exports.getAllEmployees = (req, res) => {
    database.execute(
        'SELECT * FROM Employee', (err, result) => {
        if (err) {
            throw err
        } else {
            res.send(result)
        }
    })
};

exports.getEmployeeById = (req, res, next) => {
    const id = req.params.id;
    database.execute(
        'SELECT * FROM Employee WHERE ID = ?', 
        [id], (err, result) => {
        if (err) {
            throw err
        } else {
            res.send(result[0])
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
            res.send(result)
        }
    })
}

exports.addEmployee = (req, res) => {
    const { fullName, subdivision, position, status, peoplePartner, outOfOfficeBalance } = req.body;
    database.execute(
        'INSERT INTO Employee (Full_Name, Subdivision, Position, Status, People_Partner, Out_Of_Office_Balance) VALUES (?, ?, ?, ?, ?, ?)', 
        [fullName, subdivision, position, status, peoplePartner, outOfOfficeBalance], (err, result) => {
        if (err) {
            throw err
        } else {
            res.send('Employee added')
        }
    })
};

exports.updateEmployee = (req, res) => {
    const id = req.params;
    const { fullName, subdivision, position, status, peoplePartner, outOfOfficeBalance } = req.body;
    database.execute(
        'UPDATE Employee SET Full_Name = ?, Subdivision = ?, Position = ?, Status = ?, People_Partner = ?, Out_Of_Office_Balance = ? WHERE ID = ?', 
        [fullName, subdivision, position, status, peoplePartner, outOfOfficeBalance, id], (err, result) => {
        if (err) {
            throw err
        } else {
            res.send('Employee updated')
        }
    })
}

exports.activateEmployee = (req, res) => {
    const id = req.params
    database.execute(
        'UPDATE Employee SET Status = ? WHERE ID = ?',
        ['Available', id], (err, result) => {
            if (err) {
                throw err
            } else {
                res.send('Employee status = Available')
            }
        }
    )
}

exports.deactivateEmployee = (req, res) => {
    const id = req.params;
    database.execute(
        'UPDATE Employee SET Status = ? WHERE ID = ?', 
        ['Not available', id], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'Employee status = Not available' });
    });
};