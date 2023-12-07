import type { HttpHeaders } from './endpoint.js';

/**
 * Retrieve the value of the `Authorization` header.
 */
export const getAuthorisationHeader = (headers: HttpHeaders): string | undefined => {
  return headers['Authorization'] ?? headers['authorization'];
};

/**
 * Retrieve the value of the `Content-Type` header.
 */
export const getContentTypeHeader = (headers: HttpHeaders): string | undefined => {
  return headers['Content-Type'] ?? headers['content-type'];
};

/**
 * Retrieve the value of the `Content-Length` header.
 */
export const getContentLengthHeader = (headers: HttpHeaders): string | undefined => {
  return headers['Content-Length'] ?? headers['content-length'];
};
