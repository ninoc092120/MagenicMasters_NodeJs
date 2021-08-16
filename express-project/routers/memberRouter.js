const express = require('express');
const { memberController } = require('../controllers');

const memberRouter = express.Router();

memberRouter.get('/', memberController.getAllMembers);
memberRouter.get('/:memberId', memberController.getMemberById);

memberRouter.post('/',
    memberController.validateRequestRequiredPayload,
    memberController.validateMemberStatus,
    memberController.insertMember
);

memberRouter.put('/:memberId', 
    memberController.validateRequestRequiredPayload,
    memberController.validateMemberStatus,
    memberController.updateMember
);

memberRouter.delete('/:memberId', 
    memberController.deleteMember
);

/* /search?name=&status=
req.query > 
    {
        name: 'name',
        status: 'status'
    }
*/
memberRouter.get('/search', 
    memberController.getMemberByNameAndStatus
);

module.exports = memberRouter;