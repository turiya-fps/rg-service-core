/**
 * Wrap the given {@link value} in single (') quotes.
 *
 * @see https://en.wikipedia.org/wiki/Quotation_mark
 */
export const single = (value: string): string => `'${value}'`;

/**
 * Wrap the given {@link value} in double (") quotes.
 *
 * @see https://en.wikipedia.org/wiki/Quotation_mark
 */
export const double = (value: string): string => `"${value}"`;

/**
 * Wrap the given {@link value} in backticks (`) quotes.
 *
 * @see https://en.wikipedia.org/wiki/Backtick
 */
export const backticks = (value: string): string => `\`${value}\``;
