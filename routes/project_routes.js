const express = require('express')

const projectController = require('../controllers/project_controller')

const router = express.Router()

router.get('/', projectController.getAllProjects)
router.get('/:id', projectController.getProjectById)
router.post('/', projectController.addProject)
router.put('/:id', projectController.updateProject)
router.put('/:id/deactivate', projectController.deactivateProject)

module.exports = router