const express = require('express')

const approvalRequestController = require('../controllers/approvalRequest_controller')

const router = express.Router()

router.get('/', approvalRequestController.getAllApprovalRequests)
router.get('/:id', approvalRequestController.getApprovalRequestById)
router.post('/', approvalRequestController.addApprovalRequest)
router.put('/:id', approvalRequestController.updateApprovalRequest)
router.put('/:id/approve', approvalRequestController.approveRequest)
router.put('/:id/reject', approvalRequestController.rejectRequest)

module.exports = router