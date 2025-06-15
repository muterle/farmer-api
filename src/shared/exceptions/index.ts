import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export const returnException = (
  error: any,
  logger: Logger,
  httpStatus: HttpStatus = HttpStatus.BAD_REQUEST,
) => {
  let message = '';
  if (error.parent) {
    message = error.parent.sqlMessage;
  } else {
    message = error.message;
  }
  logger.error(message);
  throw new HttpException(message, httpStatus);
};
