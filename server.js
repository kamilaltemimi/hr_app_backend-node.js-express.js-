const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors({
    origin: 'http://localhost:4200'
}))
app.use(bodyParser.json())

const employeeRoutes = require('./routes/employee_routes')
const approvalRequestRoutes = require('./routes/approvalRequest_routes')
const leaveRequestRoutes = require('./routes/leaveRequest_routes')
const projectRoutes = require('./routes/project_routes')

app.use('/employee', employeeRoutes)
app.use('/approval-requests', approvalRequestRoutes)
app.use('/leave-requests', leaveRequestRoutes)
app.use('/project', projectRoutes)

app.listen(port)