import type { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import type { BooleanLikeStringValue } from '../../data/boolean.js';
import { coerceBooleanLike } from '../../data/boolean.js';

export const applyFilterNullCheck = (
  query: SelectQueryBuilder<ObjectLiteral>,
  field: string,
  input: BooleanLikeStringValue,
): boolean => {
  const cast = coerceBooleanLike(input);

  if (cast === true) {
    query.andWhere(`${field} IS NULL`);

    return true;
  } else if (cast === false) {
    query.andWhere(`${field} IS NOT NULL`);

    return true;
  }

  return false;
};
