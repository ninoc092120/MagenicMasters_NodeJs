const express = require('express');
const { attendanceController } = require('../controllers');

const attendanceRouter = express.Router();

attendanceRouter.post('/',
    attendanceController.insertAttendance
);

attendanceRouter.put('/:attendanceId', 
    attendanceController.updateAttendance
);

attendanceRouter.delete('/:attendanceId', 
    attendanceController.deleteAttendance
);

module.exports = attendanceRouter;