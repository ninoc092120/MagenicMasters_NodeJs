const { memberDataAccess } = require('../dataAccess');
const validator = require('validator');

/**
 * https://jsdoc.app/
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * Gets all members
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
 const getAllMembers = async (req, res, next) => {
    const members = await memberDataAccess.getAll();
  
    res.send(members);
 };

/**
 * Gets members by id
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getMemberById = async (req, res, next) => {
    const id = req.params.memberId;
  
    const member = await memberDataAccess.getById(id);
  
    res.send(member);
};

/**
 * Inserts member
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const insertMember = async (req, res, next) => {
    const payload = req.body;
  
    const member = await memberDataAccess.insert(payload);
  
    res.status(201).send(member);
};

/**
 * Updates member
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const updateMember = async (req, res, next) => {
    const id = req.params.memberId;
    const payload = req.body;
  
    await memberDataAccess.update(id, payload);
  
    res.sendStatus(200);
};

/**
 * Deletes member
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const deleteMember = async (req, res, next) => {
    const id = req.params.memberId;
  
    await memberDataAccess.delete(id);
  
    res.sendStatus(200);
};

/**
 * Gets member by name and status
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
 const getMemberByNameAndStatus = async (req, res, next) => {
    const filters = req.query;
  
    const event = await memberDataAccess.getMemberByNameAndStatus(filters);
  
    res.send(event);
};

/**
 * Validates Member Status
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
 const validateMemberStatus = async (req, res, next) => {
    const payload = req.body;

    if (!validator.isIn(payload.status,  ['Active','In-active'])) {
        res.status(400).send('Member Status must only be either Active or In-active');
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
  
    const areAllPropsPresent = ['name', 'status']
      .every(requiredProp => requiredProp in payload);
  
    if (areAllPropsPresent) {
      return next();
    }
  
    res.status(400).send('name, and status must be present in the payload');
};

module.exports = {
    getAllMembers,
    getMemberById,
    insertMember,
    updateMember,
    deleteMember,
    getMemberByNameAndStatus,
    validateRequestRequiredPayload,
    validateMemberStatus
};