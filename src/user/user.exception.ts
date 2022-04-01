import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

const getStatusCode = (exception: unknown): number => {
  return exception instanceof HttpException
    ? exception.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;
};

const getErrorMessage = (exception: unknown): string => {
  return String(exception);
};

@Catch()
export class SendPhoneNumberExc implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const code = getStatusCode(exception);
    const message = getErrorMessage(exception);

    console.log(exception);

    if (code >= 500) {
      return response.status(500).json({ error: "serverError" })
    }

    if (exception["message"] === "numberPhoneAlreadyUse") {
      return response.status(400).json({ error: "numberPhoneAlreadyUse" })
    }

    if (Array.isArray(exception["response"].message)) {
      return response.status(400).json({ error: exception["response"].message[0] })
    }
  }
}
