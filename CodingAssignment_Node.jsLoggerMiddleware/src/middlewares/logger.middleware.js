// Please don't change the pre-written code
// Import the necessary modules here
import fs from 'fs';


// Write your code here
const fsPromise = fs.promises;

const log = async (logData) => {
  logData = `\n${new Date().toString()}${logData}`;
  await fsPromise.appendFile('log.txt', logData);
  return logData;
}

export const loggerMiddleware = async (req, res, next) => {
  // Write your code here
  if(req.url.includes("/api/user")) {
    const logData = `\nreq URL: ${req.url}\nreqBody: ${JSON.stringify(req.body)}`;
    await log(logData)
  }
  next();
};
export default loggerMiddleware;
