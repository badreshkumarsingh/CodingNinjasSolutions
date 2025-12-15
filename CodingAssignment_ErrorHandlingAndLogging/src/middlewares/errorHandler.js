// Please don't change the pre-written code
// Import the necessary modules here
import { logger } from './logger.middleware.js';

export class customErrorHandler extends Error {
  constructor(statusCode, errMessage) {
    super(errMessage);
    this.statusCode = statusCode;
  }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
  // Write your code here
  const logData = err.message;
  if(err instanceof customErrorHandler) {
    res.status(err.statusCode).send(err.message);
    console.log(`err.message: ${err.message}`);
    console.log(`err.errMessage: ${err.errMessage}`);
    logger.log({ level: 'error', timestamp: new Date().toString(), "request URL": req.url, "error message": logData });
    return;
  }
  logger.log({ level: 'error', timestamp: new Date().toString(), "request URL": req.url, "error message": "Oops! Something went wrong... Please try again later!" });
  res.status(500).send("Oops! Something went wrong... Please try again later!");
};
