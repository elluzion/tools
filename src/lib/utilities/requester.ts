export const Requester = {
  get,
  post,
  put,
  delete: _delete,
};

async function get(url: string) {
  const requestOptions: RequestInit = {
    method: 'GET',
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

async function post(url: string, body: object) {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

async function put(url: string, body: object) {
  const requestOptions: RequestInit = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(url: string) {
  const requestOptions: RequestInit = {
    method: 'DELETE',
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

// helper functions

async function handleResponse(response: Response) {
  const text = await response.text();
  const data = (text && JSON.parse(text)) || undefined;

  // Error handling
  let error = undefined;
  if (!response.ok) {
    error = new RequesterError(response.status, response.statusText);
  }
  return { data, error };
}

class RequesterError extends Error {
  constructor(
    public status: number,
    public message: string,
  ) {
    super(message);
  }
}
