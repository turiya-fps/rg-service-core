import { parse, stringify } from 'qs';

/**
 * Parse the given {@link querystring} and return it as type {@link T}.
 *
 * This allows a few non-standard formats to be used within the query string:
 * * Allowing `dot-notation` such as `foo.bar`
 * * Allowing `comma-separation` for array inputs
 */
export const parseQueryString = <T>(querystring: string): T => {
  return parse(querystring, {
    allowDots: true,
    comma: true,
  }) as unknown as T;
};

/**
 * Serialise the given {@link data} in to a query string compatible with {@link parseQueryString}.
 */
export const serialiseQueryString = (data: unknown): string => {
  return stringify(data, {
    allowDots: true,
    arrayFormat: 'comma',
    encode: false,
  });
};
