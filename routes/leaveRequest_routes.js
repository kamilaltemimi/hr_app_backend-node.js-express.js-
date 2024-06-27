const express = require('express')

const leaveRequestController = require('../controllers/leaveRequest_controller')

const router = express.Router()

router.get('/', leaveRequestController.getAllLeaveRequests)
router.get('/:id', leaveRequestController.getLeaveRequestById)
router.post('/', leaveRequestController.addLeaveRequest)
router.put('/:id', leaveRequestController.updateLeaveRequest)

module.exports = router