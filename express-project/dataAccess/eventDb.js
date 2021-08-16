const DataAccess = require('./db');

class EventDataAccess extends DataAccess {
    constructor () {
        super('events');
    }

    async getEventByNameAndDate(filters) {
        const user = await this.getByPropValues(filters);

        return user;
    }
}

module.exports = new EventDataAccess();