const DataAccess = require('./db');

class UserDataAccess extends DataAccess {
    constructor () {
        super('users');
    }

    async getUserByEmailAddress (emailAddress) {
        const user = await this.getByAny({
            propName: 'emailAddress',
            propValue: emailAddress
        });

        return user;
    }
}

module.exports = new UserDataAccess();