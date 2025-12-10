import { ZodError } from 'zod';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue) => {
    const lastPath = issue.path[issue.path.length - 1];

    return {
      path:
        typeof lastPath === 'string' || typeof lastPath === 'number'
          ? lastPath
          : String(lastPath), // fallback, just in case
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleZodError;
