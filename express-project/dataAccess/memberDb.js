const DataAccess = require('./db');

class MemberDataAccess extends DataAccess {
    constructor () {
        super('members');
    }

    async getMemberByNameAndStatus(filters) {
        const user = await this.getByPropValues(filters);

        return user;
    }
}

module.exports = new MemberDataAccess();