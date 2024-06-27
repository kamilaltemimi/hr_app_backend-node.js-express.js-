const database = require('../database')

exports.getAllLeaveRequests = (req, res) => {
    database.execute('SELECT * FROM Leave_Request', (err, result) => {
        if (err) {
            throw err
        } else {
            res.send(result);
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
            res.send(result[0]);
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
        res.send(result);
    }
    });
  };

exports.updateLeaveRequest = (req, res) => {
    const id = req.params.id
    const { Status } = req.body
    database.execute(
        'UPDATE Leave_Request SET Status = ? WHERE ID = ?',
        [Status, id], (err, result) => {
            if (err) {
                throw err
            } else {
                res.send(result);
            }
        }
    )
}