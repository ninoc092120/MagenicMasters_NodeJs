const { userDataAccess } = require('../dataAccess');
const validator = require('validator');

/**
 * https://jsdoc.app/
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * Gets all users
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getAllUsers = async (req, res, next) => {
  const users = await userDataAccess.getAll();

  res.send(users);
};

/**
 * Gets user by id
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getUserById = async (req, res, next) => {
  const id = req.params.id;

  const user = await userDataAccess.getById(id);

  res.send(user);
};

/**
 * Validate if user exists
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
 const validateUserByUsername = async (req, res, next) => {
  const username = req.params.username;

  const userExist = await userDataAccess.getUserByUsername(username);
  if(!userExist) {
    return res.status(404).send(`user ${username} does not exists`);
  }

  next();
};

/**
 * Gets user by username
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getUserByUsername = async (req, res, next) => {
  const username = req.params.username;

  const user = await userDataAccess.getUserByUsername(username);

  res.send(user);
};

/**
 * Validate if user exists
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
 const validateUserByEmailAddress = async (req, res, next) => {
  const emailAddress = req.params.emailAddress;

  const user = await userDataAccess.getUserByEmailAddress(emailAddress);

  if(user) {
    return next();
  }

  res.status(404).send(`EmailAddress ${emailAddress} does not exists`);
};

/**
 * Gets user by emailAddress
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getUserByEmailAddress = async (req, res, next) => {
  const emailAddress = req.params.emailAddress;

  const user = await userDataAccess.getUserByEmailAddress(emailAddress);

  res.send(user);
};

/**
 * Validate Email Address
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
 const validateEmailAddress = (req, res, next) => {
  const payload = req.body;
  const emailAddress = payload.emailAddress;

  if (!validator.isEmail(emailAddress)) {
    return res.status(400).send(`Invalid email address ${emailAddress}`);
  }

  next();
};

/**
 * Validate Username / Email Address Exists
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
 const validateUsernameEmailAddressExists = async (req, res, next) => {
  const payload = req.body;
  const emailAddress = payload.emailAddress;
  const username = payload.username;

  const userExist = await userDataAccess.getUserByUsername(username);
  if (userExist) {
    return res.status(409).send(`Username ${username} exists`);
  }

  const emailExist = await userDataAccess.getUserByEmailAddress(emailAddress);
  if (emailExist) {
    return res.status(409).send(`Email Address ${emailAddress} exists`);
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

  const areAllPropsPresent = ['username', 'emailAddress']
    .every(requiredProp => requiredProp in payload);

  if (areAllPropsPresent) {
    return next();
  }

  res.status(400).send('username/emailAddress must be present in the payload');
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const validateRequestExtraPayload = (req, res, next) => {
  const payload = req.body;
  const payloadPropNames = Object.keys(payload);
  const validPropNames = ['username', 'emailAddress'];

  const hasExtraProps = !payloadPropNames
    .every(payloadPropName => validPropNames.includes(payloadPropName));

  if (hasExtraProps) {
    return res.status(400).send('Request payload has extra properties');
  }

  next();
};

/**
 * Inserts user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const insertUser = async (req, res, next) => {
  const payload = req.body;

  const user = await userDataAccess.insert(payload);

  res.status(201).send(user);
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
 const validateRequestBodyUsername = (req, res, next) => {
  const payload = req.body;

  const isUsernamePresent = ['username']
    .every(requiredProp => requiredProp in payload);

  if (isUsernamePresent) {
    return res.status(400).send('request body has username');
  }

  next();
};

/**
 * Updates user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const payload = req.body;

  await userDataAccess.update(id, payload);

  res.sendStatus(200);
};

/**
 * Updates user by username
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
 const updateUserByUsername = async (req, res, next) => {
  const username = req.params.username;
  const payload = req.body;

  await userDataAccess.updateByUsername(username, payload);

  res.sendStatus(200);
};

/**
 * Deletes user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  await userDataAccess.delete(id);

  res.sendStatus(200);
};

/**
 * Deletes user by username
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
 const deleteUserByUsername = async (req, res, next) => {
  const username = req.params.username;

  await userDataAccess.deleteByUsername(username);

  res.sendStatus(200);
};

module.exports = {
  getAllUsers,
  getUserById,
  validateUserByUsername,
  getUserByUsername,
  validateUserByEmailAddress,
  getUserByEmailAddress,
  validateEmailAddress,
  validateRequestRequiredPayload,
  validateRequestExtraPayload,
  validateUsernameEmailAddressExists,
  insertUser,
  validateRequestBodyUsername,
  updateUser,
  updateUserByUsername,
  deleteUser,
  deleteUserByUsername
};
