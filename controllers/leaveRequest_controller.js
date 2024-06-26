const database = require('../database')

exports.getAllLeaveRequests = (req, res) => {
    database.execute('SELECT * FROM Leave_Request', (err, result) => {
        if (err) {
            throw err
        } else {
            res.status(200).json({ message: 'Leave requests fetched', result });
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
            res.status(200).json({ message: `Leave request with ID:${id} fetched`, result });
        }
    })
}

exports.addLeaveRequest = (req, res) => {
    const { Employee_ID, Absence_Reason, Start_Date, End_Date, Comment, Status } = req.body;
    
    if (!Employee_ID || !Absence_Reason || !Start_Date || !End_Date || !Comment || !Status) {
      return res.status(400).send('All fields are required');
    }
  
    const sql = 'INSERT INTO Leave_Request (Employee_ID, Absence_Reason, Start_Date, End_Date, Comment, Status) VALUES (?, ?, ?, ?, ?, ?)';
    database.execute(sql, [ Employee_ID, Absence_Reason, Start_Date, End_Date, Comment, Status ], (err, result) => {
      if (err) {
        return res.status(500).send(err.message);
      } else {
        res.status(200).json({ message: 'Leave request added', result });
      }
    });
  };

exports.updateLeaveRequest = (req, res) => {
    const id = req.params.id
    const { Employee_ID, Absence_Reason, Start_Date, End_Date, Comment, Status } = req.body
    database.execute(
        'UPDATE LeaveRequest SET Employee_ID = ?, Absence_Reason = ?, Start_Date = ?, End_Date = ?, Comment = ?, Status = ? WHERE ID = ?',
        [ Employee_ID, Absence_Reason, Start_Date, End_Date, Comment, Status, id ], (err, result) => {
        if (err) {
            throw err
        } else {
            res.status(200).json({ message: `Leave request with ID:${id} updated`, result })
        }
    })
}

exports.cancelLeaveRequest = (req, res) => {
    const id = req.params.id
    database.execute(
        'UPDATE Leave_Request SET Status = ? WHERE ID = ?',
        [ 'Canceled', id], (err, result) => {
            if (err) {
                throw error
            } else {
                res.status(200).json({ message: `Leave request with ID:${id} canceled`, result })
            }
        }
    )
}