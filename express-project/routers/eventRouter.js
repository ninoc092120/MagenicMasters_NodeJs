const express = require('express');
const { eventController } = require('../controllers');

const eventRouter = express.Router();

function errorHandler (err, req, res, next) {
    res.status(500)
    res.render('error', { error: err })
}

eventRouter.use(errorHandler);

eventRouter.get('/', eventController.getAllEvents);
eventRouter.get('/:eventId', eventController.getEventById);

eventRouter.post('/',
    eventController.validateRequestRequiredPayload,
    eventController.validateEvent,
    eventController.insertEvent
);

eventRouter.put('/:eventId', 
    eventController.validateRequestRequiredPayload,
    eventController.validateEvent,
    eventController.updateEvent
);

eventRouter.delete('/:eventId', 
    eventController.deleteEvent
);

/* /events/search?eventname=[searchEventName]&datestart=[searchDateStart]&dataend=[searchDateEnd]
req.query > 
    {
        eventname: 'searchEventName',
        datestart: 'searchDateStart',
        dataend: 'searchDateEnd'
    }
*/
eventRouter.get('/search', 
    eventController.validateSearchCriteria,
    eventController.getEventByNameAndDate
);

/*  /events/export?eventId
req.query > 
    {
        eventId: ?value?,
    }
*/
eventRouter.get('/export', 
    eventController.exportEventById
);

module.exports = eventRouter;