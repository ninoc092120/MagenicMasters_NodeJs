const DataAccess = require('./db');

class AttendanceDataAccess extends DataAccess {
    constructor () {
        super('attendance');
    }
}

module.exports = new AttendanceDataAccess();