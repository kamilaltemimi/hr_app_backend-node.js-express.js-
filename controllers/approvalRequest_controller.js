const database = require('../database')

exports.getAllApprovalRequests = (req, res) => {
    database.execute(
        'SELECT * FROM Approval_Request'
    ), (err, result) => {
        if (err) {
            throw err
        } else {
            res.send(result);
        };
    };
};

exports.getApprovalRequestById = (req, res) => {
    const id = req.params;
    database.execute(
        'SELECT * FROM Approval_Request WHERE ID = ?',
        [id], (err, result) => {
            if (err) {
                throw err
            } else {
                res.send(result[0]);
            };
        }
    );
};

exports.addApprovalRequest = (req, res) => {
    const { approverId, leaveRequestId, status, comment } = req.body;
    database.execute(
        'INSERT INTO Leave_Request (Approver_ID, Leave_Request_ID, Status, Comment) VALUES (?, ?, ?, ?)',
        [approverId, leaveRequestId, status, comment], (err, result) => {
            if (err) {
                throw err
            } else {
                res.send(result);
            };
        }
    );
};

exports.updateApprovalRequest = (req, res) => {
    const id = req.params;
    const { approverId, leaveRequestId, status, comment } = req.body;
    database.execute(
        'UPDATE Approval_Request SET Approver_ID = ?, Leave_Request = ?, Status = ?, Comment = ? WHERE ID = ?',
        [ approverId, leaveRequestId, status, comment, id], (err, result) => {
            if (err) {
                throw err
            } else {
                res.send(result);
            };
        }
    );
};

exports.approveRequest = (req, res) => {
    const id = req.params;
    database.execute(
        'UPDATE Approval_Request SET Status = ?',
        [ 'Approved', id], (err, result) => {
            if (err) {
                throw err
            } else {
                res.send(result);
            };
        }
    );
};

exports.rejectRequest = (req, res) => {
    const id = req.params;
    const comment = req.body;
    database.execute(
        'UPDATE Approval_Request SET Status = ?, Comment = ? WHERE ID = ?',
        [ 'Rejected', comment, id ], (err, result) => {
            if (err) {
                throw err
            } else {
                res.send(result);
            };
        }
    );
};