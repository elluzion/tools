export default class Requester {
  static get = get;
  static post = post;
  static put = put;
  static delete = _delete;
}

async function get<DataType>(url: string) {
  const requestOptions: RequestInit = {
    method: 'GET',
  };
  const response = await fetch(url, requestOptions);
  return handleResponse<DataType>(response);
}

async function post<DataType>(url: string, body: object) {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  return handleResponse<DataType>(response);
}

async function put<DataType>(url: string, body: object) {
  const requestOptions: RequestInit = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  return handleResponse<DataType>(response);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete<DataType>(url: string) {
  const requestOptions: RequestInit = {
    method: 'DELETE',
  };
  const response = await fetch(url, requestOptions);
  return handleResponse<DataType>(response);
}

// helper functions

async function handleResponse<DataType>(response: Response) {
  const text = await response.text();
  const data: DataType = (text && JSON.parse(text)) || undefined;

  // Error handling
  let error = undefined;
  if (!response.ok) {
    error = new RequesterError(response.status, text);
  }
  return { data, error, response };
}

class RequesterError extends Error {
  constructor(
    public status: number,
    public message: string,
  ) {
    super(message);
  }
}
