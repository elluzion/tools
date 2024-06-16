import { StatusCodes, getReasonPhrase } from 'http-status-codes';

export class APIError extends Error {
  public status: number;
  public message: string;
  public detail?: string;
  public timestamp: string;

  /**
   * Initializes a new instance of the APIError.
   *
   * @param {number} status - The status code of the error.
   * @param {string} message - The error message.
   * @param {string} [detail] - Optional additional details about the error.
   */
  constructor(status: StatusCodes, message?: string, detail?: string) {
    super(message);

    this.status = status;
    this.message = message || getReasonPhrase(status);
    this.detail = detail;
    this.timestamp = new Date().toISOString();
  }

  /**
   * A method to convert the APIError object to a JSON representation.
   *
   * @return JSON representation of the APIError object
   */
  toJSON() {
    return {
      status: this.status,
      message: this.message,
      detail: this.detail,
      timestamp: this.timestamp,
    };
  }

  /**
   * Converts the APIError object to a JSON string representation.
   *
   * @return  The JSON string representation of the APIError object.
   */
  toStringifiedJSON() {
    return JSON.stringify(this.toJSON());
  }
}

/**
 * Creates a Response object based on the provided error. If the error is an instance of APIError,
 * it creates a Response object with the error's JSON string representation and the error's status.
 * If the error is an instance of Error, it creates a new APIError with status 500 and the error's message,
 * and then creates a Response object with the new APIError's JSON string representation. If the error is
 * neither an instance of APIError nor Error, it creates a Response object with the string 'Something went wrong'
 * and status 500.
 *
 * @param {APIError | Error | unknown} e - The error to create a Response object for.
 * @param {number} [statusCode] - The status code of the Response object (optional).
 * @return {Response} The Response object created based on the error.
 */
export function APIErrorResponse(e: APIError | Error | unknown, statusCode?: number): Response {
  const defaultStatusCode = 500;

  if (e instanceof APIError) {
    return new Response(e.toStringifiedJSON(), {
      status: statusCode || e.status,
    });
  }

  if (e instanceof Error) {
    const apiError = new APIError(statusCode || defaultStatusCode, e.message);
    return new Response(apiError.toStringifiedJSON(), {
      status: apiError.status,
    });
  }

  return new Response(JSON.stringify('Something went wrong'), {
    status: statusCode || defaultStatusCode,
  });
}
