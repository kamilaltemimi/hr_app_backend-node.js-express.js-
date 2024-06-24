const database = require('../database')

exports.getAllLeaveRequests = (req, res) => {
    database.execute('SELECT * FROM Leave_Request', (err, result) => {
        if (err) {
            throw err
        } else {
            res.send(result)
        }
    })
}

exports.getLeaveRequestById = (req, res) => {
    const id = req.params
    database.execute(
        'SELECT * FROM Leave_Request WHERE ID = ?', 
        [id], (err, result) => {
        if (err) {
            throw err
        } else {
            res.send(result)
        }
    })
}

exports.addLeaveRequest = (req, res) => {
    const { employeeId, absenceReason, startDate, endDate, comment, status} = req.body
    database.execute(
        'INSERT INTO Leave_Request (Employee_ID, Absence_Reason, Start_Date, End_Date, Comment, Status) VALUES (?, ?, ?, ?, ?, ?)',
        [ employeeId, absenceReason, startDate, endDate, comment, status ], (err, res) => {
        if (err) {
            throw err
        } else {
            res.send('Leave request added')
        }
    })
}

exports.updateLeaveRequest = (req, res) => {
    const id = req.params
    const { employeeId, absenceReason, startDate, endDate, comment, status } = req.body
    database.execute(
        'UPDATE LeaveRequest SET Employee_ID = ?, Absence_Reason = ?, Start_Date = ?, End_Date = ?, Comment = ?, Status = ? WHERE ID = ?',
        [ employeeId, absenceReason, startDate, endDate, comment, status, id ], (err, result) => {
        if (err) {
            throw err
        } else {
            res.send('Leave request updated')
        }
    })
}

exports.cancelLeaveRequest = (req, res) => {
    const id = req.params
    database.execute(
        'UPDATE Leave_Request SET Status = ? WHERE ID = ?',
        [ 'Canceled', id], (err, result) => {
            if (err) {
                throw error
            } else {
                res.send('Leave request cancelled successfully')
            }
        }
    )
}