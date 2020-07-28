import _ from 'lodash';
import {HttpStatus} from '../config/enums'

function Responder() {}

/*
 * This method sends the response to the client.
 */
function sendResponse(res, status, body) {
  if (!res.headersSent) {
    if (body) { return res.status(status).json(body); }
    return res.status(status).send();
  }
}

/*
 * These methods are called to respond to the API user with the information on
 * what is the result of the incomming request
 */
Responder.success = (res, message) => {
  const messageString = _.isString(message) ? { message } : message;
  return sendResponse(res, HttpStatus.OK, { success: true, data:{...messageString} });
};

Responder.created = (res, object) => sendResponse(res, HttpStatus.CREATED, object);

Responder.deleted = res => sendResponse(res, HttpStatus.NO_CONTENT);

Responder.operationFailed = (res, reason) => {
  const { status } = reason;

  if (reason.error.message) {
    console.error(`Error ${reason.error.message}`);
    return sendResponse(res, status, {
      success: false,
      error: {
        message: reason.error.message,
      },
    });
  }

  console.error(`Error ${reason.error}`);
  return sendResponse(res, status, {
    success: false,
    error: {
      message: reason.error,
    },
  });
};

export default Responder;
