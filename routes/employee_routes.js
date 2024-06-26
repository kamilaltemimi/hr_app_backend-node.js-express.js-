const express = require('express')

const employeeController = require('../controllers/employee_controller')

const router = express.Router()

router.get('/', employeeController.getAllEmployees)
router.get('/:id', employeeController.getEmployeeById)
router.get('/subdivision/:subdivision', employeeController.getEmployeesBySubdivision)
router.post('/', employeeController.addEmployee)
router.put('/:id', employeeController.updateEmployee)
router.put('/:id/activate', employeeController.activateEmployee)
router.put('/:id/deactivate', employeeController.deactivateEmployee)

module.exports = router