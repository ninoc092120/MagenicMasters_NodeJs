const { eventDataAccess } = require('../dataAccess');
const xl = require('excel4node');
const validator = require('validator');

/**
 * https://jsdoc.app/
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * Gets all events
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
 const getAllEvents = async (req, res, next) => {
    const events = await eventDataAccess.getAll();
  
    res.send(events);
 };

/**
 * Gets events by id
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getEventById = async (req, res, next) => {
    const id = req.params.eventId;
  
    const event = await eventDataAccess.getById(id);
  
    res.send(event);
};

/**
 * Inserts Event
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const insertEvent = async (req, res, next) => {
    const payload = req.body;
    
    const event = await eventDataAccess.insert(payload);
  
    res.status(201).send(event);
};

/**
 * Updates event
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const updateEvent = async (req, res, next) => {
    const id = req.params.eventId;
    const payload = req.body;
  
    await eventDataAccess.update(id, payload);
  
    res.sendStatus(200);
};

/**
 * Deletes event
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const deleteEvent = async (req, res, next) => {
    const id = req.params.eventId;
    console.log(req.params);
  
    await eventDataAccess.delete(id);
  
    res.sendStatus(200);
};

/**
 * Gets member by eventName, datestart and dateend
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
 const getEventByNameAndDate = async (req, res, next) => {
    const filters = req.query;

    const event = await eventDataAccess.getEventByNameAndDate(filters);
  
    res.send(event);
};

/**
 * Export event
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
 const exportEventById = async (req, res, next) => {
    const id = req.params.eventId;
  
    const event = await eventDataAccess.getById(id);

    let filename = event.eventName + '_' + event.datestart + '.xlsx';
    // TODO Export event
    const wb = new xl.Workbook();

    const ws = wb.addWorksheet('Sheet 1');
    ws.cell(1, 1).number(100);
    wb.write(filename);

    res.sendStatus(200);
};

/**
 * Validates Event
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
 const validateEvent = async (req, res, next) => {
    const payload = req.body;
    console.log(payload);


    const startDateTime = payload.startDateTime;
    const endDateTime = payload.endDateTime;

    if (!validator.isDate(startDateTime) || !validator.isDate(endDateTime)) {
        res.status(400).send('Event contains invalid date');
    } else if (endDateTime < startDateTime) {
        res.status(400).send('startDateTime must be less than endDateTime')
    }

    next();
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const validateRequestRequiredPayload = (req, res, next) => {
    const payload = req.body;
  
    const areAllPropsPresent = ['eventName', 'eventType', 'startDateTime', 'endDateTime']
      .every(requiredProp => requiredProp in payload);
  
    if (areAllPropsPresent) {
      return next();
    }
  
    res.status(400).send('eventName, eventType, startDateTime, and endDateTime must be present in the payload');
};

/**
 * Gets member by eventName, datestart and dateend
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
 const validateSearchCriteria = async (req, res, next) => {
    console.log(req.query);
    const eventName = req.query.eventname;
    const datestart = req.query.datestart;
    const dateend = req.query.dateend;
  
    console.log("eventName>", validator.isEmpty(eventName));
    console.log("datestart>", validator.isEmpty(datestart));
    console.log("dateend>", validator.isEmpty(dateend));

    if (eventName && datestart && dateend) {
      return next();
    }
  
    res.status(400).send('Search Criteria should have eventName, datestart and dateend');
};

module.exports = {
    getAllEvents,
    getEventById,
    insertEvent,
    updateEvent,
    deleteEvent,
    getEventByNameAndDate,
    exportEventById,
    validateRequestRequiredPayload,
    validateEvent,
    validateSearchCriteria
};