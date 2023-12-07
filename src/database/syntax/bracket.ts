/**
 * Wrap the given {@link value} with parenthesis.
 *
 * @see https://en.wikipedia.org/wiki/Bracket#Parentheses
 */
export const parenthesis = (value: string): string => `(${value})`;

/**
 * Wrap the given {@link value} with curly brackets.
 *
 * @see https://en.wikipedia.org/wiki/Bracket#Curly_brackets
 */
export const curly = (value: string): string => `{${value}}`;
