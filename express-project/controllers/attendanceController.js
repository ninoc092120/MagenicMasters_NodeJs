const { attendanceDataAccess } = require('../dataAccess');
const validator = require('validator');

/**
 * https://jsdoc.app/
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * Inserts attendance
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const insertAttendance = async (req, res, next) => {
    const payload = req.body;
  
    const attendance = await attendanceDataAccess.insert(payload);
  
    res.status(201).send(attendance);
};

/**
 * Updates attendance
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const updateAttendance = async (req, res, next) => {
    const id = req.params.attendanceId;
    const payload = req.body;
  
    await attendanceDataAccess.update(id, payload);
  
    res.sendStatus(200);
};

/**
 * Deletes attendance
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const deleteAttendance = async (req, res, next) => {
    const id = req.params.attendanceId;
  
    await attendanceDataAccess.delete(id);
  
    res.sendStatus(200);
};

module.exports = {
    insertAttendance,
    updateAttendance,
    deleteAttendance
};