/**
 * The postgres `jsonb` column value in its serialised format.
 *
 * @deprecated use `database/column/jsonb` instead, to be removed in `2.0`
 */
export type PostgresBinaryJsonValueSerialised = string;

/**
 * The postgres `jsonb` column value in its unserialised form of type {@link T}.
 *
 * @deprecated use `database/column/jsonb` instead, to be removed in `2.0`
 */
export type PostgresBinaryJsonValueUnserialised<T> = T;

/**
 * The postgres `jsonb` column in one of its forms:
 *
 * * {@link PostgresBinaryJsonValueSerialised}
 * * {@link PostgresBinaryJsonValueUnserialised}
 *
 * @deprecated use `database/column/jsonb` instead, to be removed in `2.0`
 */
export type PostgresBinaryJsonValue<T> = (
  | PostgresBinaryJsonValueUnserialised<T>
  | PostgresBinaryJsonValueSerialised
);

/**
 * Convert then given {@link PostgresBinaryJsonValue} to a value of type {@link T}.
 *
 * @deprecated use `database/column/jsonb` instead, to be removed in `2.0`
 */
export const fromPostgresBinaryJson = <T>(value: PostgresBinaryJsonValue<T>): T => {
  if (typeof value === 'string') {
    return JSON.parse(value);
  }

  return value;
};

/**
 * Convert the given {@link value} (json object) to a {@link PostgresBinaryJsonValueSerialised}.
 *
 * @deprecated use `database/column/jsonb` instead, to be removed in `2.0`
 */
export const toPostgresBinaryJson = <T>(value: T): PostgresBinaryJsonValueSerialised => {
  return JSON.stringify(value);
};
