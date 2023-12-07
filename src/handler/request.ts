/**
 * A base handler request.
 */
export type HandlerRequest = {
  /**
   * Returns the id of the process (or request).
   */
  id(): string;

  /**
   * Returns the remaining life time for the process (or request).
   */
  ttl(): number;
};
